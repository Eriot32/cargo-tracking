const xlsx = require('xlsx');

const workbook = xlsx.readFile('data/source/DATA CARGO.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

console.log("=== HEADERS ===");
console.log(data[0]);

console.log("\n=== FIRST 3 ROWS ===");
console.log(data[1]);
console.log(data[2]);
console.log(data[3]);

console.log(`\nTotal rows (including header): ${data.length}`);
