export interface Transfer {
  id?: string;
  type: string,
  request_date: string,
  requester: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  compartment: string,
  urgency: string,
  clinic_id: string,
  clinic?: Clinic,
  estimated_arrival_date?: string,
  estimated_arrival_time?: string,
  status?: string,
  supplies?: Supply[]
}

export interface Supply {
  id: number,
  name: string,
  quantity: number,
  weight: number,
  notes: string
}

export interface Route {
  id: string,
  transfer_ids: string,
  start_time: string,
  end_time: string,
  transfers: Transfer[],
  status: string,
  date: string,
  weight: number,
  routed_transfers_order: string,
}

export interface Clinic {
  id: string,
  name: string,
  latitude: number,
  longitude: number
}