const xlsx = require('xlsx');
const path = require('path');

const workbook = xlsx.readFile(path.join(__dirname, 'data', 'source', 'DATA TRACKING PAITON DD 08.10.2026 (FINAL).xlsx'));
const ws = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws, { header: 1 }).slice(1);

const seen = new Set();
const duplicates = [];

for (const row of data) {
  const no = row[0];
  const hawb = String(row[3] || '').trim();
  const mawb = String(row[4] || '').trim();
  
  if (!hawb && !mawb) continue; // skip totally empty rows

  const key = `${mawb.replace(/[^A-Za-z0-9]/g, '').toUpperCase()}|${hawb.replace(/[^A-Za-z0-9]/g, '').toUpperCase()}`;
  
  if (seen.has(key)) {
    duplicates.push({ no, hawb, mawb });
  } else {
    seen.add(key);
  }
}

console.log("=== HASIL PENGECEKAN ===");
if (duplicates.length > 0) {
  console.log("Ditemukan data ganda (Duplikat) pada file Excel:");
  duplicates.forEach(d => console.log(`- Nomor Urut di Excel: ${d.no} | HAWB: ${d.hawb} | MAWB: ${d.mawb}`));
} else {
  console.log("Tidak ada data ganda.");
}
