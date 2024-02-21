import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import classnames from "classnames";
import { getAppointment, getClients, getSchedule } from "store/actions";
import { Container, Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { appointmentsSelector } from "Selectors";
import InvoiceNav from "./InvoiceNav";
import InvoiceSidebar from "./InvoiceSidebar";
import { ServiceTab, ProductTab, AppointmentTab, VoucherTab, CreditTab, PackageTab } from "./Tabs";

const Invoice = () => {
  const dispatch = useDispatch();
  const { appointment, services, staff } = useSelector(appointmentsSelector);
  console.log("services: ", services);
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

  useEffect(() => {
    const appointmentServices = appointment.services;
    setServiceList(appointmentServices);
  }, [appointment]);

  console.log("serviceList: ", serviceList);
  console.log("appointment.services: ", appointment.services);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          {appointmentId && services && (
            <Row className="p4">
              <Col lg={8}>
                <InvoiceNav activeTab={activeTab} onTabClick={toggleTab} />
                <TabContent activeTab={activeTab}>
                  <ServiceTab services={services} staff={staff} serviceList={serviceList} setServiceList={setServiceList} />
                  <ProductTab />
                  <AppointmentTab />
                  <VoucherTab />
                  <CreditTab />
                  <PackageTab />
                </TabContent>
              </Col>

              <Col lg={4}>
                <InvoiceSidebar
                  appointment={appointment}
                  client={appointment?.client}
                  startTime={appointment?.startTime}
                  serviceList={serviceList}
                />
              </Col>
            </Row>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Invoice;
