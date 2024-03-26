import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "store/actions";

const EventPopoverFooter = ({ event, setAppointment, toggle, setModal, setBookingMood }) => {
  const dispatch: any = useDispatch();

  const [localEvent, setLocalEvent] = useState(event);

  console.log("localEvent: ", localEvent);
  const appointmentStatus = event.status;

  const [isEdit, setIsEdit] = useState<boolean>(false);
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

  const handleStatusClick = (updatedStatus) => {
    const updatedAppointment = {
      ...localEvent,
      status: updatedStatus,
    };

    console.log("updatedAppointment: ", updatedAppointment);
    setAppointment({...updatedAppointment});
    dispatch(updateAppointment(updatedAppointment));
  };

  // const handleStatusClick = (updatedStatus) => {
  //   console.log("handleArrivedClick");
  //   const updatedAppointment = {
  //     ...event,
  //     status: updatedStatus,
  //   };
  //   // Create a new object for the state update
  //   setAppointment({ ...updatedAppointment });
  //   dispatch(updateAppointment(updatedAppointment));
  // };


  return (
    <React.Fragment>
      {/* Booking Actions */}
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

      {/* Status Actions */}
      <div className="btn-group calendar-balloon__status-buttons" data-toggle="buttons-relaxed-radio">
        <ButtonGroup size="sm" className="w-100 material-shadow">
          <Button
            className={`btn-light material-shadow-none ${localEvent.status === 3 ? "active" : ""}`}
            onClick={() => handleStatusClick(3)}
          >
            Arrived
          </Button>
          <Button
            className={`btn-light material-shadow-none ${localEvent.status === 5 ? "active" : ""}`}
            onClick={(e) => handleStatusClick(5)}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>

      {/* Inform Staff */}
      <div className="calendar-balloon__staff-ad-hoc-row hide">
        <a
          className="staff-contact modal-open bln-close"
          title="Send an SMS or email"
          href="/message/adhoccontactstaff/280034?messagetypeid=Sms&amp;bookingId=390779857&amp;contactreason=2"
        >
          Let Laura . know
        </a>
      </div>

      {/* Confirm, Decline, Checkout */}
      <div className="calendar-balloon__buttons-row">
        <a href="/billing/viewinvoice/?bookingId=390779857&amp;fromcalendar=true" className="status-buttons">
          <i className="fa fa-file"></i> View invoice
        </a>
        <a
          href="/calendar/bookingcancel/390779857"
          className="btn btn-small btn-outline-danger cancel-link modal-open bln-close"
        >
          Cancel
        </a>
      </div>
    </React.Fragment>
  );
};

export default EventPopoverFooter;
