import React from "react";

const EventPopoverFooter = () => {
  return (
    <React.Fragment>
      <div className="calendar-balloon__staff-ad-hoc-row hide">
        <a
          className="staff-contact modal-open bln-close"
          title="Send an SMS or email"
          href="/message/adhoccontactstaff/280034?messagetypeid=Sms&amp;bookingId=390779857&amp;contactreason=2"
        >
          Let Laura . know
        </a>
      </div>
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
