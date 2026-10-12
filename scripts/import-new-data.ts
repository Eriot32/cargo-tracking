import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const text = (v: unknown) => String(v ?? '').trim();

const formatDateVal = (v: unknown) => {
  if (v === null || v === undefined) return '';
  const s = text(v);
  if (!s || s.toUpperCase() === 'NA' || s === '-') return s;
  
  // If already like "14 January 2025" or "03 February 2025"
  if (/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(s)) return s;
  
  // If "M/D/YY" or "MM/DD/YYYY"
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (m) {
    const [, month, day, rawYear] = m;
    const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (!isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    }
  }
  return s;
};

// 1. Process AIR FREIGHT
const airPath = path.join(process.cwd(), 'data', 'source', 'AIR FREIGHT TO PAITON1.xlsx');
const wbAir = xlsx.readFile(airPath, { cellDates: false });
const wsAir = wbAir.Sheets[wbAir.SheetNames[0]];
const airRows = xlsx.utils.sheet_to_json<unknown[]>(wsAir, { header: 1, defval: '', raw: false }).slice(1);

const airRecords: any[] = [];
let airId = 1;

for (const row of airRows) {
  const [
    no, po, serviceType, shipper, consignee, qty, gw, pol, pod, mawbBl, hawb,
    siDate, collection, fl1Origin, fl1Flight, fl1Departed,
    fl2Destination, fl2Flight, fl2Arrived, clearanceDate, deliveryToPaiton
  ] = row;

  if (!text(hawb) && !text(mawbBl) && !text(po)) continue;

  const item = {
    id: String(airId++),
    no: text(no),
    po: text(po),
    service_type: text(serviceType),
    shipper: text(shipper),
    consignee: text(consignee),
    qty: text(qty),
    gw: text(gw),
    pol: text(pol),
    pod: text(pod),
    mawb_bl: text(mawbBl),
    hawb: text(hawb),
    si_date: formatDateVal(siDate),
    collection: formatDateVal(collection),
    fl1_origin: text(fl1Origin),
    fl1_flight: text(fl1Flight),
    fl1_departed: formatDateVal(fl1Departed),
    fl2_destination: text(fl2Destination),
    fl2_flight: text(fl2Flight),
    fl2_arrived: formatDateVal(fl2Arrived),
    clearance_date: formatDateVal(clearanceDate),
    delivery_to_paiton: formatDateVal(deliveryToPaiton),
    search_text: ''
  };

  item.search_text = [
    item.hawb, item.mawb_bl, item.po, item.shipper, item.consignee,
    item.fl1_flight, item.fl2_flight, item.fl1_origin, item.fl2_destination
  ].filter(Boolean).join(' ').toUpperCase();

  airRecords.push(item);
}

const airOutput = `import { AirCargoTracking } from './types';\n\nexport const airCargoData: AirCargoTracking[] = ${JSON.stringify(airRecords, null, 2)};\n`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data-air.ts'), airOutput);
console.log(`✅ Air Freight processed: ${airRecords.length} records written to src/lib/data-air.ts`);

// 2. Process SEA FREIGHT
const seaPath = path.join(process.cwd(), 'data', 'source', 'SEA FREIGHT PAITON1.xlsx');
const wbSea = xlsx.readFile(seaPath, { cellDates: false });
const wsSea = wbSea.Sheets[wbSea.SheetNames[0]];
const seaRows = xlsx.utils.sheet_to_json<unknown[]>(wsSea, { header: 1, defval: '', raw: false }).slice(1);

const seaRecords: any[] = [];
let seaId = 1;

for (const row of seaRows) {
  const [
    no, po, serviceType, shipper, consignee, qty, grossWeight, pol, pod, blNo,
    siDate, collection, departed, arrived, vessel, clearanceDate, deliveryToPaiton
  ] = row;

  if (!text(blNo) && !text(po)) continue;

  const item = {
    id: String(seaId++),
    no: text(no),
    po: text(po),
    service_type: text(serviceType),
    shipper: text(shipper),
    consignee: text(consignee),
    qty: text(qty),
    gross_weight: text(grossWeight),
    pol: text(pol),
    pod: text(pod),
    bl_no: text(blNo),
    si_date: formatDateVal(siDate),
    collection: formatDateVal(collection),
    departed: formatDateVal(departed),
    arrived: formatDateVal(arrived),
    vessel: text(vessel),
    clearance_date: formatDateVal(clearanceDate),
    delivery_to_paiton: formatDateVal(deliveryToPaiton),
    search_text: ''
  };

  item.search_text = [
    item.bl_no, item.po, item.shipper, item.consignee,
    item.vessel, item.pol, item.pod
  ].filter(Boolean).join(' ').toUpperCase();

  seaRecords.push(item);
}

const seaOutput = `import { OceanCargoTracking } from './types';\n\nexport const oceanCargoData: OceanCargoTracking[] = ${JSON.stringify(seaRecords, null, 2)};\n`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data-ocean.ts'), seaOutput);
console.log(`✅ Sea Freight processed: ${seaRecords.length} records written to src/lib/data-ocean.ts`);
