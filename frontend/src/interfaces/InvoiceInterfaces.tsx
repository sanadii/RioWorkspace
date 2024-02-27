import { Dispatch } from "react";

export interface Appointment {
  id: number;
  client: string;
  staff: string;
  services: Service[]; // add this line
  packages: Package[];
  prouducts: Product[];
  startTime: Date;
  endTime: Date;
}

export interface Service {
  id: number;
  service: number;
  name: string;
  duration: number;
  categoryName?: string;
  staff: string;
  price: number;
  startTime: Date;
  endTime: Date;
  discount?: number;
}

export interface Product {
  id: number;
  product: number;
  name: string;
  category?: string;
  staff: string;
  price: number;
  discount?: number;
}

export interface Package {
  id: number;
  package: number;
  name: string;
  categoryName?: string;
  staff: string;
  price: number;
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
}

export interface Item {
  id: number;
  name: string;
  staff: string;
  price: number;
  categoryName?: string;
  duration?: number;
  startTime?: Date;
  endTime?: Date;
  discount?: number;
}

export interface ItemTabProps {
  items: "services" | "packages" | "products";
  itemType: "service" | "package" | "product";
  products: Product[];
  staff: Staff[];
  itemList: any;
  setItemList: Dispatch<any>;
}

export interface SummaryProps {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  staff: Staff[];
  discountOptions: Discount[];
  serviceList: Service[];
  packageList: Package[];
  productList: Product[];
  appointment: any;
  setServiceList: Dispatch<any>;
  setPackageList: Dispatch<any>;
  setProductList: Dispatch<any>;
  setIspayment: Dispatch<any>;
  isPayment: boolean;
}

export interface SummaryItemModalProps {
  items: "services" | "packages" | "products";
  itemType: "service" | "package" | "product";
  products: Product[];
  modal: boolean;
  selectedItem: Service | Product | Package | null;
  itemList: any;
  staff: Staff[];
  selectedIndex: number | null;
  discountOptions: Discount[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setItemList: React.Dispatch<React.SetStateAction<(Service | Product | Package)[]>>;
}

export interface DiscountModalProps {
  discountOptions: Discount[];
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  discountValue: Discount
  setDiscountValue: React.Dispatch<any>;
}

