import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";

const EventPopoverStatus = ({ event, toggle }) => {
  const handleEditAction = (e) => {
    console.log("Handling Edit Action");
  };

  return (
    <React.Fragment>
      <div className="btn-group calendar-balloon__status-buttons" data-toggle="buttons-relaxed-radio">
        <ButtonGroup size="sm" className="w-100 material-shadow">
          <Button className="btn-soft-dark material-shadow-none">Arrived</Button>
          <Button className="btn-soft-dark material-shadow-none">Completed</Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverStatus;
