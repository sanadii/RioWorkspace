import { Dispatch } from "react";

export interface InvoiceSidebarProps {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  serviceList: any;
  appointment: any;
  services: Service[]; // add this line
  staff: Staff[]; // add this line
  setServiceList: Dispatch<any>; // existing type
  discountOptions: Discount[];

}

export interface Service {
  id: number;
  name: string;
  duration: number;
  categoryName?: string;
  staff: string;
  price: number;
  startTime: Date;
  endTime: Date;
  discount?: number;
}

export interface Staff {
  id: number;
  name: string;
  bookable: boolean;
  image: string;
}

export interface Discount {
    id: number;
    name: string;
    value: string;
    category: string;
  }

export interface ServiceTabProps {
  serviceList: any; // existing type
  services: Service[]; // add this line
  staff: Staff[]; // add this line
  setServiceList: Dispatch<any>; // existing type
}

export interface ServiceTabModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedService: any;
  setSelectedService: Dispatch<any>;
  serviceList: Service[];
  staff: Staff[];
  setServiceList: Dispatch<any>;
}

export interface InvoiceSidebarServiceModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedService: any;
  setSelectedService: Dispatch<any>;
  serviceList: Service[];
  staff: Staff[];
  setServiceList: Dispatch<any>;
  selectedIndex: any;
  discountOptions: Discount[];
}
