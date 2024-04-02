import { Dispatch } from "react";

export type Appointment = {
  id: number;
  client: string;
  staff: string;
  services: Service[]; // add this line
  packages: Package[];
  prouducts: Product[];
  vouchers: Voucher[];
  startTime: Date;
  endTime: Date;
};

export type InvoiceItem = {
  id: number;
  name: string;
  staff: string;
  price: number;
  categoryName?: string;
  duration?: number;
  startTime?: Date;
  endTime?: Date;
  discount?: number;
};



export type Service = {
  type: "Service";

  // Basic Service Information
  itemId: number;
  name: string;
  description: string;

  // Client / Staff Information
  clientId: string;
  staffId: number;

  // Appointment (Booking) Details
  bookingId: number;
  replacesBookingId: null | number;
  updateBookingOnCalendar: boolean;
  invoiceItemId: null | number;
  startDate: string; // Start date of the service
  appointmentStartDate: string; // Start date of the appointment

  // Service Status and Management
  // markAsComplete: boolean; // Indicates if the service can be marked as complete
  // isComplete: boolean; // Indicates if the service is completed
  // color: string | null; // Color associated with the service (for UI)

  // Service Grouping (if part of a group of services)
  // serviceGroupGroupingId?: null | number;
  // serviceGroupName?: null | string;
  // serviceGroupItemId?: null | number;
  // serviceGroupId?: null | number;
  // bookingGroupId: number; // Group ID for the booking

  // Package Redemption Information
  packageRedemption: null | boolean; // Indicates if the service is part of a package redemption
  packagesAvailable: boolean; // Indicates if packages are available for this service
  applyPackage: boolean; // Indicates if a package should be applied

  // Promotional Messages
  // promoMessages: any[]; // Array of promotional messages

  // Pricing and Discounts
  calculatedDepositPortion: number; // Calculated deposit portion for the service
  priceOverride: boolean; // Indicates if the price is overridden
  canDiscount: boolean; // Indicates if discounts can be applied
  excludeDiscount: boolean; // Indicates if the service is excluded from discounts
  discounts: any[]; // Array of applied discounts
  discountedTotal: number; // Total amount after discounts
  unitPrice: number; // Unit price of the service
  unitPriceInc: number; // Unit price including tax
  totalInc: number; // Total price including tax
  quantity: number; // Quantity of the service
  fullUnitPrice: number; // Full unit price before discounts
  fullUnitPriceInc: number; // Full unit price including tax before discounts
  editableFields: string[]; // Fields that can be edited

  // Inclusion and Validation
  isIncluded: boolean; // Indicates if the service is included in the invoice
  isValid: boolean; // Indicates if the service is valid
  toDelete: boolean; // Indicates if the service is marked for deletion

  // Error Handling
  errors: any[]; // Array of errors related to the service
};


export type Product = {
  stockId: number;
  stockQuantity: null | number;
  allowNegativeStockQuantity: boolean;
  isUnlimited: boolean;
  imageUrl: string;
  quantity: number;
  excludeDiscount: boolean;
  canDiscount: boolean;
  discounts: any[];
  discountedTotal: number;
  clientId: string;
  invoiceItemId: null | number;
  type: "Product";
  staffId: number;
  unitPrice: number;
  unitPriceInc: number;
  totalInc: number;
  fullUnitPrice: number;
  fullUnitPriceInc: number;
  name: string;
  description: string | null;
  editableFields: string[];
  isIncluded: boolean;
  errors: any[];
  isValid: boolean;
  toDelete: boolean;
  index: number;
};

export type Package = {
  type: "Package";
  id: number;
  name: string;
  handle: string;
  startDate: string | null;
  endDate: string | null;
  durationUnitName: string;
  durationValue: number;
  items: any[];
  startTypeId: null | number;
  expiryTypeId: null | number;
  customerExpirationEmailEnabled: boolean;
  expiryUnitName: string;
  expiryDurationValue: string;
  unitPrice: number;
  unitPriceInc: number;
  totalInc: number;
  quantity: number;
  fullUnitPrice: number;
  fullUnitPriceInc: number;
  isNewPackage: boolean;
  start: string;
  end: string | null;
  staffId: number;
  pending: boolean;
  index: number;
};

