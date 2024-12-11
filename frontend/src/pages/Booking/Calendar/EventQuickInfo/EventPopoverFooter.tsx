import React, { useEffect, useState, useRef } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateAppointment } from "store/actions";

const EventPopoverFooter = ({
  event,
  setAppointment,
  toggleModal,
  closePopover,
  setIsEventBookingModal,
  setBookingMood,
  setIsRebookEvent,
  setIsCancelEventModal
}) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [localEvent, setLocalEvent] = useState(event);
  const appointmentStatus = localEvent.status;
  const isInvoiced = false;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditAction = (e) => {
    setIsEventBookingModal(true);
    setBookingMood("editEvent");
    setIsEdit(true);
    closePopover();
  };

  const handleBookNextClick = (event) => {
    setIsRebookEvent(true);
    setBookingMood("bookNextEvent");
    closePopover();
  };

  const handleRescheduleAction = (event) => {
    setIsRebookEvent(true);
    setBookingMood("rescheduleEvent");
    closePopover();
  };

  const handleCancelEventAction = (event) => {
    setBookingMood("cancelEvent");
    setIsCancelEventModal(true);
    setIsEdit(true);
  };

  const handleStatusClick = (updatedStatus) => {
    const updatedAppointment = {
      ...localEvent,
      status: updatedStatus,
    };

    console.log("updatedAppointment: ", updatedAppointment);
    setLocalEvent({ ...updatedAppointment });
    dispatch(updateAppointment(updatedAppointment));
  };

  // Handles the Checkout (closing the dialogue)
  const handleCheckOutClick = () => {
    const appointmentId = event?.id;
    // const clientId = scheduleObj.current.activeEventData?.event.client.id;

    navigate(`/invoice?appointmentId=${appointmentId}`);
    toggleModal("");
  };

  // Handle different button actions

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
          onClick={(event) => handleBookNextClick(event)}
        >
          Book Next
        </button>
      </div>

      {/* Status Actions */}
      {appointmentStatus === 1 ? (
        <div className="calendar-balloon__buttons-row">
          <Button
            className="btn-secondary material-shadow-none w-100 "
            data-refresh-cal="yes"
            onClick={() => handleStatusClick(2)}
          >
            <i className="mdi mdi-check-bold"></i> Confirm
          </Button>
          <Button
            data-href="/dashboard/declinebooking/387979370"
            className="btn-light material-shadow-none w-100"
            data-refresh-cal="yes"
          >
            <i className="mdi mdi-close-thick"></i> Decline
          </Button>
          <Button
            className="btn btn-small btn-outline-danger cancel-link modal-open bln-close"
            onClick={(e) => handleCancelEventAction(e)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="btn-group calendar-balloon__status-buttons" data-toggleModal="buttons-relaxed-radio">
            <ButtonGroup size="sm" className="w-100 material-shadow">
              <Button
                className={`btn-light material-shadow-none ${appointmentStatus === 3 ? "active" : ""}`}
                onClick={() => handleStatusClick(3)}
              >
                Arrived
              </Button>
              <Button
                className={`btn-light material-shadow-none ${appointmentStatus === 5 ? "active" : ""}`}
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
            {isInvoiced ? (
              <Button href="/billing/viewinvoice/?bookingId=390779857&amp;fromcalendar=true" className="status-buttons">
                <i className="fa fa-file"></i> View invoice
              </Button>
            ) : (
              <Button
                className="btn-primary material-shadow-none w-100"
                data-booking-id="387979370"
                data-group-id="308932365"
                onClick={(e) => handleCheckOutClick()}
              >
                Checkout
              </Button>
            )}

            <Button
              className="btn btn-small btn-outline-danger cancel-link modal-open bln-close"
              onClick={(e) => handleCancelEventAction(e)}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default EventPopoverFooter;
