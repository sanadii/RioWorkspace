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

const EventQuickInfo = ({
  isOpen,
  setIsQuickInfoModal,
  setIsEventBookingModal,
  setIsRebookEvent,
  eventEl,
  event,
  setAppointment,
  toggleModal,
  setBookingMood,
  setIsCancelEventModal,
}) => {
  const { staff } = useSelector(appointmentsSelector);
  const popoverContentRef = useRef(null);
  const backdropRef = useRef(null);

  const closePopover = () => {
    setIsQuickInfoModal(false);
  };

  // Close popover and backdrop when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the popover and the backdrop
      const isOutsidePopover = popoverContentRef.current && !popoverContentRef.current.contains(event.target);
      const isOnBackdrop = backdropRef.current && backdropRef.current.contains(event.target);

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
          toggleModal={toggleModal}
        >
          {/* Event Popover Header */}
          <PopoverHeader>
            <EventPopoverHeader event={event} closePopover={closePopover} />
          </PopoverHeader>

          {/* Event Popover Body */}
          <PopoverBody>
            <EventPopoverContent event={event} staff={staff} />
            <EventPopoverFooter
              event={event}
              setAppointment={setAppointment}
              setIsRebookEvent={setIsRebookEvent}
              toggleModal={toggleModal}
              setBookingMood={setBookingMood}
              closePopover={closePopover}
              setIsEventBookingModal={setIsEventBookingModal}
              setIsCancelEventModal={setIsCancelEventModal}
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
