// Event Render Hooks

// Customize the rendering of event elements with the following options:
// eventClassNames - a ClassName Input for adding classNames to the outermost event element. If supplied as a callback function, it is called every time the associated event data changes.
// eventContent - a Content Injection Input. Generated content is inserted inside the inner-most wrapper of the event element. If supplied as a callback function, it is called every time the associated event data changes.
// eventDidMount - called right after the element has been added to the DOM. If the event data changes, this is NOT called again.
// eventWillUnmount - called right before the element will be removed from the DOM.

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:

// event - Event Object
// timeText
// isStart
// isEnd
// isMirror
// isPast
// isFuture
// isToday
// el - the element. only available in eventDidMount and eventWillUnmount
// view - View Object

const EventRenderHooks = {
  // Class names for events
  eventClassNames: (arg) => [],

  // eventRender: function (info) {
  //   console.log("_______ info _______\n");
  //   console.log(info.event.extendedProps.My_Custom_Value);
  // },

  // Custom content for events
  eventContent: (arg) => {
    // Customize the content of the event element
    const event = arg.event;

    return (
      <>
        <div className="fc-event-head"> </div>
        <div className="fc-event-content">
          <div className="fc-event-title">
            <div className="fc-event-notes">
              <i className="fc-comment-icon tip-init" data-original-title="Comment or note" data-placement="left">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path
                    fill="none"
                    fillRule="evenodd"
                    stroke="#13846e"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M1.932 7.515a6.528 6.528 0 0 0 .985 3.456L1 15l4.025-1.918a6.524 6.524 0 0 0 8.99-2.099 6.537 6.537 0 0 0-2.097-8.998A6.524 6.524 0 0 0 8.46 1a6.521 6.521 0 0 0-6.528 6.515z"
                  ></path>
                </svg>
              </i>
            </div>
            <b className="fc-staff-name tip-init">
              <i className="fa fa-fw fa-user"></i>
            </b>
            <b className="fc-customer-name tip-init">{event.title}&nbsp;&nbsp;&nbsp;</b>
            <span>
              <i className="fc-new-customer">(new) &nbsp;</i> {arg.event.start.toString()}
            </span>
          </div>
          {event.extendedProps.services.map((service, index) => (
            <div key={service.id} className="fc-event-body" style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
              {service.name} -<span>{service.price}</span>
            </div>
          ))}
        </div>
        <div className="e-appointment-bg"></div>
      </>
    );
  },

  // Callback function when an event is mounted
  eventDidMount: (arg) => {},

  // Callback function before an event is unmounted
  eventWillUnmount: (arg) => {},
};

export default EventRenderHooks;
