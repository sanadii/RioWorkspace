const DaySettings = {
  dayMaxEvents: 3, // Maximum number of events displayed on a day. Set to false for unlimited
  dayMaxEventRows: false, // Maximum number of event rows displayed on a day. Set to false for unlimited.
  // };

  // const dayDimensions = {

  // AllDaySettings ---------
  defaultAllDay: false, // Determines the default value for each Event Object’s allDay property when it is unspecified.
  // defaultAllDayEventDuration: // A fallback duration for all-day Event Objects without a specified end value.
  allDayMaintainDuration: true, // When true, all-day events will maintain their duration when dragged to a timed section
  allDayText: "All Day", //Text to display for all-day events.
  allDayClassNames: (arg) => "", // Class names generator for all-day events.
  allDayContent: (arg) => "", // Content generator for all-day events
  allDayDidMount: (arg) => {}, // Handler invoked when an all-day event is mounted.
  allDayWillUnmount: (arg) => {}, // Handler invoked when an all-day event is about to be unmounted

  // const DateRangeSeparatorOptions = {
  defaultRangeSeparator: " - ", // Default separator between dates in ranges
  titleRangeSeparator: " to ", // Separator in the title

  //  WholeDaySettings
  weekends: true,
  //   hiddenDays: [0, 6], // Hide Sundays and Saturdays // Hidden days of the week
  dayHeaders: true, // Whether the day headers should appear. For the Month, TimeGrid, and DayGrid views.
  //   dayHeaderFormat: { weekday: "short", month: "numeric", day: "numeric", omitCommas: true },
  //   dayMinWidth: 150, // Specified, when the calendar gets narrow enough where day cells can no longer meet their dayMinWidth, horizontal scrollbars will appear.


  // Day-Header Render Hooks ---------
  //   dayHeaderClassNames: (arg) => {
  //     // Return a string or array of class names based on the day header arg
  //     return "my-custom-day-header-class";
  //   },

  dayHeaderContent: (arg) => {
    // Get the day, month, and day of the week from the date object
    const dayOfWeek = arg.date.toLocaleString("en", { weekday: "short" });
    const day = arg.date.toLocaleString("default", { day: "numeric" });
    const month = arg.date.toLocaleString("en", { month: "short" });

    // Return the formatted date with a clock icon
    return (
      <strong>
        {`${dayOfWeek} ${day} ${month}`} <i className="fa fa-clock-o"></i>
      </strong>
    );
  },

  //   dayHeaderWillUnmount: (arg) => {
  //     // Callback when a day header is about to be unmounted
  //     console.log("Day header will unmount:", arg);
  //   },

  //   dayHeaderDidMount: (arg) => {
  //     // Callback when a day header is mounted
  //     console.log("Day header mounted:", arg);
  //   },
  // };


  // DayCellRenderHooks
  dayCellClassNames: (arg) => {
    // Return a string or array of class names based on the day cell arg
    return "my-custom-day-cell-class";
  },

  // Customize the day cells in daygrid and timegrid views with the following options:
  dayCellContent: (arg) => {
    // Return custom JSX or a string for the day cell content
    console.log("dayCellContent: ", arg);
    return <span>{arg.dayNumberText}</span>;
  },

  dayCellDidMount: (arg) => {
    // Callback when a day cell is mounted
    console.log("Day cell mounted:", arg);
  },

  dayCellWillUnmount: (arg) => {
    // Callback when a day cell is about to be unmounted
    console.log("Day cell will unmount:", arg);
  },
};

export { DaySettings };
