import React from "react";
import { SvgIcon } from "Components/Common"; // Adjust the import path as needed
import moment from "moment-timezone";
import { convertUTCToTimeZone } from "Components/Hooks/calendarHooks";


const EventContent = ({ arg }) => {
  const formatTime = (momentDate) => {
    // Ensure momentDate is a moment object
    const momentObj = moment.isMoment(momentDate) ? momentDate : moment(momentDate);
    return momentObj.format("h:mm A"); // Formats time in 12-hour format with AM/PM
  };

  const event = arg.event;
  const calendarTimeZone = arg.view.dateEnv.timeZone;
  const appointmentTime = event.start; // Assuming this is a Date object

  // Convert the time to a moment object in UTC (if it's not already in UTC)
  const appointmentMomentUTC = moment.utc(appointmentTime);

  // Convert the UTC time to the calendar's timezone
  const appointmentInCalendarTimeZone = convertUTCToTimeZone(appointmentMomentUTC, calendarTimeZone);

  // Format the time
  const appointmentStartTime = formatTime(appointmentInCalendarTimeZone);

  console.log("appointmentStartTime in Calendar Timezone: ", appointmentStartTime);

  const classNames = event.classNames;
  // console.log("classNames: ", classNames);

  const hasNote = classNames.includes("fc-note");
  const isCompleted = classNames.includes("fc-completed");
  const isPaid = classNames.includes("fc-paid");
  const didNotShow = classNames.includes("fc-dns");
  const isPackageApplied = classNames.includes("fc-package-applied");
  const isNewClient = classNames.includes("fc-new-client");

  return (
    <React.Fragment>
      <div className="fc-event-head"> </div>
      <div className="fc-event-content">
        <div className="fc-event-title">
          <div className="fc-event-icons">
            {isNewClient && (
              <i className="fc-new-icon tip-init" data-original-title="New Client" data-placement="left">
                <SvgIcon icon="new" />
              </i>
            )}
            {hasNote && (
              <i className="fc-comment-icon tip-init" data-original-title="Comment or note" data-placement="left">
                <SvgIcon icon="note" />
              </i>
            )}
            {isPackageApplied && (
              <i className="fc-package-icon tip-init" data-original-title="Has package applied" data-placement="left">
                <SvgIcon icon="packageApplied" />
              </i>
            )}
            {isCompleted && (
              <i
                className="fc-completed-icon tip-init"
                data-original-title="Appointment completed"
                data-placement="left"
              >
                <SvgIcon icon="completed" />
              </i>
            )}
            {isPaid && (
              <i className="fc-paid-icon tip-init" data-original-title="Invoice paid" data-placement="left">
                <SvgIcon icon="paid" />
              </i>
            )}
            {didNotShow && (
              <i className="fc-dns-icon tip-init" data-original-title="Did Not Show" data-placement="left">
                <SvgIcon icon="didNotShow" />
              </i>
            )}
          </div>

          <b className="fc-staff-name tip-init">
            <i className="fa fa-fw fa-user"></i>
          </b>
          <b className="fc-customer-name tip-init">{event.title}&nbsp;&nbsp;&nbsp;</b>
          <span>
            <i className="fc-new-customer">(new) &nbsp;</i> {appointmentStartTime}
          </span>
        </div>
        <div className="fc-event-body">
          {event.extendedProps.services.map((service, index) => (
            <div className="fc-event-items" key={service.id}>
              - {service.name} - <span>{service.price} KD</span>
            </div>
          ))}
        </div>
      </div>
      <div className="fc-event-bg"></div>
    </React.Fragment>
  );
};
export default EventContent;
