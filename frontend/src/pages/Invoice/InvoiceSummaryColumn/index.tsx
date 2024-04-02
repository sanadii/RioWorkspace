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
  appointment,
  staff,
  invoiceItemList,
  setInvoiceItemList,
  discountOptions,
  setIsTransaction,
  isTransaction,
  setOverAllTotal,
}) => {
  console.log("invoiceItemList:???  ", invoiceItemList);
  const [updatedInvoice, setUpdatedInvoice] = useState<Appointment | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [invoiceNote, setInvoiceNote] = useState(activeInvoice.note || "");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedIteme] = useState<Service | Package | Product | Voucher | null>(null);
  const [discountValue, setDiscountValue] = useState<Discount | null>(null);

  const handleItemSelectionClick = (item: Service | Package | Product | Voucher, index: number) => {
    console.log("ITEM: ", item);
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
          appointments: invoiceItemList.serviceList,
          packages: invoiceItemList.packageList,
          products: invoiceItemList.productList,
        },
        discount: discountValue,
        note: invoiceNote,
        amount: overallTotal,
        status: "pending",
      };
      setUpdatedInvoice(newUpdatedAppointment);
    }
  }, [activeInvoice, invoiceItemList, invoiceNote, discountValue]);

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

          <div className="sale__summary-actions">
            <SummaryActions
              activeInvoice={activeInvoice}
              isAddingNote={isAddingNote}
              setIsAddingNote={setIsAddingNote}
              setIsTransaction={setIsTransaction}
              invoiceNote={invoiceNote}
              setInvoiceNote={invoiceNote}
              updatedInvoice={updatedInvoice}
              isTransaction={isTransaction}
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
      </div>
    </React.Fragment>
  );
};

export default InvoiceSummaryColumn;
