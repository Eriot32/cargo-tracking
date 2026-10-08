const xlsx = require('xlsx');
const path = require('path');

const workbook = xlsx.readFile(path.join(__dirname, 'data', 'source', 'DATA TRACKING PAITON DD 08.10.2026 (FINAL).xlsx'), { cellDates: true });
const ws = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

console.log("=== HEADERS ===");
console.log(data[0]);

console.log("\n=== ROW 1 ===");
console.log(data[1]);
