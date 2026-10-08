import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

// 1. DATA DARI WORD (28 Records)
const wordData = [
  { id: '1', ponum_pib: '100125/PE/POMI/26', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-72171', mawb: '18018999282', tgl: '2026-02-03', image_url: '/tracking-images/image1.png' },
  { id: '2', ponum_pib: '92682/PE/POMI/24', pengirim: 'JAPAN MACHINERY COMPANY', blawb: 'UCI-70030563', mawb: '13149844922', tgl: '2025-01-29', image_url: '/tracking-images/image2.png' },
  { id: '3', ponum_pib: '94549/PE/POMI/24', pengirim: 'APT POWERDRIVE', blawb: 'UK25002547', mawb: '67226080176', tgl: '2025-02-27', image_url: '/tracking-images/image3.png' },
  { id: '4', ponum_pib: '94907/PE/POMI/25', pengirim: 'MCMASTER CARR SUPPLY CO', blawb: 'CAEH-59149', mawb: '29763771061', tgl: '2025-01-30', image_url: '/tracking-images/image4.png' },
  { id: '5', ponum_pib: '94970/PE/POMI/25', pengirim: 'M.C.V S.P.A', blawb: 'IT25000880', mawb: '61824259303', tgl: '2025-03-14', image_url: '/tracking-images/image5.png' },
  { id: '6', ponum_pib: '94976/PE/POMI/25', pengirim: 'PILGRIM INTERNATIONAL LTD', blawb: 'SE25000840', mawb: '61821250051', tgl: '2025-05-19', image_url: '/tracking-images/image6.png' },
  { id: '7', ponum_pib: '94979/PE/POMI/25', pengirim: 'BEAUDREY PORTUGAL LDA', blawb: '00014769', mawb: '61836071114', tgl: '2025-07-01', image_url: '/tracking-images/image7.png' },
  { id: '8', ponum_pib: '95311/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-71121', mawb: '18026227121', tgl: '2025-03-03', image_url: '/tracking-images/image8.png' },
  { id: '9', ponum_pib: '95749/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-71200', mawb: '18026227246', tgl: '2025-03-26', image_url: '/tracking-images/image9.png' },
  { id: '10', ponum_pib: '95985/PE/POMI/25', pengirim: 'KENSEI SANGYO CO., LTD', blawb: 'UCI-70032102', mawb: '61844301924', tgl: '2025-07-08', image_url: '/tracking-images/image10.png' },
  { id: '11', ponum_pib: '96149/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-71947', mawb: '18018840393', tgl: '2025-11-22', image_url: '/tracking-images/image11.png' },
  { id: '12', ponum_pib: '96717/PE/POMI/25', pengirim: 'NEWMANS VALVE', blawb: 'H701388146', mawb: '61848094686', tgl: '2025-11-30', image_url: '/tracking-images/image12.png' },
  { id: '13', ponum_pib: '96733/PE/POMI/25', pengirim: 'EXIM & MFR ENTERPRISE', blawb: 'RL202511005', mawb: '12690436603', tgl: '2025-11-17', image_url: '/tracking-images/image13.png' },
  { id: '14', ponum_pib: '96809/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-71543', mawb: '18026407721', tgl: '2025-07-03', image_url: '/tracking-images/image14.png' },
  { id: '15', ponum_pib: '97000/PE/POMI/25', pengirim: 'CAJIMA CORPORATION LTD', blawb: 'UCI-10056003', mawb: '61846278256', tgl: '2025-08-14', image_url: '/tracking-images/image15.png' },
  { id: '16', ponum_pib: '97405/PE/POMI/25', pengirim: 'BUFFALO PUMPS', blawb: 'S00002940', mawb: '16001350996', tgl: '2025-12-03', image_url: '/tracking-images/image16.png' },
  { id: '17', ponum_pib: '97547/PE/POMI/25', pengirim: 'YOKOTA MANUFACTURING CO.,LTD', blawb: 'SAF-80058650', mawb: '23216101562', tgl: '2026-03-31', image_url: '/tracking-images/image17.png' },
  { id: '18', ponum_pib: '97714/PE/POMI/25', pengirim: 'JOHN THOMPSON ENGINEERING PTY LTD', blawb: 'MELAA3082371', mawb: '61846648125', tgl: '2026-02-06', image_url: '/tracking-images/image18.png' },
  { id: '19', ponum_pib: '97816/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-72012', mawb: '18018840581', tgl: '2025-12-15', image_url: '/tracking-images/image19.png' },
  { id: '20', ponum_pib: '97892/PE/POMI/25', pengirim: 'JOHN THOMPSON ENGINEERING PTY LTD', blawb: 'MELAA3082371', mawb: '61846648125', tgl: '2026-02-06', image_url: '/tracking-images/image20.png' }, // Duplikat dgn 18
  { id: '21', ponum_pib: '98209/PE/POMI/25', pengirim: 'AESCO INTERNATIONAL PTE LTD', blawb: '202509-00012', mawb: '61847610861', tgl: '2025-09-23', image_url: '/tracking-images/image21.png' },
  { id: '22', ponum_pib: '98393/PE/POMI/25', pengirim: 'MCMASTER CARR SUPPLY COMPANY', blawb: 'CAEH-59687', mawb: '29769793146', tgl: '2025-10-16', image_url: '/tracking-images/image22.png' },
  { id: '23', ponum_pib: '98497/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'RL202512007', mawb: '12690483606', tgl: '2025-12-12', image_url: '/tracking-images/image23.png' },
  { id: '24', ponum_pib: '98773/PE/POMI/25', pengirim: 'DEPCOM INTERNATIONAL', blawb: 'RL202512009', mawb: '12690483632', tgl: '2025-12-17', image_url: '/tracking-images/image24.png' },
  { id: '25', ponum_pib: '98890/PE/POMI/25', pengirim: 'HOWDEN AXIAL FANS APS', blawb: 'DK26000095', mawb: '61834679470', tgl: '2026-01-16', image_url: '/tracking-images/image25.png' },
  { id: '26', ponum_pib: '99391/PE/POMI/25', pengirim: 'QUINTA RADDISON INC', blawb: 'NAEH-71994', mawb: '18018840544', tgl: '2025-12-09', image_url: '/tracking-images/image26.png' },
  { id: '27', ponum_pib: '99643/PE/POMI/25', pengirim: 'MCMASTER CARR SUPPLY COMPANY', blawb: 'CAEH-59826', mawb: '29769793242', tgl: '2025-12-19', image_url: '/tracking-images/image27.png' },
  { id: '28', ponum_pib: '99696/PE/POMI/25', pengirim: 'DEPCOM INTERNATIONAL', blawb: 'JL202604060', mawb: '61850819344', tgl: '2026-04-15', image_url: '/tracking-images/image28.png' }
];

// 2. DATA DARI AI IMAGE EXTRACTION
const imgAiData: any = {
  "18018999282": { routing: "JFK-ICN-CGK", pw: "1 pcs / 15 kg", f: [{ flight: "KE0270", route: "JFK-ICN", date_time: "5 Feb 2026" }] },
  "13149844922": { routing: "NRT-CGK", pw: "1 pcs / 178.0 KGS", f: [{ flight: "JL725", route: "NRT-CGK", date_time: "30 JAN" }] },
  "67226080176": { routing: "LHR-BWN-SUB", pw: "1 pcs / 100.0 kg", f: [{ flight: "BI098", route: "LHR-BWN", date_time: "03 MAR 25" }] },
  "29763771061": { routing: "ORD-TPE-CGK", pw: "1 pcs / 9 kg", f: [{ flight: "CI-5239", route: "ORD-TPE", date_time: "31 Jan" }] }
};

// Helper
const cleanMawb = (mawb: string) => mawb ? mawb.toString().replace(/[^0-9]/g, '') : '';
const formatDate = (dateValue: any) => {
  if (!dateValue) return '';
  if (dateValue instanceof Date) return dateValue.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  return dateValue.toString();
};
const formatTime = (timeFraction: any) => {
  if (timeFraction == null || timeFraction === '') return '';
  if (typeof timeFraction === 'number') {
     const totalSeconds = Math.round(timeFraction * 24 * 3600);
     const hours = Math.floor(totalSeconds / 3600);
     const minutes = Math.floor((totalSeconds % 3600) / 60);
     return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
  }
  return timeFraction.toString();
};

// 3. BACA DATA DARI EXCEL
const workbook = xlsx.readFile('data/source/DATA CARGO.xlsx', { cellDates: true });
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
const h = rows[0].map((hdr: string) => hdr ? hdr.trim() : '');
const excelRows = rows.slice(1);

const excelMap: any = {};
excelRows.forEach(row => {
  const m = cleanMawb(row[h.indexOf('MAWB')] || row[4] || '');
  if(!m) return;
  
  const origin1 = (row[7] || '').toString();
  const flight1 = (row[8] || '').toString();
  const depDate1 = formatDate(row[9]);
  const depTime1 = formatTime(row[10]);

  const origin2 = (row[11] || '').toString();
  const flight2 = (row[12] || '').toString();
  const arrDate2 = formatDate(row[13]);
  const arrTime2 = formatTime(row[14]);

  let r = origin1 + " -> " + origin2;
  if(r === " -> ") r = "";

  excelMap[m] = {
    hawb: (row[3] || '').toString(),
    quantity: row[5] || '',
    weight: row[6] || '',
    routing: r,
    flights: [
      { flight: flight1, route: origin1, date_time: "Departure: " + depDate1 + " " + depTime1 },
      { flight: flight2, route: origin2, date_time: "Arrival: " + arrDate2 + " " + arrTime2 }
    ].filter(f => f.flight || f.route)
  };
});

// 4. GABUNGKAN & FILTER DUPLIKAT (De-duplication)
const finalData: any[] = [];
const seenKeys = new Set();

wordData.forEach((wData) => {
  const cleanM = cleanMawb(wData.mawb);
  const exData = excelMap[cleanM];
  const aiData = imgAiData[cleanM];

  const pw = exData ? exData.quantity + " pcs / " + exData.weight + " kg" : (aiData?.pw || '-');
  const routing = exData?.routing || aiData?.routing || 'Rute Standar';
  
  // Ambil HAWB dari excel jika ada, kalau tdk fallback ke blawb word
  const hawb = exData?.hawb || wData.blawb;
  
  // Kombinasi Unik: MAWB + HAWB
  const uniqueKey = cleanM + "-" + cleanMawb(hawb);

  if (!seenKeys.has(uniqueKey)) {
    seenKeys.add(uniqueKey); // Tandai sebagai sudah dilihat

    const finalItem = {
      id: wData.id,
      ponum_pib: wData.ponum_pib,
      pengirim: wData.pengirim,
      mawb: wData.mawb,
      hawb: hawb,
      pieces_weight: pw,
      routing: routing,
      image_url: wData.image_url,
      flights: exData?.flights || aiData?.f || [],
      search_text: ''
    };

    finalItem.search_text = [
      finalItem.ponum_pib,
      finalItem.pengirim,
      finalItem.hawb, 
      finalItem.mawb,
      finalItem.routing,
      ...finalItem.flights.map((f: any) => f.flight + " " + f.route)
    ].filter(Boolean).join(' ').toUpperCase();

    finalData.push(finalItem);
  }
});

const contentLines = [
  "import { CargoTracking } from './types';",
  "",
  "export const cargoData: CargoTracking[] = " + JSON.stringify(finalData, null, 2) + ";"
];

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'data.ts'), contentLines.join('\n'));
console.log('Successfully MERGED DATA and REMOVED DUPLICATES. Total unique records: ' + finalData.length);
