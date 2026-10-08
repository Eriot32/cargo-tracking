import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const inputFile = process.argv[2];
if (!inputFile) throw new Error('Usage: npm run import:tracking -- <path-to-xlsx>');

const normalize = (value: unknown) => String(value ?? '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
const text = (value: unknown) => String(value ?? '').trim();
const numberText = (value: unknown) => {
  const parsed = Number(text(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? String(parsed) : text(value);
};

const dateText = (value: unknown) => {
  const match = text(value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return text(value);
  const [, month, day, rawYear] = match;
  const date = new Date(Number(rawYear.length === 2 ? `20${rawYear}` : rawYear), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

const timeText = (value: unknown) => text(value).slice(0, 5);

const workbook = xlsx.readFile(inputFile, { cellDates: false });
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json<unknown[]>(worksheet, { header: 1, defval: '', raw: false }).slice(1);

const records: any[] = [];
const importedKeys = new Set<string>();

let idCounter = 1;

for (const row of rows) {
  const [, ponumPib, pengirim, hawb, mawb, quantity, weight, origin, departureFlight, departureDate, departureTime, destination, arrivalFlight, arrivalDate, arrivalTime] = row;
  
  const mawbKey = normalize(mawb);
  const hawbKey = normalize(hawb);
  if (!mawbKey && !hawbKey) continue;
  
  const recordKey = `${mawbKey}|${hawbKey}`;
  if (importedKeys.has(recordKey)) continue;
  importedKeys.add(recordKey);

  // Departure: date + time
  const depDateStr = dateText(departureDate);
  const depTimeStr = timeText(departureTime);
  const departureSchedule = [depDateStr, depTimeStr].filter(Boolean).join(' ');

  // Arrival: date + time
  const arrDateStr = dateText(arrivalDate);
  const arrTimeStr = timeText(arrivalTime);
  const arrivalSchedule = [arrDateStr, arrTimeStr].filter(Boolean).join(' ');

  const flights = [];
  
  if (text(departureFlight) || text(origin)) {
    flights.push({
      flight: text(departureFlight),
      route: text(origin),
      date_time: departureSchedule ? `Departed: ${departureSchedule}` : 'Departed: TBA'
    });
  }

  if (text(arrivalFlight) || text(destination)) {
    flights.push({
      flight: text(arrivalFlight),
      route: text(destination),
      date_time: arrivalSchedule ? `Arrived: ${arrivalSchedule}` : 'Arrived: TBA'
    });
  }

  const piecesWeight = [numberText(quantity), numberText(weight)].every(Boolean) 
    ? `${numberText(quantity)} pcs / ${numberText(weight)} kg` 
    : '-';
  
  const routing = [text(origin), text(destination)].filter(Boolean).join(' → ');

  const item = {
    id: String(idCounter++),
    ponum_pib: text(ponumPib),
    pengirim: text(pengirim),
    hawb: text(hawb),
    mawb: text(mawb),
    pieces_weight: piecesWeight,
    routing: routing || 'Standard Route',
    flights: flights,
    search_text: ''
  };

  item.search_text = [
    item.ponum_pib, item.pengirim, item.hawb, item.mawb, item.routing, 
    ...item.flights.flatMap(f => [f.flight, f.route])
  ].filter(Boolean).join(' ').toUpperCase();

  records.push(item);
}

const output = [
  "import { CargoTracking } from './types';",
  "",
  `export const cargoData: CargoTracking[] = ${JSON.stringify(records, null, 2)};`,
  ""
].join('\n');

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data.ts'), output);
console.log(`Import complete: ${records.length} records processed and saved to data.ts.`);
