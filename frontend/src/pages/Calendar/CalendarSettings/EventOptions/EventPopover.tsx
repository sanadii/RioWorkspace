import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { formatTime } from "../CalendarHooks";
import { createPortal } from "react-dom";

// Popover Components
import EventPopoverHeader from "./EventPopoverHeader";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverActions from "./EventPopoverActions";
import EventPopoverStatus from "./EventPopoverStatus";
import EventPopoverFooter from "./EventPopoverFooter";

const EventPopover = ({ eventEl, event, isOpen, toggle }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const closePopOver = () => {
    setPopoverOpen(false);
  };

  return (
    eventEl &&
    createPortal(
      <React.Fragment>
        <Popover
          placement="auto"
          className="event-popover calendar-balloon"
          isOpen={isOpen}
          target={eventEl}
          toggle={toggle}
          onClose={console.log("")}
        >
          <PopoverHeader>
            <EventPopoverHeader event={event} closePopOver={closePopOver} />
          </PopoverHeader>
          <PopoverBody>
            <EventPopoverContent event={event} />
            <EventPopoverActions event={event} toggle={toggle} />
            <EventPopoverStatus event={event} toggle={toggle} />
            <EventPopoverFooter />
          </PopoverBody>
        </Popover>
      </React.Fragment>,
      document.body // Render directly into the body
    )
  );
};

export default EventPopover;
