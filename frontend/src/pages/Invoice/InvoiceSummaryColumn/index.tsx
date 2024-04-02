import React, { useState, useEffect, useCallback } from "react";
import { Appointment, Service, Package, Product, Voucher, Discount, InvoiceSummaryColumnProps } from "types"; // Adjust the path as necessary

// Components
import SummaryCustomer from "./SummaryCustomer";
import SummaryItemList from "./SummaryItemList";
import SummaryActions from "./SummaryActions";
import SummaryItemModal from "./SummaryItemModal";
import DiscountModal from "./DiscountModal";

const InvoiceSummaryColumn: React.FC<InvoiceSummaryColumnProps> = ({
  activeInvoice,
  invoiceItemList,
  staff,
  discountOptions,

  setInvoiceItemList,
  setIsTransaction,
  isTransaction,
  setOverAllTotal,
}) => {
  console.log("activeInvoice: ", activeInvoice);
  const currentInvoiceNote = activeInvoice?.items;

  const [updatedInvoice, setUpdatedInvoice] = useState<Appointment | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [invoiceNote, setInvoiceNote] = useState(currentInvoiceNote || "");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedIteme] = useState<Service | Package | Product | Voucher | null>(null);
  const [discountValue, setDiscountValue] = useState<Discount | null>(null);

  const [editingItemType, setEditingItemType] = useState(null);

  const handleItemSelectionClick = (itemType, item: Service | Package | Product | Voucher, index: number) => {
    setEditingItemType(itemType);
    setSelectedIteme(item);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const [modal, setModal] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setLead("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const calculateTotalPrice = (items) => {
    // Check if 'items' is an array and has elements
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }

    // Calculate total price
    return items.reduce((total, item) => {
      const unitPrice = parseFloat(item.unitPrice) || 0; // Ensure unitPrice is a number, default to 0 if not
      const quantity = parseInt(item.quantity, 10) || 1; // Assume a default quantity of 1 if not specified or invalid
      return total + unitPrice * quantity;
    }, 0);
  };

  // Calculate total prices for services, packages, and products
  const calculateTotalServicePrice = (appointments) => {
    if (!Array.isArray(appointments) || appointments.length === 0) {
      return 0;
    }

    return appointments.reduce((total, appointment) => {
      if (Array.isArray(appointment.services) && appointment.services.length > 0) {
        const totalServicesPrice = appointment.services.reduce((serviceTotal, service) => {
          const unitPrice = parseFloat(service.unitPrice) || 0;
          const quantity = parseInt(service.quantity, 10) || 1;
          return serviceTotal + unitPrice * quantity;
        }, 0);
        return total + totalServicesPrice;
      }
      return total;
    }, 0);
  };
  const totalServicePrice = calculateTotalServicePrice(invoiceItemList.appointmentList);
  const totalPackagePrice = calculateTotalPrice(invoiceItemList.packageList);
  const totalProductPrice = calculateTotalPrice(invoiceItemList.productList);
  const totalVoucherPrice = calculateTotalPrice(invoiceItemList.voucherList);

  // Calculate overall total
  const overallTotal = totalServicePrice + totalPackagePrice + totalProductPrice;
  console.log("overallTotal: ", overallTotal);

  useEffect(() => {
    setOverAllTotal(overallTotal);
  }, [setOverAllTotal, overallTotal]);

  return (
    <React.Fragment>
      <div className="sale__summary-col">
        <div className="sale__summary">
          <SummaryCustomer activeInvoice={activeInvoice} />

          <SummaryItemList
            activeInvoice={activeInvoice}
            invoiceItemList={invoiceItemList}
            handleItemSelectionClick={handleItemSelectionClick}
          />

          <SummaryActions
            activeInvoice={activeInvoice}
            updatedInvoice={updatedInvoice}
            overallTotal={overallTotal}
            invoiceNote={invoiceNote}
            setInvoiceNote={setInvoiceNote}
            isAddingNote={isAddingNote}
            setIsAddingNote={setIsAddingNote}
            isTransaction={isTransaction}
            setIsTransaction={setIsTransaction}
          />
        </div>

        <SummaryItemModal
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          selectedItem={selectedItem}
          invoiceItemList={invoiceItemList[`${editingItemType}List`]} // Dynamically access the correct list
          staff={staff}
          setInvoiceItemList={setInvoiceItemList}
          selectedIndex={selectedIndex}
          discountOptions={discountOptions}
          itemType={editingItemType}
        />
        <DiscountModal
          discountOptions={discountOptions}
          modal={modal}
          setModal={setModal}
          toggle={toggle}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
        />
      </div>
    </React.Fragment>
  );
};

export default InvoiceSummaryColumn;
