const EventDisplay = {
  // Callback function invoked when event source fails to load
  eventSourceFailure: (error) => console.error("Event source failed:", error),

  // Callback function invoked when event source successfully loads
  eventSourceSuccess: (eventsInput, response) => {
    console.log("Event source loaded successfully.");
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

export default EventDisplay;
