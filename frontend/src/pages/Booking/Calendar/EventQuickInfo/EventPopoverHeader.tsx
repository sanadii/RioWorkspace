import React from "react";

const EventPopOverHeader = ({ event, closePopover }) => {
  const defId = event?.defId;
  const publicId = event?.publicId;
  const groupId = event?.groupId;
  const clientName = event.title;
  const clientId = event?.client?.id;
  const clientMobile = event?.client?.mobile;

  return (
    <React.Fragment>
      <div className="popover-title">
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
        <a
          className="close bln-close"
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor action
            closePopover(); // Call the closePopover function
          }}
        >
          <i className="ri-close-fill"></i>
        </a>
      </div>
      <p>
        <a href={`tel:+${clientMobile}}`}>
          <i className="ri-smartphone-line">&nbsp;</i>+{clientMobile}
        </a>
      </p>
    </React.Fragment>
  );
};

export default EventPopOverHeader;
