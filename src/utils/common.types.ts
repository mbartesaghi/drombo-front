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
}

export interface Supply {
  id: string,
  name: string,
  quantity: number,
  weight: number,
  notes: string
}