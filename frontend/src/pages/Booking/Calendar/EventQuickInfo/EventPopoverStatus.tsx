import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";

const EventPopoverStatus = ({ event, toggle }) => {
  console.log("EVENTY: ", event);
  const handleArrivedClick = (e) => {
    console.log("handleArrivedClick");
  };
  const handleCompletedClick = (e) => {
    console.log("handleCompletedClick");
  };

  return (
    <React.Fragment>
      <div className="btn-group calendar-balloon__status-buttons" data-toggle="buttons-relaxed-radio">
        <ButtonGroup size="sm" className="w-100 material-shadow">
          <Button className="btn-light material-shadow-none" onAction={handleArrivedClick}>
            Arrived
          </Button>
          <Button className="btn-light material-shadow-none" onAction={handleCompletedClick}>
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverStatus;
