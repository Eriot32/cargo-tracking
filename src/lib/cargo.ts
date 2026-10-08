import { cargoData } from './data';
import { supabase } from './supabase';
import type { CargoTracking } from './types';

/**
 * Fetches cargo data from Supabase when configured.
 * Falls back to local static data during development or if Supabase is unavailable.
 */
export async function getCargoData(): Promise<CargoTracking[]> {
  if (!supabase) return cargoData;

  const { data, error } = await supabase
    .from('cargo_tracking')
    .select('id, ponum_pib, pengirim, hawb, mawb, pieces_weight, routing, flights, search_text')
    .order('id');

  if (error || !data) {
    console.error('Unable to load cargo data from Supabase:', error?.message);
    return cargoData;
  }

  // Map database id (number) to string for compatibility with local types
  return data.map((row: any) => ({ ...row, id: String(row.id) })) as CargoTracking[];
}
