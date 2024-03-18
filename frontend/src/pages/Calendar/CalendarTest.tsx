import React, { useState } from "react";
import { Button } from "reactstrap";
import AppointmentPopover from "./AppointmentPopover";

const CalenderTest = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <React.Fragment>
      <div>
        <Button id="Popover1" onClick={togglePopover}>
          Launch Popover
        </Button>
        <AppointmentPopover isOpen={popoverOpen} toggle={togglePopover} target="Popover1" />
      </div>
    </React.Fragment>
  );
};

export default CalenderTest;
