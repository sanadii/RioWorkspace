import React, { useState, useEffect, useCallback } from "react";
import { Appointment, Service, Package, Product, Voucher, Discount, SummaryProps } from "types"; // Adjust the path as necessary

// Components
import SummaryCustomer from "./SummaryCustomer";
import SummaryItemList from "./SummaryItemList";
import SummaryActions from "./SummaryActions";

import SummaryItemModal from "./SummaryItemModal";
import DiscountModal from "./DiscountModal";

const Summary: React.FC<SummaryProps> = ({
  activeInvoice,
  appointment,
  staff,
  invoiceItemList,
  setInvoiceItemList,
  discountOptions,
  setIspayment,
  isPayment,
  setOverAllTotal,
}) => {
  console.log("invoiceItemList:???  ", invoiceItemList);
  const [updatedAppointment, setUpdatedAppointment] = useState<Appointment | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState(activeInvoice.note || "");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedIteme] = useState<Service | Package | Product | Voucher | null>(null);
  const [discountValue, setDiscountValue] = useState<Discount | null>(null);

  const handleItemSelectionClick = (item: Service | Package | Product | Voucher, index: number) => {
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
    if (!Array.isArray(items)) {
      return 0; // Return 0 if items is not an array
    }
    return items.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  };

  // Calculate total prices for services, packages, and products
  const totalServicePrice = calculateTotalPrice(invoiceItemList.serviceList);
  const totalPackagePrice = calculateTotalPrice(invoiceItemList.packageList);
  const totalProductPrice = calculateTotalPrice(invoiceItemList.productList);
  const totalVoucherPrice = calculateTotalPrice(invoiceItemList.voucherList);

  // Calculate overall total
  const overallTotal = totalServicePrice + totalPackagePrice + totalProductPrice;

  useEffect(() => {
    setOverAllTotal(overallTotal);
  }, [setOverAllTotal, overallTotal]);

  useEffect(() => {
    // Check if the activeInvoice is defined before trying to update it
    if (activeInvoice) {
      const newUpdatedAppointment = {
        ...activeInvoice,
        appointment: activeInvoice.appointment,
        client: activeInvoice.client,
        items: {
          services: invoiceItemList.serviceList,
          packages: invoiceItemList.packageList,
          products: invoiceItemList.productList,
        },
        discount: discountValue,
        note: appointmentNote,
        amount: overallTotal,
        status: "pending",
      };
      setUpdatedAppointment(newUpdatedAppointment);
    }
  }, [activeInvoice, invoiceItemList, appointmentNote, discountValue]);

  return (
    <React.Fragment>
      <div className="sale__summary">
        <SummaryCustomer activeInvoice={activeInvoice} />

        <SummaryItemList
          activeInvoice={activeInvoice}
          invoiceItemList={invoiceItemList}
          onItemClick={handleItemSelectionClick}
        />

        <div className="sale__summary-actions">
          <SummaryActions
            activeInvoice={activeInvoice}
            isAddingNote={isAddingNote}
            setIsAddingNote={setIsAddingNote}
            setIspayment={setIspayment}
            appointmentNote={appointmentNote}
            setAppointmentNote={appointmentNote}
            updatedAppointment={updatedAppointment}
            isPayment={isPayment}
            overallTotal={overallTotal}
          />
        </div>
      </div>

      <SummaryItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedItem}
        invoiceItemList={invoiceItemList.serviceList}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
        selectedIndex={selectedIndex}
        discountOptions={discountOptions}
        itemType="service"
      />

      <SummaryItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedItem}
        invoiceItemList={invoiceItemList.packageList}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
        selectedIndex={selectedIndex}
        discountOptions={discountOptions}
        itemType="package"
      />

      <SummaryItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedItem}
        invoiceItemList={invoiceItemList.productList}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
        selectedIndex={selectedIndex}
        discountOptions={discountOptions}
        itemType="product"
      />

      <SummaryItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedItem}
        invoiceItemList={invoiceItemList.voucherList}
        staff={staff}
        setInvoiceItemList={setInvoiceItemList}
        selectedIndex={selectedIndex}
        discountOptions={discountOptions}
        itemType="voucher"
      />
      <DiscountModal
        discountOptions={discountOptions}
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
      />
    </React.Fragment>
  );
};

export default Summary;
