import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

// 1. Read Excel File
const workbook = xlsx.readFile('data/source/DATA CARGO.xlsx', { cellDates: true }); // cellDates parses excel serial dates to JS Dates
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Using header: 1 to handle duplicate column names (like 'FLIGHT ')
const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
const headers = rows[0] as string[];
const dataRows = rows.slice(1);

// Normalize header strings (trim spaces)
const h = headers.map(header => (header ? header.trim() : ''));

// Function to format Date nicely
const formatDate = (dateValue: any) => {
  if (!dateValue) return '';
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return dateValue.toString();
};

const formatTime = (timeFraction: any) => {
  if (timeFraction == null || timeFraction === '') return '';
  if (typeof timeFraction === 'number') {
     // Excel time is a fraction of 24 hours
     const totalSeconds = Math.round(timeFraction * 24 * 3600);
     const hours = Math.floor(totalSeconds / 3600);
     const minutes = Math.floor((totalSeconds % 3600) / 60);
     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  return timeFraction.toString();
};

// Extracted image data mapping (from previous AI subagent extraction)
// This maps MAWB to the correct image name
const imageMap: Record<string, string> = {
  "18018999282": "image1.png",
  "13149844922": "image2.png",
  "67226080176": "image3.png",
  "29763771061": "image4.png",
  "61824259303": "image5.png",
  "61821250051": "image6.png",
  "61836071114": "image7.png",
  "18026227121": "image8.png",
  "18026227246": "image9.png",
  "61844301924": "image10.png",
  "18018840393": "image11.png",
  "61848094686": "image12.png",
  "12690436603": "image13.png",
  "18026407721": "image14.png",
  "61846278256": "image15.png",
  "16001350996": "image16.png",
  "23216101562": "image17.png",
  "61846648125": "image18.png",
  "18018840581": "image19.png",
  "61847610861": "image21.png",
  "29769793146": "image22.png",
  "12690483606": "image23.png",
  "12690483632": "image24.png",
  "61834679470": "image25.png",
  "18018840544": "image26.png",
  "29769793242": "image27.png",
  "61850819344": "image28.png"
};

const cleanMawb = (mawb: string) => {
  if (!mawb) return '';
  return mawb.toString().replace(/[^0-9]/g, '');
};

const processedData = dataRows.map((row: any, index) => {
  // Map row array to headers
  const mawbRaw = row[h.indexOf('MAWB')] || row[h.indexOf('MAWB ')] || '';
  const mawbClean = cleanMawb(mawbRaw);
  
  // Find matching image, fallback to image{index+1}.png if exact match not found
  const imgName = imageMap[mawbClean] || `image${index + 1}.png`;

  const item = {
    id: (index + 1).toString(),
    ponum_pib: (row[h.indexOf('PONUM_PIB')] || '').toString(),
    pengirim: (row[h.indexOf('PENGIRIM')] || '').toString(),
    hawb: (row[h.indexOf('HAWB')] || row[4] || '').toString(), // HAWB is usually column index 3 (0-based) based on logs, let's use exact index
  };

  // Re-assign explicitly using indices to be 100% safe since headers have spaces
  const hawbStr = (row[3] || '').toString();
  const mawbStr = (row[4] || '').toString();

  const flight1 = {
    origin: (row[7] || '').toString(),
    flight: (row[8] || '').toString(),
    depDate: formatDate(row[9]),
    depTime: formatTime(row[10]),
  };

  const flight2 = {
    origin: (row[11] || '').toString(),
    flight: (row[12] || '').toString(),
    arrDate: formatDate(row[13]),
    arrTime: formatTime(row[14]),
  };
  
  const quantity = row[5] ? row[5].toString() : '';
  const weight = row[6] ? row[6].toString() : '';

  const finalItem = {
    id: (index + 1).toString(),
    ponum_pib: (row[1] || '').toString(),
    pengirim: (row[2] || '').toString(),
    hawb: hawbStr,
    mawb: mawbStr,
    pieces_weight: `${quantity} pcs / ${weight} kg`,
    routing: `${flight1.origin} ✈️ ${flight2.origin}`,
    image_url: `/tracking-images/${imgName}`,
    flights: [
      {
        flight: flight1.flight,
        route: flight1.origin,
        date_time: `Departure: ${flight1.depDate} ${flight1.depTime}`
      },
      {
        flight: flight2.flight,
        route: flight2.origin,
        date_time: `Arrival: ${flight2.arrDate} ${flight2.arrTime}`
      }
    ].filter(f => f.flight || f.route),
    search_text: ''
  };

  // Build search string
  finalItem.search_text = [
    finalItem.ponum_pib,
    finalItem.pengirim,
    finalItem.hawb, // Highlight HAWB for search
    finalItem.mawb,
    finalItem.routing,
    flight1.flight,
    flight2.flight
  ].filter(Boolean).join(' ').toUpperCase();

  return finalItem;
});

const typesContent = `
export interface FlightInfo {
  flight: string;
  route: string;
  date_time: string;
}

export interface CargoTracking {
  id: string;
  ponum_pib: string;
  pengirim: string;
  hawb: string;
  mawb: string;
  pieces_weight: string;
  routing: string;
  image_url: string;
  flights: FlightInfo[];
  search_text: string;
}

export interface SearchResult {
  data: CargoTracking[];
  total: number;
  query: string;
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'types.ts'), typesContent);

const fileContent = `import { CargoTracking } from './types';

export const cargoData: CargoTracking[] = ${JSON.stringify(processedData, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data.ts'), fileContent);
console.log('Successfully processed DATA CARGO.xlsx into src/lib/data.ts');
