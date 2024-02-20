import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, TabContent, TabPane } from "reactstrap";

const ServicesTab = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <h2>ServicesTab</h2>
        <p>ServicesTab</p>
      </Container>
    </React.Fragment>
  );
};

const ServicesSide = () => {
  return <p>Service Side Tab</p>;
};

export { ServicesTab, ServicesSide };
