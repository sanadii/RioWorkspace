import { Dispatch } from "react";

export interface SummaryProps {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  services: Service[];
  packages: Package[];
  products: Product[];
  staff: Staff[];
  serviceList: any;
  packageList: any;
  productList: any;
  appointment: any;
  setServiceList: Dispatch<any>;
  setPackageList: Dispatch<any>;
  setProductList: Dispatch<any>;
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

export interface Product {
  id: number;
  name: string;
  category?: string;
  staff: string;
  price: number;
}

export interface Package {
  id: number;
  name: string;
  categoryName?: string;
  staff: string;
  price: number;
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

export interface ProductTabProps {
  productList: any; // existing type
  products: Product[]; // add this line
  staff: Staff[]; // add this line
  setProductList: Dispatch<any>; // existing type
}

export interface PackageTabProps {
  packageList: any; // existing type
  packages: Product[]; // add this line
  staff: Staff[]; // add this line
  setPackageList: Dispatch<any>; // existing type
}
export interface ProductTabModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedProduct: any;
  setSelectedProduct: Dispatch<any>;
  productList: Product[];
  staff: Staff[];
  setProductList: Dispatch<any>;
}

export interface PackageTabModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedPackage: any;
  setSelectedPackage: Dispatch<any>;
  packageList: Package[];
  staff: Staff[];
  setPackageList: Dispatch<any>;
}

export interface SummaryServiceModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedService: any;
  // setSelectedService: Dispatch<any>;
  serviceList: Service[];
  staff: Staff[];
  setServiceList: Dispatch<any>;
  selectedIndex: any;
  discountOptions: Discount[];
}

export interface SummaryPackageModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedPackage: any;
  // setSelectedPackage: Dispatch<any>;
  packageList: Package[];
  staff: Staff[];
  setPackageList: Dispatch<any>;
  selectedIndex: any;
  discountOptions: Discount[];
}

export interface SummaryProductModalProps {
  modal: boolean;
  setModal: Dispatch<any>;
  toggle: () => void;
  selectedProduct: any;
  // setSelectedProduct: Dispatch<any>;
  productList: Product[];
  staff: Staff[];
  setProductList: Dispatch<any>;
  selectedIndex: any;
  discountOptions: Discount[];
}
