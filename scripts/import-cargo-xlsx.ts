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
  // Map based on the NEW FINAL Excel columns
  const ponumPib = row[1];
  const pengirim = row[2];
  const hawb = row[3];
  const mawb = row[4];
  const quantity = row[5];
  const weight = row[6];
  
  const fl1Route = row[7];
  const fl1Flight = row[8];
  const fl1DepDate = row[9];
  const fl1DepTime = row[10];
  const fl1ArrDate = row[11];
  const fl1ArrTime = row[12];
  
  const fl2Route = row[13];
  const fl2Flight = row[14];
  const fl2DepDate = row[15];
  const fl2DepTime = row[16];
  const fl2ArrDate = row[17];
  const fl2ArrTime = row[18];
  
  const mawbKey = normalize(mawb);
  const hawbKey = normalize(hawb);
  if (!mawbKey && !hawbKey) continue;
  
  const recordKey = `${mawbKey}|${hawbKey}`;
  if (importedKeys.has(recordKey)) continue;
  importedKeys.add(recordKey);

  const flights = [];
  
  // Flight 1 Parsing
  if (text(fl1Flight) || text(fl1Route)) {
    const depSchedule = [dateText(fl1DepDate), timeText(fl1DepTime)].filter(Boolean).join(' ');
    const arrSchedule = [dateText(fl1ArrDate), timeText(fl1ArrTime)].filter(Boolean).join(' ');
    
    flights.push({
      flight: text(fl1Flight),
      route: text(fl1Route),
      departed: depSchedule || 'TBA',
      arrived: arrSchedule || 'TBA'
    });
  }

  // Flight 2 Parsing
  if (text(fl2Flight) || text(fl2Route)) {
    const depSchedule = [dateText(fl2DepDate), timeText(fl2DepTime)].filter(Boolean).join(' ');
    const arrSchedule = [dateText(fl2ArrDate), timeText(fl2ArrTime)].filter(Boolean).join(' ');

    flights.push({
      flight: text(fl2Flight),
      route: text(fl2Route),
      departed: depSchedule || 'TBA',
      arrived: arrSchedule || 'TBA'
    });
  }

  const piecesWeight = [numberText(quantity), numberText(weight)].every(Boolean) 
    ? `${numberText(quantity)} pcs / ${numberText(weight)} kg` 
    : '-';
  
  const routing = [text(fl1Route), text(fl2Route)].filter(Boolean).join(' → ').replace(/ - /g, '-').replace(/→/g, '→').replace(/\s+/g, ' ').replace(/-([A-Z])/g, ' - $1');

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
