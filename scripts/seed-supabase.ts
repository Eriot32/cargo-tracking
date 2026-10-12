import { createClient } from '@supabase/supabase-js';
import { airCargoData } from '../src/lib/data-air';
import { oceanCargoData } from '../src/lib/data-ocean';
import * as fs from 'fs';
import * as path from 'path';

// Manually load .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  process.env[key] = value;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase credentials missing in .env.local');
}

async function seed() {
  const supabase = createClient(supabaseUrl!, serviceRoleKey!);
  console.log(`Connecting to Supabase: ${supabaseUrl}`);

  // 1. Seed Air Cargo
  try {
    console.log('Seeding Air Cargo Tracking...');
    await supabase.from('air_cargo_tracking').delete().gte('id', 0);
    const airRows = airCargoData.map(({ id, ...rest }) => rest);
    const { error: airErr } = await supabase.from('air_cargo_tracking').insert(airRows);
    if (airErr) {
      console.warn('Air table might not exist yet:', airErr.message);
    } else {
      console.log(`✅ Seeded ${airRows.length} Air Cargo records.`);
    }
  } catch (e: any) {
    console.warn('Air seed failed:', e.message);
  }

  // 2. Seed Ocean Cargo
  try {
    console.log('Seeding Ocean Cargo Tracking...');
    await supabase.from('ocean_cargo_tracking').delete().gte('id', 0);
    const oceanRows = oceanCargoData.map(({ id, ...rest }) => rest);
    const { error: oceanErr } = await supabase.from('ocean_cargo_tracking').insert(oceanRows);
    if (oceanErr) {
      console.warn('Ocean table might not exist yet:', oceanErr.message);
    } else {
      console.log(`✅ Seeded ${oceanRows.length} Ocean Cargo records.`);
    }
  } catch (e: any) {
    console.warn('Ocean seed failed:', e.message);
  }
}

void seed();
