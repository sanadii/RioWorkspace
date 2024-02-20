import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { getAppointment, getClient } from "store/actions";


import { Container, Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { ServicesTab, ServicesSide } from "./ServicesTab";
import ProductsTab from "./ProductsTab";
import AppointmentsTab from "./AppointmentsTab";
import VouchersTab from "./VouchersTab";
import CreditTab from "./CreditTab";
import PackagesTab from "./PackagesTab";

import { appointmentsSelector, servicesSelector } from "Selectors";

const Invoice = () => {
  const dispatch = useDispatch();

  const { appointments } = useSelector(appointmentsSelector);
  const { services } = useSelector(servicesSelector);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointmentId = queryParams.get("appointmentId");
  console.log("appointmentId: ", appointmentId)
  const clientId = queryParams.get("clientId");

  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointment(appointmentId));
    }
  }, [appointmentId]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <Row>
            <Col lg={8}>
              <InvoiceNav activeTab={activeTab} onTabClick={toggle} />
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <ServicesTab />
                </TabPane>
                <TabPane tabId="2">
                  <ProductsTab />
                </TabPane>
                <TabPane tabId="3">
                  <AppointmentsTab />
                </TabPane>
                <TabPane tabId="4">
                  <VouchersTab />
                </TabPane>
                <TabPane tabId="5">
                  <CreditTab />
                </TabPane>
                <TabPane tabId="6">
                  <PackagesTab />
                </TabPane>
              </TabContent>
            </Col>
            <Col lg={4}>
              <h2>Client Name</h2>
              <h6>Client Phone</h6>
              <h5>Appointment - 24 Feb, 10:00am</h5>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <ServicesSide />
                </TabPane>
                <TabPane tabId="2">
                  <ProductsTab />
                </TabPane>
                <TabPane tabId="3">
                  <AppointmentsTab />
                </TabPane>
                <TabPane tabId="4">
                  <VouchersTab />
                </TabPane>
                <TabPane tabId="5">
                  <CreditTab />
                </TabPane>
                <TabPane tabId="6">
                  <PackagesTab />
                </TabPane>
              </TabContent>{" "}
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
};

const InvoiceNav = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: "1", name: "Services", content: <ServicesTab /> },
    { id: "2", name: "Products", content: <ProductsTab /> },
    { id: "3", name: "Appointments", content: <AppointmentsTab /> },
    { id: "4", name: "Vouchers", content: <VouchersTab /> },
    { id: "5", name: "Credit", content: <CreditTab /> },
    { id: "6", name: "Packages", content: <PackagesTab /> },
  ];

  return (
    <div className="sale__search-head bg-secondary-light">
      <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
        {tabs.map((tab) => (
          <NavItem key={tab.id} className="fs-14">
            <NavLink
              href={`#${tab.name.toLowerCase()}-tab`}
              className={classnames({ active: activeTab === tab.id })}
              onClick={() => onTabClick(tab.id)}
            >
              <h3 className="text-primary">{tab.name}</h3>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
};

export default Invoice;
