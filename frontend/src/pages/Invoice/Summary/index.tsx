import React, { useState, useEffect, useCallback } from "react";
import { Appointment, Service, Package, Product, Voucher, Discount, SummaryProps } from "interfaces"; // Adjust the path as necessary
import SummaryItemModal from "./SummaryItemModal";
import { Button, Label } from "reactstrap";
import SummaryItemList from "../SummaryItemList";
import DiscountModal from "./DiscountModal";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "store/actions";

const Summary: React.FC<SummaryProps> = ({
  appointment,
  staff,
  invoiceItemList,
  setInvoiceItemList,
  discountOptions,
  setIspayment,
  isPayment,
}) => {
  const dispatch = useDispatch();

  const appointmentStartTime = appointment.startTime;
  const clientName = appointment.client?.name;
  const clientMobile = appointment.client?.mobile;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [discountValue, setDiscountValue] = useState<Discount | null>(null);
  const [appointmentNote, setAppointmentNote] = useState(appointment.note || "");
  const [updatedAppointment, setUpdatedAppointment] = useState<Appointment | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  console.log("updatedAppointment:", updatedAppointment);

  const handleServiceSelectionClick = (service: Service, index: number) => {
    setSelectedService(service);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const handlePackageSelectionClick = (servicePackage: Package, index: number) => {
    setSelectedPackage(servicePackage);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const handleProductSelectionClick = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index); // Set the index of the selected service
    setModal(true);
  };

  const handleVoucherSelectionClick = (voucher: Voucher, index: number) => {
    setSelectedVoucher(voucher);
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
    // Check if the appointment is defined before trying to update it
    if (appointment) {
      const newUpdatedAppointment = {
        ...appointment,
        services: invoiceItemList.serviceList,
        packages: invoiceItemList.packageList,
        products: invoiceItemList.productList,
        discount: discountValue,
        note: appointmentNote,
        // Add any other details you need to update
      };
      setUpdatedAppointment(newUpdatedAppointment);
    }
  }, [appointment, invoiceItemList, appointmentNote, discountValue]);

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };
  const handleCheckoutClick = () => {
    setIspayment(true);
    dispatch(updateAppointment(updatedAppointment));
  };

  const handleEditInvoiceClick = () => {
    setIspayment(false);
  };

  return (
    <React.Fragment>
      <div className="sale__summary">
        <div className="sale__summary-customer">
          <div className="sale__customer">
            <div>
              <div className="sale__customer-picker ">
                <div className="sale__customer-picker-heading sale__heading--domaine">
                  <div className="sale__customer-picker-heading-text">Select client</div>
                </div>
                <div className="sale__customer-picker-selected">
                  <div className="sale__customer-picker-selected-details">
                    <div className="sale__customer-picker-selected-name">
                      <span className="sale__customer-picker-customer-name">{clientName} </span>
                    </div>
                    <div className="sale__customer-picker-selected-phone">+{clientMobile}</div>
                  </div>
                  <div className="sale__customer-picker-selected-remove" data-testid="sale__customer-remove-button">
                    ×
                  </div>
                </div>
              </div>
            </div>
            <div className="sale__customer-selected">
              <div className="sale__customer-balances"></div>
            </div>
          </div>
        </div>
        <div className="sale__summary-appointment">
          <h5>
            Appointment -<span className="sale__items-group-start-date sale__label">{appointmentStartTime}</span>
          </h5>
        </div>

        <div className="sale__summary-items">
          <SummaryItemList
            title="Services"
            invoiceItemList={invoiceItemList?.serviceList || []}
            onItemClick={handleServiceSelectionClick}
            iconPath="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
          />

          <SummaryItemList
            title="Packages"
            invoiceItemList={invoiceItemList.packageList || []}
            onItemClick={handlePackageSelectionClick}
            iconPath="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
          />

          <SummaryItemList
            title="Products"
            invoiceItemList={invoiceItemList.productList || []}
            onItemClick={handleProductSelectionClick}
            iconPath="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
          />

          <SummaryItemList
            title="voucher"
            invoiceItemList={invoiceItemList.voucherList || []}
            onItemClick={handleVoucherSelectionClick}
            iconPath="M11.75 9.75h8.5a2 2 0 012 2v8.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-8.5a2 2 0 012-2zm1 .75v11"
          />
        </div>
        <div className="sale__summary-actions">
          <div className="sale__summary-actions-more">
            <div className="sale__summary-options">
              <button
                className="sale__button-link sale__button-link--underlined"
                id="sale__add-note-button"
                onClick={handleAddNoteClick}
              >
                Add note
              </button>
              &nbsp;or&nbsp;
              <button className="sale__button-link sale__button-link--underlined" data-testid="sale__add-discount">
                discount
              </button>
            </div>
            {/* <div className="sale__summary-tax">Tax K.D.0</div> */}
          </div>
          <div className="sale__summary-totals"></div>

          {isAddingNote ? (
            <div className="sale__summary-note">
              <div className="sale__summary-note-label">
                <Label id="sale-note-field">Note</Label>
                <Button className="sale__button-link" onClick={() => setIsAddingNote(false)}>
                  ×
                </Button>
              </div>
              <textarea
                data-testid="sale__note-field"
                data-automationid="tui-textarea"
                className="form-control textarea-module_formControl__1hsMA"
                name="sale-note-field"
                placeholder="Add Notes"
                value={appointmentNote}
                onChange={(e) => setAppointmentNote(e.target.value)} // Extract the value from the event object
              ></textarea>
            </div>
          ) : (
            ""
          )}
          {isPayment ? (
            <button
              // variant="primary"
              // size="lg"
              // loading="false"
              data-testid="sale__checkout-button"
              className="sale__summary-checkout-button tui-button tui-button--lg tui-button--primary primary hydrated"
              onClick={handleEditInvoiceClick}
            >
              Edit Invoice
            </button>
          ) : (
            <button
              // variant="primary"
              // size="lg"
              // loading="false"
              data-testid="sale__checkout-button"
              className="sale__summary-checkout-button tui-button tui-button--lg tui-button--primary primary hydrated"
              onClick={handleCheckoutClick}
            >
              Checkout K.D.{overallTotal}
            </button>
          )}
        </div>
      </div>

      <SummaryItemModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        selectedItem={selectedService}
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
        selectedItem={selectedPackage}
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
        selectedItem={selectedProduct}
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
        selectedItem={selectedVoucher}
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
