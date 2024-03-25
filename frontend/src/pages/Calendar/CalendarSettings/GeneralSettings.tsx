import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
const currentDate = new Date();
const startDate = new Date(2019, 9, 1); // September is 8 because months are zero-based
const endDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate() + 1);

const CalendarSettings = {
  // Liscense
  schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",

  // Others
  droppable: true, // DragingAndResizingSettings
  editable: true,
  selectable: true,

  // Time and Local
  timeZone: "Asia/Kuwait", // Set the timezone to Kuwait
  timeZoneParam: "timeZone", // The name of the parameter used to pass the timezone information to the server
    locales: [], // Array of locale objects to be used in the calendar
  locale: "default", // Default locale to be used, e.g., 'en', 'fr'

  //
  // Date Settings
  //
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
const ToolbarSettings = {
  headerToolbar: {
    left: "refresh print hide",
    center: "prev,today,next",
    right: "timeGridDay,timeGridWeek,dayGridMonth",
  },
  buttonText: {
    timeGridDay: "Day",
    timeGridWeek: "Week",
    dayGridMonth: "Month",
  },
  buttonIcons: {
    prev: "fa fa-angle-left",
    next: "fa fa-angle-right",
  },

  footerToolbar: {
    // Define the structure similar to headerToolbar
    // Example: left: "customButton", right: "prev,next"
  },
};

const ThemeSettings = {
  // View
  initialView: "timeGridWeek",

  // Display or Hide
  allDaySlot: false, // Display All Day Slot

  // Header
  // Determines whether to use sticky header dates
  stickyHeaderDates: true,
  // Determines whether to use sticky footer scrollbar
  stickyFooterScrollbar: false,
  // Height of the calendar view
  viewHeight: "auto",

  // Theme and styling
  handleWindowResize: true, // Allows the calendar to automatically resize when the window resizes
  // themeSystem: "bootstrap",
  viewClassNames: "high-contrast", // Need to change this to higher than view

  expandRows: true, // Expands row heights to fill available height
  height: "auto", // Sets the height of the calendar, can be 'auto', a number, or a function
  contentHeight: "auto", // Sets the content height of the calendar
  windowResizeDelay: 100, // Delay in milliseconds before the calendar sizes are adjusted after a window resize
  snapDuration: "00:15:00", // Duration for snapping events and selections

  //   direction: "ltr" as "ltr", // or "ltr" as "ltr" OR "rtl" as "rtl" direction of the Calendar

  //   dayPopoverFormat: "MMMM d, yyyy", // Format for the day popover // Example format: "September 8, 2020"
  //   defaultTimedEventDuration: (arg) => "",
  //   nextDayThreshold: (arg) => "",
};

const EventDurationAndHeaders = {
  eventDataTransform: (data) => data, // Function to transform event data before rendering
  // forceEventDuration: true, // Force events to have an end time

  // Set dayHeaderFormat for specific views
  weekday: "short",
  month: "numeric",
  day: "numeric",
  omitCommas: true,
};

// BusinessHours Settings
const BusinessHours = {
  // Initial date to display on the calendar
  initialDate: new Date(),

  // Function or date for defining "now" on the calendar
  now: new Date(),

  // businessHours: Business hours for the calendar
  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Thursday
    startTime: "10:00", // a start time (10am in this example)
    endTime: "20:00", // an end time (6pm in this example)
  },

  /*
  The main businessHours settings can be applied more granularly to individual resources via the businessHours property
  on the Resource input like so:
*/
  // resources: [
  //   {
  //     id: "a",
  //     title: "Resource A",
  //     businessHours: {
  //       startTime: "10:00",
  //       endTime: "18:00",
  //     },
  //   },
  //   {
  //     id: "b",
  //     title: "Resource B",
  //     businessHours: {
  //       startTime: "11:00",
  //       endTime: "17:00",
  //       daysOfWeek: [1, 3, 5], // Mon,Wed,Fri
  //     },
  //   },
  // ],
};

export { plugins, CalendarSettings, ToolbarSettings, ThemeSettings, EventDurationAndHeaders, BusinessHours };
