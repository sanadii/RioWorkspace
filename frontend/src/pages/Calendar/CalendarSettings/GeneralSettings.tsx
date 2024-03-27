import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";

const plugins = [momentTimezonePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
const currentDate = new Date();
const startDate = new Date(2019, 9, 1); // September is 8 because months are zero-based
const endDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate() + 1);

const CalendarSettings = {
  // Liscense
  schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",

  // Calendar Main Functions
  droppable: true, // DragingAndResizingSettings
  editable: true,
  selectable: true,

  // TimeZone and Locales
  timeZone: "Asia/Kuwait",
  timeZoneParam: "timeZone", // The name of the parameter used to pass the timezone information to the server
  locales: [], // Array of locale objects to be used in the calendar
  locale: "default", // Default locale to be used, e.g., 'en', 'fr'

  //
  // Calendar Start and End Date Settings
  //
  validRange: { start: startDate, end: endDate }, // Range of dates allowed to be displayed
  nowIndicator: true,

  //
  // Slot Axis Formate
  //
  slotDuration: "00:15:00", // Duration of each time slot in the calendar view
  slotLabelInterval: "01:00:00", // Interval at which the slot labels are displayed
  slotMinTime: "08:00:00",
  slotMaxTime: "24:00:00",
  scrollTime: "10:00:00",

  // Format for the slot labels, // not working
  slotLabelFormat: function (date) {
    const hour = date.date.hour % 12 || 12; // Ensure hour is in 12-hour format
    const minute = date.date.minute.toString().padStart(2, "0"); // Ensure minute is 2 digits
    const meridiem = date.date.hour < 12 ? "am" : "pm"; // Determine meridiem based on the hour
    return `${hour}:${minute}${meridiem}`;
  },

  // Reset the scroll time to the initial value when the date changes
  //   scrollTimeReset: true,

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

const ThemeSettings = {
  // View
  initialView: "timeGridWeek",
  allDaySlot: false, // Display All Day Slot

  // Header
  // stickyHeaderDates: true, // Determines whether to use sticky header dates
  stickyFooterScrollbar: false, // Determines whether to use sticky footer scrollbar
  viewHeight: "auto", // Height of the calendar view

  // Theme and styling
  handleWindowResize: true, // Allows the calendar to automatically resize when the window resizes
  // themeSystem: "standard",
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

export { plugins, CalendarSettings, ThemeSettings, EventDurationAndHeaders, BusinessHours };
