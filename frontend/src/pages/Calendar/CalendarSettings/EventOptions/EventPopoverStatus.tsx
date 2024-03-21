import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { formatTime } from "../CalendarHooks";
import { createPortal } from "react-dom";

const EventPopoverStatus = ({ event, toggle }) => {
  const handleEditAction = (e) => {
    console.log("Handling Edit Action");
  };

  return (
    <React.Fragment>
      <div className="btn-group calendar-balloon__status-buttons" data-toggle="buttons-relaxed-radio">
        <ButtonGroup className="w-100 material-shadow">
          <Button color="btn-soft-secondary material-shadow-none">Arrived</Button>
          <Button color="btn-soft-secondary material-shadow-none">Completed</Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverStatus;
