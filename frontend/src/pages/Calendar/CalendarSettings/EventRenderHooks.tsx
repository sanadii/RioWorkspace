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

const EventRenderHooks = {
  // Class names for events
  eventClassNames: function (arg) {
    console.log("--- arg ---: ", arg.event.extendedProps.status);
    const statusOption = AppointmentStatusOptions.find((option) => option.id === arg.event.extendedProps.status);
    return [statusOption.className];

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

export default EventRenderHooks;
