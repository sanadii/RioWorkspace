import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody, Alert } from "reactstrap";
import { formatTime, findStaffNameById } from "Components/Hooks";

const EventPopoverContent = ({ event: { services = [] }, staff }) => {
  return (
    <div className="calendar-balloon__event-details">
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

      {services.map((service) => (
        <ServiceEntry key={service.id} service={service} staff={staff} />
      ))}
    </div>
  );
};

const ServiceEntry = ({ service, staff }) => (
  <div className="calendar-balloon__service-entry">
    <div className="fc-event-body calendar-balloon__detail-line">
      <div className="calendar-balloon__icon service-icon"></div>
      <div className="service-container">
        <p className="service-title">
          <b>{service.name.substring(0, 30)}</b>
          <span className="calendar-balloon__price">
            <b> {service.price}KD</b>
            <i className="ri-price-tag-3-line"></i>
          </span>
        </p>

        <p className="calendar-balloon__time">
          <i className="ri-map-pin-time-line"></i>
          {formatTime(service.start)} - {formatTime(service.end)}
        </p>
        <p className="calendar-balloon__staff-time">
          <i className="ri-map-pin-user-line"></i>
          {findStaffNameById(service.staff, staff)}
        </p>
      </div>
    </div>
  </div>
);

export default EventPopoverContent;
