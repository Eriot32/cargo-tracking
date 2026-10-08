import { createClient } from '@supabase/supabase-js';
import { cargoData } from '../src/lib/data';
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
  throw new Error(
    'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before running npm run seed.'
  );
}

async function seed() {
  console.log(`Connecting to Supabase at ${supabaseUrl}...`);
  const supabase = createClient(supabaseUrl!, serviceRoleKey!);

  // Strip out the local 'id' field — the database uses SERIAL auto-increment
  const rows = cargoData.map(({ id, ...rest }) => rest);

  console.log(`Inserting ${rows.length} records...`);
  const { error } = await supabase
    .from('cargo_tracking')
    .insert(rows);

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  console.log(`✅ Successfully seeded ${rows.length} cargo records into Supabase!`);
}

void seed();
