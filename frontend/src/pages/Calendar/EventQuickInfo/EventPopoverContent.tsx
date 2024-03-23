import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, PopoverHeader, PopoverBody, Alert } from "reactstrap";
import { formatTime } from "Components/Hooks";
import { createPortal } from "react-dom";
const EventPopoverContent = ({ event }) => {
  const services = event?.services || [];

  return (
    <React.Fragment>
      <div className="alert border-0 border-start border-success bg-success-subtle material-shadow d-flex justify-content-between align-items-center">
        <div>
          <i className="ri-file-text-line text-success label-icon pe-2"></i>
          roots only
        </div>
        <a
          className="modal-open text-success"
          data-modal-className="booking-modal"
          href="/calendar/bookingedit/390779857?tab=notes"
        >
          Edit
        </a>
      </div>

      {/* Service Details */}
      <div className="calendar-balloon__event-details">
        {services.map((service) => (
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
        ))}
      </div>
    </React.Fragment>
  );
};

export default EventPopoverContent;
