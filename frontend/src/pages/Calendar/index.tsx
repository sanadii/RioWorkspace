import React from "react";
import "./App.css";
import { CardBody, Row, Col, Card, Container, CardHeader } from "reactstrap";
import { BreadCrumb } from "Components/Common";

import {
  ScheduleComponent,
  Inject,
  Agenda,
  Day,
  Month,
  Week,
  WorkWeek,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
class Calendar extends React.Component {
  private localData: EventSettingsModel = {
    dataSource: [
      {
        EndTime: new Date(2019, 0, 11, 6, 30),
        StartTime: new Date(2019, 0, 11, 4, 0),
      },
    ],
  };
  private remoteData = new DataManager({
    url: "https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Daily Revenue" pageTitle="Daily Revenue" />
            <Row>
              <Col lg={12}>
                <Card id="dailyRevenue">
                  <CardHeader className="border-0">
                    <div className="d-flex align-items-center">
                      <h5 className="card-title mb-0 flex-grow-1">Calendar</h5>
                      <div className="flex-shrink-0"></div>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <ScheduleComponent
                      currentView="Month"
                      eventSettings={{ dataSource: this.remoteData }}
                      selectedDate={new Date(2017, 5, 5)}
                    >
                      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Calendar;
