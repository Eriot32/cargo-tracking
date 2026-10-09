import { cargoData } from './data';
import { supabase } from './supabase';
import type { CargoTracking } from './types';

/**
 * Fetches ALL cargo data (Will be moved to Admin Panel only later)
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

  return data.map((row: any) => ({ ...row, id: String(row.id) })) as CargoTracking[];
}

/**
 * SECURE TRACKING: Fetches a SINGLE cargo record by exact HAWB or MAWB
 */
export async function getCargoByTrackingNumber(trackingNumber: string): Promise<CargoTracking | null> {
  if (!trackingNumber) return null;
  const term = trackingNumber.trim().toUpperCase();

  if (!supabase) {
    // Fallback to local data
    const found = cargoData.find(
      item => item.hawb.toUpperCase() === term || item.mawb.toUpperCase() === term
    );
    return found || null;
  }

  // Exact match query to Supabase (case-insensitive)
  const { data, error } = await supabase
    .from('cargo_tracking')
    .select('id, ponum_pib, pengirim, hawb, mawb, pieces_weight, routing, flights, search_text')
    .or(`hawb.eq.${term},mawb.eq.${term}`)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Supabase search error:', error?.message);
    return null;
  }

  if (!data) return null;

  return { ...data, id: String(data.id) } as CargoTracking;
}
