import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getSchedule } from "store/actions";
import { TabContent, TabPane } from "reactstrap";
import { settingsSelector, appointmentsSelector, invoiceSelector } from "Selectors";

// Components
import InvoiceNav from "./InvoiceNav";
import ItemTab from "./ItemTab";
import CreditTab from "./CreditTab";
import AppointmentTab from "./AppointmentTab";
import Summary from "./Summary";
import InvoiceTransaction from "./InvoiceTransaction";

import { InvoiceItemList } from "types";
const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { appointment, services, products, packages, vouchers, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingsSelector);
  const { invoice } = useSelector(invoiceSelector);
  console.log("invoice? ", invoice)

  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");
  const [isPayment, setIspayment] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [overAllTotal, setOverAllTotal] = useState(0);
  const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemList>();

  useEffect(() => {
    if (appointment) {
      setInvoiceItemList({
        serviceList: appointment.services || [],
        packageList: appointment.packages || [],
        productList: appointment.products || [],
        voucherList: appointment.vouchers || [],
      });
    }
  }, [appointment]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    dispatch(getSchedule());
  }, [dispatch, appointmentId]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabConfig = [
    { tabId: "1", itemType: "service", items: services, itemList: invoiceItemList?.serviceList },
    { tabId: "2", itemType: "product", items: products, itemList: invoiceItemList?.productList },
    { tabId: "3", itemType: "package", items: packages, itemList: invoiceItemList?.packageList },
    { tabId: "4", itemType: "voucher", items: vouchers, itemList: invoiceItemList?.voucherList },
  ];

  return (
    <React.Fragment>
      {appointmentId && services && invoiceItemList && (
        <div className="sale__body">
          {!isPayment ? (
            <div className="sale__adding-col">
              <InvoiceNav activeTab={activeTab} onTabClick={toggleTab} />
              <TabContent activeTab={activeTab}>
                {/* Tabs for Services, Packages, Products, and Vouchers */}
                {tabConfig.map(({ tabId, itemType, items, itemList }) => (
                  <TabPane tabId={tabId} key={tabId}>
                    <div className={`sale__items-${itemType === "service" ? "list" : "grid"}`}>
                      <ItemTab
                        items={items}
                        staff={staff}
                        itemTypeList={itemList}
                        setInvoiceItemList={setInvoiceItemList}
                        itemType={itemType}
                      />
                    </div>
                  </TabPane>
                ))}
                <TabPane tabId="5">
                  <CreditTab />
                </TabPane>
                <TabPane tabId="6">
                  <AppointmentTab />
                </TabPane>
              </TabContent>
            </div>
          ) : (
            ""
          )}
          <div className="sale__summary-col">
            <Summary
              appointment={appointment}
              staff={staff}
              client={appointment?.client}
              startTime={appointment?.startTime}
              invoiceItemList={invoiceItemList}
              setInvoiceItemList={setInvoiceItemList}
              discountOptions={discountOptions}
              setIspayment={setIspayment}
              isPayment={isPayment}
              setOverAllTotal={setOverAllTotal}
            />
          </div>
          {isPayment ? (
            <div className="sale__payment-col">
              <InvoiceTransaction
                invoice={invoice}
                invoiceItemList={invoiceItemList}
                overAllTotal={overAllTotal}
                appointmentId={appointmentId}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Invoice;
