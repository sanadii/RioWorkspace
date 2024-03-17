// EventRenderHooks: https://fullcalendar.io/docs/event-render-hooks
import { SvgIcon } from "Components/Common"; // Adjust the import path as needed
import { AppointmentStatusOptions } from "Components/constants";

// fc-event-past
// fc-timegrid-event
// fc-v-event                                   // fc-event-vert

// //
// fc-event-skin
// fc-booking
// fc-completed
// fc-paid

// fc-booking-id-387849989
// fc-group-308827975

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
  eventClassNames: function (arg) {
    // console.log("--- arg ---: ", arg.event.extendedProps.status);
    // const statusOption = AppointmentStatusOptions.find((option) => option.id === arg.event.extendedProps.status);
    return [arg.className];

    // if (arg.event.extendedProps.isUrgent) {
    //   return [statusOption.className];
    // } else {
    //   return ["normal"];
    // }
  },

  // eventClassNames: (arg) => {
  //   console.log("--- arg ---: ", arg);
  //   // const statusOption = AppointmentStatusOptions.find((option) => option.id === status);
  //   return <></>;
  // }

  // eventRender: function (info) {
  //   console.log("_______ info _______\n");
  //   console.log(info.event.extendedProps.My_Custom_Value);
  // },

  // Custom content for events
  eventContent: (arg) => {
    // Customize the content of the event element
    const event = arg.event;
    const className = arg.event.className;
    console.log("className: ", arg.event)
    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    }

    return (
      <>
        <div className="fc-event-head"> </div>
        <div className="fc-event-content">
          <div className="fc-event-title">
            <div className="fc-event-icons">
              <i className="fc-comment-icon tip-init" data-original-title="Comment or note" data-placement="left">
                <SvgIcon icon="note" />
              </i>
              <i
                className="fc-completed-icon tip-init"
                data-original-title="Appointment completed"
                data-placement="left"
              >
                <SvgIcon icon="completed" />
              </i>
              <i className="fc-paid-icon tip-init" data-original-title="Invoice paid" data-placement="left">
                <SvgIcon icon="paid" />
              </i>
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
      </>
    );
  },

  // Callback function when an event is mounted
  eventDidMount: (arg) => {},

  // Callback function before an event is unmounted
  eventWillUnmount: (arg) => {},
};

export { EventDisplay, EventRenderHooks };
