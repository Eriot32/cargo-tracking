import { airCargoData } from './data-air';
import { oceanCargoData } from './data-ocean';
import { supabase } from './supabase';
import type { AirCargoTracking, OceanCargoTracking } from './types';

// ================= AIR CARGO FUNCTIONS =================
export async function getAllAirCargo(): Promise<AirCargoTracking[]> {
  if (!supabase) return airCargoData;

  try {
    const { data, error } = await supabase
      .from('air_cargo_tracking')
      .select('*')
      .order('id');

    if (error || !data || data.length === 0) {
      return airCargoData;
    }
    return data.map((r: any) => ({ ...r, id: String(r.id) })) as AirCargoTracking[];
  } catch {
    return airCargoData;
  }
}

export async function getAirCargoByHawb(query: string): Promise<AirCargoTracking | null> {
  if (!query) return null;
  const term = query.trim().toUpperCase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('air_cargo_tracking')
        .select('*')
        .or(`hawb.ilike.${term},mawb_bl.ilike.${term}`)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return { ...data, id: String(data.id) } as AirCargoTracking;
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to local air data:', e);
    }
  }

  // Fallback to local data
  const found = airCargoData.find(
    (item) =>
      item.hawb.toUpperCase().trim() === term ||
      item.mawb_bl.toUpperCase().trim() === term ||
      item.hawb.toUpperCase().replace(/[^A-Z0-9]/g, '') === term.replace(/[^A-Z0-9]/g, '')
  );
  return found || null;
}

// ================= OCEAN CARGO FUNCTIONS =================
export async function getAllOceanCargo(): Promise<OceanCargoTracking[]> {
  if (!supabase) return oceanCargoData;

  try {
    const { data, error } = await supabase
      .from('ocean_cargo_tracking')
      .select('*')
      .order('id');

    if (error || !data || data.length === 0) {
      return oceanCargoData;
    }
    return data.map((r: any) => ({ ...r, id: String(r.id) })) as OceanCargoTracking[];
  } catch {
    return oceanCargoData;
  }
}

export async function getOceanCargoByBL(query: string): Promise<OceanCargoTracking | null> {
  if (!query) return null;
  const term = query.trim().toUpperCase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('ocean_cargo_tracking')
        .select('*')
        .or(`bl_no.ilike.${term},po.ilike.${term}`)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return { ...data, id: String(data.id) } as OceanCargoTracking;
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to local ocean data:', e);
    }
  }

  // Fallback to local data
  const found = oceanCargoData.find(
    (item) =>
      item.bl_no.toUpperCase().trim() === term ||
      item.bl_no.toUpperCase().replace(/[^A-Z0-9]/g, '') === term.replace(/[^A-Z0-9]/g, '')
  );
  return found || null;
}
