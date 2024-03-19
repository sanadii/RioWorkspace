import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Popover } from "reactstrap";

import CalendarModal from "../../CalendarModal";
const EventPopover2 = ({ eventEl, event }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverContainer = document.createElement("div");

  // Modal
  const [modal, setModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setAppointment(null);
      setIsEdit(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  useEffect(() => {
    const togglePopover = () => {
      setPopoverOpen(!popoverOpen);
    };

    if (eventEl) {
      eventEl.addEventListener("click", togglePopover);
      document.body.appendChild(popoverContainer);

      return () => {
        eventEl.removeEventListener("click", togglePopover);
        document.body.removeChild(popoverContainer);
      };
    }
  }, [eventEl]);

  return (
    eventEl &&
    createPortal(
      <React.Fragment>
        <CalendarModal
          modal={modal}
          // id="event-modal"
          toggle={toggle}
          appointment={event}
          isEdit={isEdit}
        />

        <Popover placement="auto" isOpen={popoverOpen} target={eventEl} toggle={togglePopover}>
          <div> just to tell you i survived</div>
        </Popover>
      </React.Fragment>,
      popoverContainer
    )
  );
};

export default EventPopover2;
