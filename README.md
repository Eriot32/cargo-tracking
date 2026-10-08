# Cargo Tracking Search — PAITON

A professional cargo tracking search engine built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.  
Search instantly by **HAWB** (House Air Waybill), MAWB, shipper name, routing, or flight number.

## Features

- ⚡ **Instant Search** — Real-time filtering as you type
- 📦 **HAWB-focused** — Primary search by House Air Waybill number
- 🖼️ **Tracking Screenshots** — Original MAWB document images attached to each record
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- 🎨 **Professional UI** — Clean, minimal design with Tailwind CSS

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Framework  | Next.js 14 (App Router) |
| Styling    | Tailwind CSS 3      |
| Language   | TypeScript          |
| Database   | Supabase (PostgreSQL) — *optional, works offline with local JSON data* |
| Hosting    | Vercel              |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Importing Data

To update cargo data from a new Excel file:

```bash
npm run import:tracking -- "data/source/YOUR_FILE.xlsx"
```

This reads the Excel, deduplicates records, and writes the result to `src/lib/data.ts`.

## Project Structure

```
├── public/
│   └── tracking-images/     # MAWB tracking screenshots
├── data/
│   └── source/              # Source Excel/DOCX files (gitignored)
├── scripts/
│   ├── import-cargo-xlsx.ts  # Excel import & dedup script
│   └── seed-supabase.ts      # Supabase seeding script
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          # Main search page
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── TrackingCard.tsx
│   │   └── TrackingModal.tsx
│   └── lib/
│       ├── cargo.ts          # Data fetching helper
│       ├── data.ts           # Generated data (from import script)
│       ├── supabase.ts       # Supabase client
│       └── types.ts          # TypeScript interfaces
└── supabase/                 # Supabase migration files
```

## License

Private — PAITON Internal Use
