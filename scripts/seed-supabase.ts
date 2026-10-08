import { createClient } from '@supabase/supabase-js';
import { cargoData } from '../src/lib/data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before running npm run seed.'
  );
}

async function seed() {
  const supabase = createClient(supabaseUrl!, serviceRoleKey!);
  const { error } = await supabase
    .from('cargo_tracking')
    .upsert(cargoData, { onConflict: 'id' });

  if (error) throw error;
  console.log(`Imported ${cargoData.length} cargo records into Supabase.`);
}

void seed();
