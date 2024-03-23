import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { formatTime } from "../../../../Components/Hooks/calendarHooks";
import { createPortal } from "react-dom";

// Popover Components
import EventPopoverHeader from "./EventPopoverHeader";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverActions from "./EventPopoverActions";
import EventPopoverStatus from "./EventPopoverStatus";
import EventPopoverFooter from "./EventPopoverFooter";

const EventPopover = ({ eventEl, event, isOpen, toggle }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Logic to reposition the popover based on the new target (eventEl)
      // This might depend on how your popover component handles positioning
    }
  }, [eventEl, isOpen]); // Dependency array includes eventEl and isOpen

  const closePopOver = () => {
    setPopoverOpen(false);
  };

  return (
    isOpen &&
    createPortal(
      <React.Fragment>
        <div
          className="balloon-backing"
          style={{
            width: "99%",
            height: "100vh",
            position: "absolute",
            top: "0px",
            left: "auto",
            right: "0px",
            zIndex: 5000,
          }}
        ></div>
        {eventEl && (
          <Popover
            placement="auto"
            className="event-popover calendar-balloon"
            isOpen={isOpen}
            target={eventEl}
            toggle={toggle}
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
        )}
      </React.Fragment>,
      document.body // Render directly into the body
    )
  );
};

export default EventPopover;
