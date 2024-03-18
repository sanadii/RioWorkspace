import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { formatTime } from "../CalendarHooks";
import { C } from "@fullcalendar/core/internal-common";

const EventPopover = ({ eventEl, event }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverContentRef = React.createRef<HTMLDivElement>(); // Specify the type of the ref

  console.log("THE MOBILE: ", event);
  const clientName = event.title;
  const appointmentStatus = event && event.client && event.status;
  const ppointmentStart = formatTime(event.start);
  const appointmentEnd = formatTime(event.end);

  const clientMobile = event && event.extendedProps.client && event.extendedProps.client.mobile;
  const services = (event && event.extendedProps.services) || [];

  const closePopOver = () => {
    setPopoverOpen(!popoverOpen);
  };

  useEffect(() => {
    const togglePopover = () => {
      setPopoverOpen(!popoverOpen);
    };

    if (eventEl) {
      // Add click event listener href the event element
      eventEl.addEventListener("click", togglePopover);

      // Create a root for the popover content
      const root = createRoot(popoverContentRef.current);

      // Render the popover content
      root.render(
        <Popover placement="auto" isOpen={popoverOpen} target={eventEl} toggle={togglePopover}>
          <PopoverHeader className="popover-title">
            <a
              className="fc-customer-name goto-customer"
              data-customer-id="70716693"
              title="View details"
              href="/customer/customers/70716693?tab=details"
            >
              {clientName}{" "}
            </a>
            &nbsp;
            <a
              className="customer-edit bln-close"
              title="Edit customer"
              href="/customer/customeredit/70716693?tab=details&amp;fromCalendar=true"
            >
              <i className="ri-edit-line"></i>
            </a>
            <a
              className="customer-edit bln-close"
              title="Send an SMS or email"
              href="/message/adhoccontactcustomer/70716693?bookingId=384951115"
            >
              <i className="ri-message-2-line"></i>
            </a>
            <a
              className="customer-edit bln-close print-booking"
              href="javascript:void(0);"
              title="Print appointment details"
              data-booking-group-id="306621923"
              data-booking-id="384951115"
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
              <a href="tel:+965201068811086">
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
                    <div className="calendar-balloon__time">{ppointmentStart}</div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverBody>
        </Popover>
      );

      // Clean up
      return () => {
        root.unmount();
      };
    }
  }, [eventEl, popoverOpen]);

  // Render the popover using React Portal if the event element exists
  return <div ref={popoverContentRef} />;
};

export default EventPopover;
