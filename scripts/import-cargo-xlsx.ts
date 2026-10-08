import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';
import { cargoData } from '../src/lib/data';
import type { CargoTracking, FlightInfo } from '../src/lib/types';

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

function makeFlight(flight: unknown, route: unknown, label: string, date: unknown, time: unknown): FlightInfo | null {
  const flightText = text(flight);
  const routeText = text(route);
  if (!flightText && !routeText) return null;
  const schedule = [dateText(date), timeText(time)].filter(Boolean).join(' ');
  return { flight: flightText, route: routeText, date_time: schedule ? `${label}: ${schedule}` : label };
}

const workbook = xlsx.readFile(inputFile, { cellDates: false });
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json<unknown[]>(worksheet, { header: 1, defval: '', raw: false }).slice(1);
const records = cargoData.map((item) => ({ ...item, flights: [...item.flights] }));
const importedKeys = new Set<string>();
let updated = 0;
let added = 0;
let duplicates = 0;
let unchanged = 0;

for (const row of rows) {
  const [, ponumPib, pengirim, hawb, mawb, quantity, weight, origin, departureFlight, departureDate, departureTime, destination, arrivalFlight, arrivalDate, arrivalTime] = row;
  const mawbKey = normalize(mawb);
  const hawbKey = normalize(hawb);
  if (!mawbKey && !hawbKey) continue;
  const recordKey = `${mawbKey}|${hawbKey}`;
  if (importedKeys.has(recordKey)) {
    duplicates += 1;
    continue;
  }
  importedKeys.add(recordKey);

  const current = records.find((item) => normalize(item.mawb) === mawbKey && normalize(item.hawb) === hawbKey);
  const incomingFlights = [
    makeFlight(departureFlight, origin, 'Departure', departureDate, departureTime),
    makeFlight(arrivalFlight, destination, 'Arrival', arrivalDate, arrivalTime),
  ].filter((flight): flight is FlightInfo => flight !== null);
  const piecesWeight = [numberText(quantity), numberText(weight)].every(Boolean) ? `${numberText(quantity)} pcs / ${numberText(weight)} kg` : '';
  const routing = [text(origin), text(destination)].filter(Boolean).join(' → ');

  if (current) {
    const before = JSON.stringify(current);
    // The spreadsheet is the source of truth. Keep only the locally managed
    // image URL, then replace every tracking field with the spreadsheet value.
    current.ponum_pib = text(ponumPib);
    current.pengirim = text(pengirim);
    current.hawb = text(hawb);
    current.mawb = text(mawb);
    current.pieces_weight = piecesWeight || '-';
    current.routing = routing || 'Rute Standar';
    current.flights = incomingFlights;
    if (JSON.stringify(current) !== before) updated += 1;
    else unchanged += 1;
    continue;
  }

  const nextId = String(Math.max(0, ...records.map((item) => Number(item.id) || 0)) + 1);
  records.push({
    id: nextId, ponum_pib: text(ponumPib), pengirim: text(pengirim), hawb: text(hawb), mawb: text(mawb),
    pieces_weight: piecesWeight || '-', routing: routing || 'Rute Standar', image_url: '', flights: incomingFlights, search_text: '',
  });
  added += 1;
}

for (const item of records) {
  item.search_text = [item.ponum_pib, item.pengirim, item.hawb, item.mawb, item.routing, ...item.flights.flatMap((flight) => [flight.flight, flight.route])]
    .filter(Boolean).join(' ').toUpperCase();
}

const output = ["import { CargoTracking } from './types';", '', `export const cargoData: CargoTracking[] = ${JSON.stringify(records, null, 2)};`, ''].join('\n');
fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data.ts'), output);
console.log(`Import complete: ${added} added, ${updated} synchronized, ${duplicates} duplicate rows skipped, ${unchanged} unchanged. Total: ${records.length}.`);
