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
  clinic: Clinic,
  estimated_arrival_time?: string
}

export interface Supply {
  id: string,
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
  weight: number
}

export interface Clinic {
  id: string,
  name: string,
  latitude: number,
  longitude: number
}