import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getSchedule, getInvoiceById } from "store/actions";
import { TabContent, TabPane } from "reactstrap";
import { settingsSelector, appointmentsSelector, invoiceSelector } from "Selectors";

// Components
import InvoiceNav from "./InvoiceNav";
import ItemTab from "./InvoiceTabs/ItemTab";
import CreditTab from "./InvoiceTabs/CreditTab";
import AppointmentTab from "./InvoiceTabs/AppointmentTab";
import Summary from "./Summary";
import InvoiceTransaction from "./InvoiceTransaction";

import { InvoiceProps, InvoiceItemList } from "types";

const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { appointment, services, products, packages, vouchers, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingsSelector);
  const { invoice } = useSelector(invoiceSelector);
  console.log("invoice? ", invoice);

  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId" || null);
  const invoiceId = queryParams.get("invoiceId" || null);

  const [isPayment, setIspayment] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [overAllTotal, setOverAllTotal] = useState(0);
  const [activeInvoice, setActiveInvoice] = useState<InvoiceProps>();
  const [invoiceItemList, setInvoiceItemList] = useState<InvoiceItemList>();

  console.log("activeInvoice::: ", activeInvoice);
  useEffect(() => {
    if (appointment) {
      setActiveInvoice({
        id: invoice?.id || null,
        date: appointment?.date, // Assuming 'date' comes from 'appointment'
        client: appointment?.client?.id || null,
        appointment: appointment?.id || null,
        // staff: (add staff here if available in 'appointment'),
        amount: invoice?.amount || 0, // Default to 0 if 'amount' is not available in 'invoice'
        items: {
          // serviceList: appointment?.services || [],
          // serviceList: [],
          appointmentList: invoice?.appointments || [appointment],
          packageList: invoice?.packages || [],
          productList: invoice?.products || [],
          voucherList: invoice?.vouchers || [],
        },
        status: invoice?.status || "",
        note: invoice?.note || "",
      });
    }
  }, [appointment]);

  useEffect(() => {
    if (activeInvoice) {
      setInvoiceItemList(
        activeInvoice.items || {
          appointmentList: [],
          packageList: [],
          productList: [],
          voucherList: [],
        }
      );
    }
  }, [activeInvoice]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    if (invoiceId) {
      dispatch(getInvoiceById(invoiceId));
    }
    dispatch(getSchedule());
  }, [dispatch, appointmentId, invoiceId]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tabConfig = [
    { tabId: "1", itemType: "service", items: services, itemList: invoiceItemList?.appointmentList },
    { tabId: "2", itemType: "product", items: products, itemList: invoiceItemList?.productList },
    { tabId: "3", itemType: "package", items: packages, itemList: invoiceItemList?.packageList },
    { tabId: "4", itemType: "voucher", items: vouchers, itemList: invoiceItemList?.voucherList },
  ];

  return (
    <React.Fragment>
      {(appointmentId || invoiceId) && services && invoiceItemList && (
        <div className="sale__body">
          {/* Invoice Adding Column */}
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

          {/* Invoice Summary */}
          <div className="sale__summary-col">
            <Summary
              activeInvoice={activeInvoice}
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

          {/* Invoice Transaction */}
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
