import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";

// Popover Components
import EventPopoverHeader from "./EventPopoverHeader";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverActions from "./EventPopoverActions";
import EventPopoverStatus from "./EventPopoverStatus";
import EventPopoverFooter from "./EventPopoverFooter";

const EventQuickInfo = ({ eventEl, event, setAppointment, isOpen, toggle, setModal, setIsBookNext }) => {
  const popoverContentRef = useRef(null);
  const backdropRef = useRef(null);

  const closePopover = () => {
    toggle(false);
  };

  // Close popover and backdrop when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Click detected: ", event.target);

      // Check if the click is outside both the popover and the backdrop
      const isOutsidePopover = popoverContentRef.current && !popoverContentRef.current.contains(event.target);
      const isOnBackdrop = backdropRef.current && backdropRef.current.contains(event.target);

      console.log("Is outside popover: ", isOutsidePopover);
      console.log("Is on backdrop: ", isOnBackdrop);

      if (isOpen && (isOutsidePopover || isOnBackdrop)) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, popoverContentRef, backdropRef]);

  return (
    isOpen &&
    createPortal(
      <React.Fragment>
        <Popover
          ref={popoverContentRef}
          placement="auto"
          className="event-popover calendar-balloon"
          isOpen={isOpen}
          target={eventEl}
          toggle={toggle}
        >
          <PopoverHeader>
            <EventPopoverHeader event={event} closePopover={closePopover} />
          </PopoverHeader>
          <PopoverBody>
            <EventPopoverContent event={event} />
            <EventPopoverActions
              event={event}
              setAppointment={setAppointment}
              toggle={toggle}
              setModal={setModal}
              setIsBookNext={setIsBookNext}
            />
            <EventPopoverStatus event={event} toggle={toggle} />
            <EventPopoverFooter />
          </PopoverBody>
        </Popover>
        <div ref={backdropRef} className="modal-backdrop fade show"></div>
      </React.Fragment>,
      document.body
    )
  );
};

export default EventQuickInfo;
