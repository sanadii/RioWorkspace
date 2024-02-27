import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getSchedule } from "store/actions";
import { TabContent, TabPane } from "reactstrap";
import { settingOptionsSelector, appointmentsSelector } from "Selectors";

// Components
import InvoiceNav from "./InvoiceNav";
import Summary from "./Summary";
import Payment from "./Payment";
import ItemTab from "./ItemTab";
import VoucherTab from "./VoucherTab";
import CreditTab from "./CreditTab";
import AppointmentTab from "./AppointmentTab";

const Invoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");

  const { appointment, services, products, packages, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingOptionsSelector);

  const [activeTab, setActiveTab] = useState("1");
  const [serviceList, setServiceList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isPayment, setIspayment] = useState(false);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    dispatch(getSchedule());
  }, [dispatch, appointmentId]);

  useEffect(() => {
    setServiceList(appointment.services || []);
    setPackageList(appointment.packages || []);
    setProductList(appointment.products || []);
  }, [appointment]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      {appointmentId && services && (
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
                      itemList={serviceList}
                      setItemList={setServiceList}
                      itemType="service"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="sale__items-grid">
                    <ItemTab
                      items={products}
                      staff={staff}
                      itemList={productList}
                      setItemList={setProductList}
                      itemType="product"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="sale__items-grid">
                    <ItemTab
                      items={packages}
                      staff={staff}
                      itemList={packageList}
                      setItemList={setPackageList}
                      itemType="package"
                    />
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <VoucherTab />
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
              serviceList={serviceList}
              packageList={packageList}
              productList={productList}
              setServiceList={setServiceList}
              setPackageList={setPackageList}
              setProductList={setProductList}
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
