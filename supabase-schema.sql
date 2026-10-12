-- =======================================================
-- SQL SCHEMA FOR AIR FREIGHT & SEA FREIGHT TRACKING
-- Run this in your Supabase SQL Editor:
-- =======================================================

-- 1. Table for Package / Air Cargo
CREATE TABLE IF NOT EXISTS air_cargo_tracking (
  id SERIAL PRIMARY KEY,
  no TEXT DEFAULT '',
  po TEXT DEFAULT '',
  service_type TEXT DEFAULT '',
  shipper TEXT DEFAULT '',
  consignee TEXT DEFAULT '',
  qty TEXT DEFAULT '',
  gw TEXT DEFAULT '',
  pol TEXT DEFAULT '',
  pod TEXT DEFAULT '',
  mawb_bl TEXT DEFAULT '',
  hawb TEXT NOT NULL DEFAULT '',
  si_date TEXT DEFAULT '',
  collection TEXT DEFAULT '',
  fl1_origin TEXT DEFAULT '',
  fl1_flight TEXT DEFAULT '',
  fl1_departed TEXT DEFAULT '',
  fl2_destination TEXT DEFAULT '',
  fl2_flight TEXT DEFAULT '',
  fl2_arrived TEXT DEFAULT '',
  clearance_date TEXT DEFAULT '',
  delivery_to_paiton TEXT DEFAULT '',
  search_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_hawb ON air_cargo_tracking (hawb);
CREATE INDEX IF NOT EXISTS idx_air_search ON air_cargo_tracking (search_text);

ALTER TABLE air_cargo_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read air" ON air_cargo_tracking;
DROP POLICY IF EXISTS "Public can insert air" ON air_cargo_tracking;
DROP POLICY IF EXISTS "Public can update air" ON air_cargo_tracking;
DROP POLICY IF EXISTS "Public can delete air" ON air_cargo_tracking;

CREATE POLICY "Public can read air" ON air_cargo_tracking FOR SELECT USING (true);
CREATE POLICY "Public can insert air" ON air_cargo_tracking FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update air" ON air_cargo_tracking FOR UPDATE USING (true);
CREATE POLICY "Public can delete air" ON air_cargo_tracking FOR DELETE USING (true);


-- 2. Table for Ocean Cargo
CREATE TABLE IF NOT EXISTS ocean_cargo_tracking (
  id SERIAL PRIMARY KEY,
  no TEXT DEFAULT '',
  po TEXT DEFAULT '',
  service_type TEXT DEFAULT '',
  shipper TEXT DEFAULT '',
  consignee TEXT DEFAULT '',
  qty TEXT DEFAULT '',
  gross_weight TEXT DEFAULT '',
  pol TEXT DEFAULT '',
  pod TEXT DEFAULT '',
  bl_no TEXT NOT NULL DEFAULT '',
  si_date TEXT DEFAULT '',
  collection TEXT DEFAULT '',
  departed TEXT DEFAULT '',
  arrived TEXT DEFAULT '',
  vessel TEXT DEFAULT '',
  clearance_date TEXT DEFAULT '',
  delivery_to_paiton TEXT DEFAULT '',
  search_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ocean_bl ON ocean_cargo_tracking (bl_no);
CREATE INDEX IF NOT EXISTS idx_ocean_search ON ocean_cargo_tracking (search_text);

ALTER TABLE ocean_cargo_tracking ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read ocean" ON ocean_cargo_tracking;
DROP POLICY IF EXISTS "Public can insert ocean" ON ocean_cargo_tracking;
DROP POLICY IF EXISTS "Public can update ocean" ON ocean_cargo_tracking;
DROP POLICY IF EXISTS "Public can delete ocean" ON ocean_cargo_tracking;

CREATE POLICY "Public can read ocean" ON ocean_cargo_tracking FOR SELECT USING (true);
CREATE POLICY "Public can insert ocean" ON ocean_cargo_tracking FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update ocean" ON ocean_cargo_tracking FOR UPDATE USING (true);
CREATE POLICY "Public can delete ocean" ON ocean_cargo_tracking FOR DELETE USING (true);
