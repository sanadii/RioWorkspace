import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

const EventPopover = ({ eventEl, event }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverContentRef = React.createRef<HTMLDivElement>(); // Specify the type of the ref

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
  };

  const clientName = event.title;
  const clientMobile = event && event.client && event.client.mobile;
  const appointmentStatus = event && event.client && event.status;

  const start = formatTime(event.start);
  const end = formatTime(event.end);
  const services = (event && event.extendedProps && event.extendedProps.services) || [];

  useEffect(() => {
    const togglePopover = () => {
      setPopoverOpen(!popoverOpen);
    };

    if (eventEl) {
      // Add click event listener to the event element
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
            <a className="close bln-close">×</a>
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
                    <div className="calendar-balloon__time">{start}</div>
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
