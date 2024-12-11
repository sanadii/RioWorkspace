import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const CalendarTest = () => {
  // Popover open state
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
      }}
    >
      <h4>ReactJS Reactstrap Popover Component</h4>
      <Button id="Popover1" type="button">
        Click me to Open Popover
      </Button>{" "}
      <br></br>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={() => {
          setPopoverOpen(!popoverOpen);
        }}
      >
        <PopoverHeader>Sample Popover Title</PopoverHeader>
        <PopoverBody>Sample Body Text to display...</PopoverBody>
      </Popover>
    </div>
  );
};

export default CalendarTest;