export type Voucher = {
  customerGiftVoucherId: null | number;
  id: number;
  code: string;
  senderCustomerId: number;
  senderName: string;
  senderEmail: string;
  emailVoucherToSender: boolean;
  recipientCustomerId: null | number;
  recipientName: string;
  recipientEmail: string;
  emailVoucherToRecipient: boolean;
  message: string;
  expiry: string | null;
  excludeDiscount: boolean;
  canDiscount: boolean;
  discounts: any[];
  discountedTotal: number;
  clientId: string;
  invoiceItemId: null | number;
  type: "GiftVoucher";
  staffId: number;
  unitPrice: number;
  unitPriceInc: number;
  totalInc: number;
  quantity: number;
  fullUnitPrice: number;
  fullUnitPriceInc: number;
  name: string;
  description: string;
  editableFields: string[];
  isIncluded: boolean;
  errors: any[];
  isValid: boolean;
  toDelete: boolean;
  index: number;
};

// export type InvoiceItem = {
//   // Booking and Service Details
//   serviceGroupGroupingId: null;
//   serviceGroupName: null;
//   serviceGroupItemId: null;
//   serviceGroupId: null;
//   serviceId: number;
//   bookingId: number;
//   bookingGroupId: number;
//   packageRedemption: null;
//   packagesAvailable: boolean;
//   applyPackage: boolean;
//   markAsComplete: boolean;
//   isComplete: boolean;
//   color: string;
//   updateBookingOnCalendar: boolean;
//   replacesBookingId: null;
//   promoMessages: any[];

//   // Pricing and Discounts
//   canDiscount: boolean;
//   priceOverride: boolean;
//   excludeDiscount: boolean;
//   discounts: any[];
//   discountedTotal: number;
//   unitPrice: number;
//   unitPriceInc: number;
//   totalInc: number;
//   fullUnitPrice: number;
//   fullUnitPriceInc: number;

//   // Client and Invoice Details
//   clientId: string;
//   invoiceItemId: null;
//   type: string;
//   staffId: number;
//   quantity: number;

//   // Descriptive Information
//   name: string;
//   description: string;
//   startDate: string;
//   appointmentStartDate: string;

//   // Editable Fields and Validation
//   editableFields: string[];
//   isIncluded: boolean;
//   errors: any[];
//   isValid: boolean;
//   toDelete: boolean;
//   index: number;
// };

// export type Service = {
//   id: number;
//   service: number;
//   name: string;
//   duration: number;
//   categoryName?: string;
//   staff: string;
//   price: number;
//   startTime: Date;
//   endTime: Date;
//   discount?: number;
// };

// export type Product = {
//   id: number;
//   product: number;
//   name: string;
//   category?: string;
//   staff: string;
//   price: number;
//   discount?: number;
// };

// export type Package = {
//   id: number;
//   package: number;
//   name: string;
//   categoryName?: string;
//   staff: string;
//   price: number;
//   discount?: number;
// };

// export type Voucher = {
//   id: number;
//   voucher: number;
//   name: string;
//   categoryName?: string;
//   staff: string;
//   price: number;
//   discount?: number;
// };

export type Staff = {
  id: number;
  name: string;
  bookable: boolean;
  image: string;
};

export type Discount = {
  id: number;
  name: string;
  value: string;
};

export type Item = {
  id: number;
  name: string;
  staff: string;
  price: number;
  categoryName?: string;
  duration?: number;
  startTime?: Date;
  endTime?: Date;
  discount?: number;
};

export type ItemTabProps = {
  items: "services" | "packages" | "products" | "vouchers";
  itemType: "service" | "package" | "product" | "voucher";
  products: Product[];
  staff: Staff[];
  itemList: any;
  setItemList: Dispatch<any>;
};

export type SummaryProps = {
  client: any; // Define the type more specifically if possible
  startTime: any; // Define the type more specifically if possible
  staff: Staff[];
  discountOptions: Discount[];
  invoiceItemList: Service[];
  packageList: Package[];
  productList: Product[];
  voucherList: Voucher[];
  appointment: any;
  setInvoiceItemList: Dispatch<any>;
  setPackageList: Dispatch<any>;
  setProductList: Dispatch<any>;
  setVoucherList: Dispatch<any>;
  setIsTransaction: Dispatch<any>;
  isTransaction: boolean;
};

export type SummaryItemModalProps = {
  items: "services" | "packages" | "products" | "vouchers";
  itemType: "service" | "package" | "product" | "voucher";
  products: Product[];
  modal: boolean;
  selectedItem: Service | Product | Package | Voucher | null;
  itemList: any;
  staff: Staff[];
  selectedIndex: number | null;
  discountOptions: Discount[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setItemList: React.Dispatch<React.SetStateAction<(Service | Product | Package | Voucher)[]>>;
};

export type DiscountModalProps = {
  discountOptions: Discount[];
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  discountValue: Discount;
  setDiscountValue: React.Dispatch<any>;
};
