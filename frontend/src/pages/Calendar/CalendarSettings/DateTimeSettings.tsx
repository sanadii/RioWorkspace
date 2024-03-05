const currentDate = new Date();
const startDate = new Date(2019, 9, 1); // September is 8 because months are zero-based
const endDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate() + 1);

// Date Range and Alignment
const DateSettings = {
  validRange: { start: startDate, end: endDate }, // Range of dates allowed to be displayed
  nowIndicator: true,

  // eventInteractive: true, // Determines if events are interactive
  // noEventsText: "No events to display", // Text to display when there are no events
  // viewHint: "Click to view", // Hint text for the view
  // navLinkHint: "Click to navigate", // Hint text for navigation links
  // closeHint: "Click to close", // Hint text for the close button
  // timeHint: "Time", // Hint text for the time
  // eventHint: "Event", // Hint text for events
  // moreLinkClick: "popover", // Action when clicking on "more" link
  // moreLinkClassNames: (arg) => "", // Class names generator for "more" link
  // moreLinkContent: (arg) => "", // Content generator for "more" link
  // moreLinkDidMount: (arg) => {}, // Handler invoked when "more" link is mounted
  // moreLinkWillUnmount: (arg) => {}, // Handler invoked when "more" link is about to be unmounted
  // //   monthStartFormat: { weekday: "short", day: "numeric" }, // Format for the start of the month
  // handleCustomRendering: (arg) => {}, // Custom rendering handler
  // customRenderingMetaMap: {}, // Map for custom rendering metadata
  // customRenderingReplaces: false, // Determines if custom rendering replaces default rendering
  //
  //
  //   firstDay: 1, // First day of the week, Default to Sunday, Sunday = 1
  //   dateIncrement: { days: 7 }, // onClick Previous and Next week, default is 7
  //   dateAlignment: "month", // Determines the first visible day of a custom view. options "week", "month"
  //   fixedWeekCount: true, // Determines the number of weeks displayed in a month view (true, false)
  //
  //   dayCount: 9, // Number of days to display //   I dont know
  // Range of dates visible in the current view // Not sure how it works // maybe need to be under the view itself
  //   https://fullcalendar.io/docs/visibleRange
  // visibleRange: {
  //     start: "2020-06-22",
  //     end: "2020-06-25",
  //   },

  //   Not working
  //   views: {
  //     timeGridWeek: {
  //       // name of view
  //       titleFormat: { year: "numeric", month: "2-digit", day: "2-digit" },
  //       // other view-specific options here
  //     },
  //   },
  //   aspectRatio: 1, // Not Working yet
};

const TimeAndLocaleSettings = {
  timeZone: "local", // Set the timezone, e.g., 'UTC', 'local', or a specific timezone like 'America/New_York'
  timeZoneParam: "timeZone", // The name of the parameter used to pass the timezone information to the server
  locales: [], // Array of locale objects to be used in the calendar
  locale: "default", // Default locale to be used, e.g., 'en', 'fr'
};

export { DateSettings, TimeAndLocaleSettings };
