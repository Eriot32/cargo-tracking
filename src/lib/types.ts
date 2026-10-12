export interface AirCargoTracking {
  id: string;
  no?: string;
  po: string;
  service_type: string;
  shipper: string;
  consignee: string;
  qty: string;
  gw: string;
  pol: string;
  pod: string;
  mawb_bl: string;
  hawb: string;
  si_date: string;
  collection: string;
  fl1_origin: string;
  fl1_flight: string;
  fl1_departed: string;
  fl2_destination: string;
  fl2_flight: string;
  fl2_arrived: string;
  clearance_date: string;
  delivery_to_paiton: string;
  search_text: string;
}

export interface OceanCargoTracking {
  id: string;
  no?: string;
  po: string;
  service_type: string;
  shipper: string;
  consignee: string;
  qty: string;
  gross_weight: string;
  pol: string;
  pod: string;
  bl_no: string;
  si_date: string;
  collection: string;
  departed: string;
  arrived: string;
  vessel: string;
  clearance_date: string;
  delivery_to_paiton: string;
  search_text: string;
}

export type CargoMode = 'air' | 'ocean';
