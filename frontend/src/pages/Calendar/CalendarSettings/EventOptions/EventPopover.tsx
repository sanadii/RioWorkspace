import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { formatTime } from "../CalendarHooks";
import { createPortal } from "react-dom";

const EventPopover = ({ eventEl, event, isOpen, toggle }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const closePopOver = () => {
    setPopoverOpen(false);
  };

  const handleEditAction = (e) => {
    console.log("Handling Edit Action");
    // Your edit logic here
  };

  const clientName = event.title;
  const clientId = event?.client?.id;
  const clientMobile = event?.extendedProps?.client?.mobile;
  const services = event?.extendedProps?.services || [];
  // const appointmentStart = formatTime(event?.start);
  // const appointmentEnd = formatTime(event?.end);
  const publicId = event?.extendedProps?.publicId;
  const groupId = event?.extendedProps?.groupId;
  const appointmentStatus = event?.extendedProps?.status;

  return (
    eventEl &&
    createPortal(
      <React.Fragment>
        <div
          className="balloon-backing sanad-blocking"
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 5000,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: for a semi-transparent backdrop
          }}
          // onClick={closePopover}
        ></div>

        <Popover placement="auto" isOpen={isOpen} target={eventEl} toggle={toggle}>
          <PopoverHeader className="popover-title">
            <a
              className="fc-customer-name goto-customer"
              data-customer-id={clientId}
              title="View details"
              href={`/customer/customers/${clientId}?tab=details`}
            >
              {clientName}{" "}
            </a>
            &nbsp;
            <a
              className="customer-edit bln-close"
              title="Edit customer"
              href={`/customer/customeredit/${clientId}?tab=details&fromCalendar=true`}
            >
              <i className="ri-edit-line"></i>
            </a>
            <a
              className="customer-edit bln-close"
              title="Send an SMS or email"
              href={`/message/adhoccontactcustomer/${clientId}?bookingId=${publicId}`}
            >
              <i className="ri-message-2-line"></i>
            </a>
            <a
              className="customer-edit bln-close print-booking"
              href="#"
              title="Print appointment details"
              data-booking-group-id={groupId}
              data-booking-id={publicId}
            >
              <i className="ri-printer-fill"></i>
            </a>
            <Button
              type="button"
              className="btn-close"
              onClick={() => {
                closePopOver();
              }}
              aria-label="Close"
            ></Button>
            <p>
              <a href={`tel:+${clientMobile}}`}>
                <i className="ri-smartphone-line">&nbsp;</i>+{clientMobile}
              </a>
            </p>
          </PopoverHeader>
          <PopoverBody>
            <div className="calendar-balloon__event-details">
              {services.map((service) => (
                <div key={service.id} className="calendar-balloon__service-entry">
                  <div className="fc-event-body calendar-balloon__detail-line">
                    <div className="calendar-balloon__icon service-icon"></div>
                    <div>
                      {service.name.substring(0, 30)}
                      <span className="fc-price"> - {service.price} KD</span>
                    </div>
                  </div>

                  <div className="calendar-balloon__detail-line">
                    <div className="calendar-balloon__icon staff-icon"></div>
                    <div className="calendar-balloon__staff-time">{service.staff}</div>
                    <div className="calendar-balloon__icon time-icon"></div>
                    {/* <div className="calendar-balloon__time">{appointmentStart}</div> */}
                  </div>
                </div>
              ))}
            </div>
          </PopoverBody>
          <div className="quick-info-footer">
            <div className="event-footer">
              <p>status: {appointmentStatus}</p>
              <div className="calendar-balloon__action-buttons">
                <Button
                  id="edit"
                  color="success"
                  // disabled={loader && true}
                  className="btn btn-success w-100"
                  // className="btn btn-primary-light btn-small bln-close"

                  type="submit"
                  onClick={(e) => handleEditAction(e)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Popover>
      </React.Fragment>,
      document.body // Render directly into the body
    )
  );
};

export default EventPopover;
