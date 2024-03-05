const dayEventLimits = {
  dayMaxEvents: 3, // Maximum number of events displayed on a day. Set to false for unlimited
  dayMaxEventRows: false, // Maximum number of event rows displayed on a day. Set to false for unlimited.
};

const dayDimensions = {
  slotLabelInterval: { minutes: 30 }, // Interval between slot labels
};

const AllDaySettings = {
  defaultAllDay: false, // Determines the default value for each Event Object’s allDay property when it is unspecified.
  // defaultAllDayEventDuration: // A fallback duration for all-day Event Objects without a specified end value.
  allDayMaintainDuration: true, // When true, all-day events will maintain their duration when dragged to a timed section
  allDayText: "All Day", //Text to display for all-day events.
  allDayClassNames: (arg) => "", // Class names generator for all-day events.
  allDayContent: (arg) => "", // Content generator for all-day events
  allDayDidMount: (arg) => {}, // Handler invoked when an all-day event is mounted.
  allDayWillUnmount: (arg) => {}, // Handler invoked when an all-day event is about to be unmounted
};

const DateRangeSeparatorOptions = {
  defaultRangeSeparator: " - ", // Default separator between dates in ranges
  titleRangeSeparator: " to ", // Separator in the title
};

const WholeDaySettings = {
  weekends: true,
  //   hiddenDays: [0, 6], // Hide Sundays and Saturdays // Hidden days of the week
  dayHeaders: true, // Whether the day headers should appear. For the Month, TimeGrid, and DayGrid views.
  //   dayHeaderFormat: { weekday: "short", month: "numeric", day: "numeric", omitCommas: true },
  //   dayMinWidth: 150, // Specified, when the calendar gets narrow enough where day cells can no longer meet their dayMinWidth, horizontal scrollbars will appear.
};

// Day-Header Render Hooks
// Customize the header elements above the day cells in daygrid and timegrid views with the following options. Also, the title elements for each day in list view. For the timeline view, see the slot render hooks.
// dayHeaderClassNames - a ClassName Input for adding classNames to the header <th> cell
// dayHeaderContent - a Content Injection Input. Generated content is inserted inside the inner-most wrapper of the header cell. It does not replace the <th> cell.
// dayHeaderDidMount - called right after the <th> has been added to the DOM
// dayHeaderWillUnmount - called right before the <th> will be removed from the DOM

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:

// date - Date object
// text
// isPast
// isFuture
// isToday
// isOther
// resource - if the date column lives under a specific resource in vertical resource view, this value will be the Resource Object
// el - the <th> element. only available in dayHeaderDidMount and dayHeaderWillUnmount

const DayHeaderRenderHooks = {
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
};


// Customize the day cells in daygrid and timegrid views with the following options:
// dayCellClassNames - a ClassName Input for adding classNames to the <td> cell
// dayCellContent - a Content Injection Input. Generated content is inserted inside the inner-most wrapper of the day cell. It does not replace the <td> cell.
// dayCellDidMount - called right after the <td> has been added to the DOM
// dayCellWillUnmount - called right before the <td> will be removed from the DOM

// Timeline View
// For customizing the day cells in Timeline view, use the Slot Render Hooks instead. From an API-perspective they are considered “slots,” not “days,” because they can be any duration.

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
// date - Date object
// dayNumberText
// isPast
// isFuture
// isToday
// isOther
// resource - if the date cell lives under a specific resource in vertical resource view, this value will be the Resource Object
// el - the <td> element. only available in dayCellDidMount and dayCellWillUnmount

const DayCellRenderHooks = {
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

export {
  dayEventLimits,
  dayDimensions,
  AllDaySettings,
  WholeDaySettings,
  DayHeaderRenderHooks,
  DayCellRenderHooks,
  DateRangeSeparatorOptions,
};
