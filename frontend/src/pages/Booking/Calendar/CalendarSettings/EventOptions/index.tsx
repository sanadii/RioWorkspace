// EventRenderHooks: https://fullcalendar.io/docs/event-render-hooks
import EventContent from "./EventContent";

const EventDisplaySettings = {
  eventOrder: "title", // Defines the order in which events are displayed, can be a string, array, or function
  eventOrderStrict: false, // When true, events are sorted strictly by the eventOrder setting
  eventResizableFromStart: true, // Determines whether events can be resized from their start
  displayEventTime: true, // Determines whether to display the time of events
  displayEventEnd: true, // Determines whether to display the end time of events
  progressiveEventRendering: true, // Determines whether to use progressive event rendering

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

const EventDragAndResize = {
  eventResize: (arg) => {
    console.log("handleEventResize", arg);
    alert(arg.event.title + " end is now " + arg.event.end.toISOString());
  },
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

  // eventRender: (arg) => {
  //   console.log("check arg: arg(eventClassNames): ", arg);
  // },

  // Callback function when an event is mounted
  // Callback function when an event is mounted
  // eventDidMount: (info) => {
  //   // If you need to create an additional container and append it to the body
  //   const eventPopoverDiv = document.createElement("div");
  //   eventPopoverDiv.className = "fc-event-popover";
  //   document.body.appendChild(eventPopoverDiv);
  // },

  // eventDidMount: (info) => {
  //   const container = document.createElement("div");
  //   document.body.appendChild(container);
  //   const root = createRoot(container);
  //   root.render(
  //     <Provider store={configureStore({})}>
  //       <BrowserRouter basename={process.env.PUBLIC_URL}>
  //         <EventPopover eventEl={info.el} event={info.event} />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   // Clean up: Remove the container when the popover is unmounted
  //   return () => {
  //     root.unmount();
  //     container.remove();
  //   };
  // },

  // Custom content for events
  eventContent: (arg) => {
    return <EventContent arg={arg} />;
  },

  // Callback function before an event is unmounted
  eventWillUnmount: (arg) => {},
};

export { EventDisplaySettings, EventRenderHooks, };
