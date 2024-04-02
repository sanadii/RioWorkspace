import { Dispatch } from "react";

export type ItemTabModalProps = {
  modal: boolean;
  toggle: () => void;
  selectedItem: any; // Adjust the type as necessary
  setSelectedItem: React.Dispatch<any>; // Adjust the type as necessary
  // itemTypeList: any[]; // Adjust the type as necessary
  staff: Staff[];
  setInvoiceItemList: React.Dispatch<any>; // Adjust the type as necessary
  // itemType: "service" | "product" | "package" | "voucher";
};

export interface InvoiceService {
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

export interface InvoiceProduct {
  id: number;
  product: number;
  name: string;
  category?: string;
  discount?: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  staff: string;
}

export interface InvoicePackage {
  id: number;
  package: number;
  name: string;
  categoryName?: string;
  discount?: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  staff: string;
}

export type InvoiceVoucher = {
  id: number;
  voucher: number;
  name: string;
  categoryName?: string;
  discount?: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  staff: string;};


export interface Appointment {
  id: number;
  client: string;
  staff: string;
  services: Service[]; // add this line
  packages: Package[];
  prouducts: Product[];
  vouchers: Voucher[];
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

export type Voucher = {
  id: number;
  voucher: number;
  name: string;
  categoryName?: string;
  staff: string;
  price: number;
  discount?: number;
};

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

export type InvoiceProps = {
  id: number;
  date: Date;
  client: number;
  appointment?: number;
  staff?: string;
  amount: number;
  items: InvoiceItemListProps;
  status: string;
  note: string;
};

export type InvoiceItemListProps = {
  appointmentList?: Appointment[];
  packageList?: Package[];
  productList?: Product[];
  voucherList?: Voucher[];
};

export interface ItemTabProps {
  items: "services" | "packages" | "products" | "vouchers";
  itemType: "service" | "package" | "product" | "voucher";
  staff: Staff[];
  invoiceItemList: any;
  setItemList: Dispatch<any>;
}

export type InvoiceSummaryColumnProps = {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  staff: Staff[];
  discountOptions: Discount[];
  invoiceItemList: InvoiceItemListProps;
  activeInvoice: any;
  setInvoiceItemList: (updatedList: any) => void; // Add this line
  setIsTransaction: Dispatch<any>;
  isTransaction: boolean;
  setOverAllTotal: Dispatch<any>;
};

export interface SummaryItemModalProps {
  // items: "services" | "packages" | "products" | "vouchers";
  itemType: "service" | "package" | "product" | "voucher";
  modal: boolean;
  selectedItem: Service | Product | Package | Voucher | null;
  invoiceItemList: any;
  staff: Staff[];
  selectedIndex: number | null;
  discountOptions: Discount[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setInvoiceItemList: React.Dispatch<React.SetStateAction<(Service | Product | Package | Voucher)[]>>;
}

export interface DiscountModalProps {
  discountOptions: Discount[];
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  discountValue: Discount;
  setDiscountValue: React.Dispatch<any>;
}
