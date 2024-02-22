import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAppointment, getClients, getSchedule, getSettingOptions } from "store/actions";
import { Container, Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { settingOptionsSelector, appointmentsSelector } from "Selectors";
import InvoiceNav from "./InvoiceNav";
import Summary from "./Summary";
import { ServiceTab, ProductTab, AppointmentTab, VoucherTab, CreditTab, PackageTab } from "./Tabs";

const Invoice = () => {
  const dispatch = useDispatch();
  const { appointment, services, products, packages, staff } = useSelector(appointmentsSelector);
  const { discountOptions } = useSelector(settingOptionsSelector);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");
  const clientId = appointment?.id || "";

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
    if (!services) {
      dispatch(getSchedule());
    }
  }, [dispatch, appointmentId, services]);

  useEffect(() => {
    if (!services) {
      dispatch(getSchedule());
    }
  }, [appointmentId]);

  const [activeTab, setActiveTab] = useState("1");
  const [serviceList, setServiceList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const appointmentServices = appointment.services;
    setServiceList(appointmentServices);
  }, [appointment]);

  // console.log("serviceList: ", serviceList);
  // console.log("appointment.services: ", appointment.services);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {appointmentId && services && (
            <div className="sale__body">
              <div className="sale__adding-col">
                <InvoiceNav activeTab={activeTab} onTabClick={toggleTab} />
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <ServiceTab
                      services={services}
                      staff={staff}
                      serviceList={serviceList}
                      setServiceList={setServiceList}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="sale__products-grid">
                      <ProductTab
                        products={products}
                        staff={staff}
                        productList={productList}
                        setProductList={setProductList}
                      />
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="sale__packages-grid">
                      <PackageTab
                        packages={packages}
                        staff={staff}
                        packageList={packageList}
                        setPackageList={setPackageList}
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
              <div className="sale__summary-col">
                <Summary
                  appointment={appointment}
                  staff={staff}
                  services={services}
                  packages={packages}
                  products={products}
                  client={appointment?.client}
                  startTime={appointment?.startTime}
                  serviceList={serviceList}
                  packageList={packageList}
                  productList={productList}

                  setServiceList={setServiceList}
                  setPackageList={setPackageList}
                  setProductList={setProductList}
                  discountOptions={discountOptions}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Invoice;
