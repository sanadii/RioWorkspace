import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody, Alert } from "reactstrap";
import { formatTime } from "../CalendarHooks";
import { createPortal } from "react-dom";
const EventPopoverContent = ({ event }) => {
  const services = event?.extendedProps?.services || [];

  return (
    <React.Fragment>
      <Alert color="success" className={`alert-label-icon label-arrow material-shadow `}>
        <i className="ri-file-text-line label-icon"></i>
        roots only{" "}
        <a
          className="modal-open bln-close"
          data-modal-className="booking-modal"
          href="/calendar/bookingedit/390779857?tab=notes"
        >
          edit
        </a>
      </Alert>

      {services.map((service) => (
        <div className="calendar-balloon__event-details">
          <div key={service.id} className="calendar-balloon__service-entry">
            <div className="fc-event-body calendar-balloon__detail-line">
              <div className="calendar-balloon__icon service-icon"></div>
              <div>
                <p>
                  <b>{service.name.substring(0, 30)}</b>
                  <span className="fc-price"> - {service.price}KD</span>
                </p>
                <p>
                  <span className="calendar-balloon__staff-time">with {service.staff} </span>
                  {/* <div className="calendar-balloon__icon time-icon"></div> */}
                  <span className="calendar-balloon__time">
                    at
                    {/* {appointmentStart} */}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default EventPopoverContent;
