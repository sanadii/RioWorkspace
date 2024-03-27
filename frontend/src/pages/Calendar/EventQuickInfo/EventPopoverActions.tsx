import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";

// import CalendarModal from "CalendarModal"
const EventPopoverActions = ({ event, setAppointment, toggle, setModal, setBookingMood }) => {
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
    setBookingMood("bookNextEvent");
    setAppointment(event);
    // setAppointment
    toggle();
  };

  const handleRescheduleAction = (event) => {
    setBookingMood("rescheduleEvent");
    setAppointment(event);
    toggle();
  };

  console.log("EVENTY: ", event);
  const handleArrivedClick = (e) => {
    console.log("handleArrivedClick");
  };
  const handleCompletedClick = (e) => {
    console.log("handleCompletedClick");
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
          onClick={(e) => handleRescheduleAction(event)}
        >
          Reschedule
        </button>
        <button
          id="edit"
          // disabled={loader && true}
          className="btn btn-soft-secondary w-100 waves-effect waves-light material-shadow-none"
          // className="btn btn-primary-light btn-small bln-close"
          onClick={(e) => handleBookNexttAction(event)}
        >
          Book Next
        </button>
      </div>
      <div className="btn-group calendar-balloon__status-buttons" data-toggle="buttons-relaxed-radio">
        <ButtonGroup size="sm" className="w-100 material-shadow">
          <Button className="btn-light material-shadow-none" onClick={(e) => handleArrivedClick(e)}>
            Arrived
          </Button>
          <Button className="btn-light material-shadow-none" onClick={(e) => handleCompletedClick(e)}>
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverActions;
