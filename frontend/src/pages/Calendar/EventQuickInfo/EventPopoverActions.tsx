import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";

// import CalendarModal from "CalendarModal"
const EventPopoverActions = ({ event, setAppointment, toggle, setModal, setIsBookNext }) => {
  // const [event, setEvent] = useState<any>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  // console.log("isBookNext: ", isBookNext);
  const handleEditAction = (e) => {
    toggle();
    setModal(true);
    setIsEdit(true);
  };

  const handleBookNexttAction = (event) => {
    setIsBookNext(true);
    setAppointment(event.client.id);
    // setAppointment
    toggle();
  };

  const handleRescheduleAction = (e) => {
    setIsBookNext(true);
    setAppointment(event);
    toggle();
  };

  return (
    <React.Fragment>
      <div className="calendar-balloon__action-buttons">
        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleEditAction(e)}
        >
          Edit
        </button>

        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 p-2 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleRescheduleAction(e)}
        >
          Reschedule
        </button>
        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleBookNexttAction(e)}
        >
          Book Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverActions;
