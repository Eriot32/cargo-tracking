import { cargoData } from './data';
import { supabase } from './supabase';
import type { CargoTracking } from './types';

/**
 * Uses Supabase after it is configured. The local data is intentionally kept as
 * a development fallback, so the interface remains usable before first setup.
 */
export async function getCargoData(): Promise<CargoTracking[]> {
  if (!supabase) return cargoData;

  const { data, error } = await supabase
    .from('cargo_tracking')
    .select('id, ponum_pib, pengirim, hawb, mawb, pieces_weight, routing, image_url, flights, search_text')
    .order('id');

  if (error || !data) {
    console.error('Unable to load cargo data from Supabase:', error?.message);
    return cargoData;
  }

  return data as CargoTracking[];
}
