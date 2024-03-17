export type AppointmentItem = {
  id: number;
  start: Date;
  end: Date;
  status: number;
  client: ClientItem[];
  services: ServiceItem[];
  className: string;
};

export type ClientItem = {
  id: number;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
};

// Define the type for a service item
export type ServiceItem = {
  id: number;
  service: number;
  staff: number;
  start: Date; // Change the type to Date
  end: Date; // Change the type to Date
  duration: string;
  price: string;
};


