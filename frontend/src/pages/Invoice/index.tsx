import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getSchedule } from "store/actions";
import { TabContent, TabPane } from "reactstrap";
import { settingOptionsSelector, appointmentsSelector } from "Selectors";
import InvoiceNav from "./InvoiceNav";
import Summary from "./Summary";
import Payment from "./Payment";
import ItemTab from "./ItemTab";
import CreditTab from "./CreditTab";
import AppointmentTab from "./AppointmentTab";

import { InvoiceItemList } from "interfaces";
const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");
  const { appointment, services, products, packages, vouchers, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingOptionsSelector);
  const [isPayment, setIspayment] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemList>({
    serviceList: [],
    packageList: [],
    productList: [],
    voucherList: [],
  });

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

  console.log("this is the initial settings of setInvoiceItemList: ", invoiceItemList);
  console.log("this is the initial settings of invoiceItemList.productList: ", invoiceItemList.productList);


  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    dispatch(getSchedule());
  }, [dispatch, appointmentId]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      {appointmentId && services && invoiceItemList && (
        <div className="sale__body">
          {!isPayment ? (
            <div className="sale__adding-col">
              <InvoiceNav activeTab={activeTab} onTabClick={toggleTab} />
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div className="sale__items-list">
                    <ItemTab
                      items={services}
                      staff={staff}
                      invoiceItemList={invoiceItemList.serviceList}
                      setInvoiceItemList={setInvoiceItemList}
                      itemType="service"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="sale__items-grid">
                    <ItemTab
                      items={products}
                      staff={staff}
                      invoiceItemList={invoiceItemList.productList}
                      setInvoiceItemList={setInvoiceItemList}
                      itemType="product"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="sale__items-grid">
                    <ItemTab
                      items={packages}
                      staff={staff}
                      invoiceItemList={invoiceItemList.packageList}
                      setInvoiceItemList={setInvoiceItemList}
                      itemType="package"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="sale__items-grid">
                    <ItemTab
                      items={vouchers}
                      staff={staff}
                      invoiceItemList={invoiceItemList.voucherList}
                      setInvoiceItemList={setInvoiceItemList}
                      itemType="voucher"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <CreditTab />
                </TabPane>
                <TabPane tabId="6">
                  <AppointmentTab />
                </TabPane>
              </TabContent>
            </div>
          ) : (
            <div className="sale__payment-col">
              <Payment />
            </div>
          )}
          <div className="sale__summary-col">
            <Summary
              appointment={appointment}
              staff={staff}
              client={appointment?.client}
              startTime={appointment?.startTime}
              invoiceItemList={invoiceItemList}
              setInvoiceItemList={(updatedList) => {
                // Check if invoiceItemList is defined before updating
                if (invoiceItemList) {
                  setInvoiceItemList({ ...invoiceItemList, serviceList: updatedList });
                }
              }}
              discountOptions={discountOptions}
              setIspayment={setIspayment}
              isPayment={isPayment}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Invoice;
