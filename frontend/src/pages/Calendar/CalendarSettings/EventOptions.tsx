// EventRenderHooks: https://fullcalendar.io/docs/event-render-hooks
import React from "react";
import { SvgIcon } from "Components/Common"; // Adjust the import path as needed
import { AppointmentStatusOptions } from "Components/constants";

const EventDisplay = {
  // Callback function invoked when event source fails to load
  eventSourceFailure: (error) => console.error("Event source failed:", error),

  // Callback function invoked when event source successfully loads
  eventSourceSuccess: (eventsInput, response) => {
    // console.log("Event source loaded successfully.");
    return eventsInput;
  },

  // Determines whether the events on the calendar can be modified
  //   editable: true, // Determines if the events can be dragged and resized
  //   eventStartEditable: true, // Determines whether events can be resized from their start
  //   eventDurationEditable: true, // Determines whether events can be resized in duration

  eventDisplay: "auto", // Display option for events
  eventOverlap: true, // Determines whether events can overlap each other
  eventConstraint: null, // Constraint for event rendering

  // Function to determine if an event is allowed to be rendered
  eventAllow: () => true,

  eventBackgroundColor: "rgb(27, 188, 157)", // Background color for events
  eventBorderColor: "rgb(27, 188, 157)", // Border color for events
  // eventTextColor: "#000000", // Text color for events
  eventColor: "rgb(27, 188, 157)", // General color for events (can be used as a shorthand for background, border, and text colors)
};

const EventRenderHooks = {
  // Class names for events
  // eventClassNames: function (arg) {
  //   // console.log("--- arg ---: ", arg.event.extendedProps.status);
  //   // const statusOption = AppointmentStatusOptions.find((option) => option.id === arg.event.extendedProps.status);
  //   return [arg.classNames];

  //   // if (arg.event.extendedProps.isUrgent) {
  //   //   return [statusOption.className];
  //   // } else {
  //   //   return ["normal"];
  //   // }
  // },

  // eventClassNames: (arg) => {
  //   console.log("check arg(eventClassNames): arg: ", arg);
  // },

  // eventRender: (arg) => {
  //   console.log("check arg: arg(eventClassNames): ", arg);
  // },

  // Callback function when an event is mounted
  eventDidMount: (arg) => {
    console.log("check arg: (eventDidMount): ", arg.el.classList);
  },

  // Custom content for events
  eventContent: (arg) => {
    const event = arg.event;
    const classNames = event.classNames;
    console.log("classNames: ", classNames);

    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    }

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
              <i className="fc-new-customer">(new) &nbsp;</i> {formatTime(arg.event.start)}
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
  },

  // Callback function before an event is unmounted
  eventWillUnmount: (arg) => {},
};

export { EventDisplay, EventRenderHooks };
