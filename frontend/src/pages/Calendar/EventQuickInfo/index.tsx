import React, { useEffect, useState, useRef } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { createPortal } from "react-dom";

// Redux
import { useSelector } from "react-redux";
import { appointmentsSelector } from "Selectors";


// Popover Components
import EventPopoverHeader from "./EventPopoverHeader";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverFooter from "./EventPopoverFooter";

const EventQuickInfo = ({ eventEl, event, setAppointment, isOpen, toggle, setBookingModal, setBookingMood }) => {
  const { staff } = useSelector(appointmentsSelector);
  const popoverContentRef = useRef(null);
  const backdropRef = useRef(null);

  const closePopover = () => {
    toggle(false);
  };

  // Close popover and backdrop when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the popover and the backdrop
      const isOutsidePopover = popoverContentRef.current && !popoverContentRef.current.contains(event.target);
      const isOnBackdrop = backdropRef.current && backdropRef.current.contains(event.target);

      if (isOpen === "quickInfo" && (isOutsidePopover || isOnBackdrop)) {
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
            <EventPopoverContent event={event} staff={staff} />
            <EventPopoverFooter
              event={event}
              setAppointment={setAppointment}
              toggle={toggle}
              setBookingModal={setBookingModal}
              setBookingMood={setBookingMood}
            />
          </PopoverBody>
        </Popover>
        <div ref={backdropRef} className="modal-backdrop fade show"></div>
      </React.Fragment>,
      document.body
    )
  );
};

export default EventQuickInfo;
