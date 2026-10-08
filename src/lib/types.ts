
export interface FlightInfo {
  flight: string;
  route: string;
  date_time: string;
}

export interface CargoTracking {
  id: string;
  ponum_pib: string;
  pengirim: string;
  hawb: string;
  mawb: string;
  pieces_weight: string;
  routing: string;
  image_url: string;
  flights: FlightInfo[];
  search_text: string;
}

export interface SearchResult {
  data: CargoTracking[];
  total: number;
  query: string;
}
