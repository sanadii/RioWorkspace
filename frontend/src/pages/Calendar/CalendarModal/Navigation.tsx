import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import { AppointmentStatusOptions } from "Components/constants";

const NavigationComponent = () => {

  return (
    <React.Fragment>
      <ul className="nav nav-tabs">
        <li className="active">
          <a href="#details" data-toggle="tab">
            Details
          </a>
        </li>
        <li className="recurrence-tab  hide">
          <a href="#recurrence" data-toggle="tab">
            Recurrence
          </a>
        </li>
        <li className="">
          <a href="#address" data-toggle="tab">
            Address
          </a>
        </li>
        <li className="">
          <a href="#notes" data-toggle="tab">
            Notes
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export { NavigationComponent };
