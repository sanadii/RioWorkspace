// FullCalendarOptions.js

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";

const plugins = [BootstrapTheme, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];

const LicenseOption = {
  schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
};

const ViewOptions = {
  initialView: "timeGridWeek",
  handleWindowResize: true, // Allows the calendar to automatically resize when the window resizes
  themeSystem: "bootstrap",
  //   direction: "ltr" as "ltr", // or "ltr" as "ltr" OR "rtl" as "rtl" direction of the Calendar

  //   More
  expandRows: true, // Expands row heights to fill available height
  height: "auto", // Sets the height of the calendar, can be 'auto', a number, or a function
  contentHeight: "auto", // Sets the content height of the calendar
  windowResizeDelay: 100, // Delay in milliseconds before the calendar sizes are adjusted after a window resize
};

const ToolbarOptions = {
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

const TimeSlotOptions = {
  allDaySlot: false, // Display All Day Slot

  snapDuration: "00:01:00", // Duration for snapping events and selections
  //   dayPopoverFormat: "MMMM d, yyyy", // Format for the day popover // Example format: "September 8, 2020"

  //   defaultTimedEventDuration: (arg) => "",
  //   nextDayThreshold: (arg) => "",
};

const currentDate = new Date();
const startDate = new Date(2019, 9, 1); // September is 8 because months are zero-based
const endDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate() + 1);

// Date Range and Alignment
const dateSettings = {
  validRange: { start: startDate, end: endDate }, // Range of dates allowed to be displayed
  nowIndicator: true,

  eventInteractive: true, // Determines if events are interactive
  //   noEventsText: "No events to display", // Text to display when there are no events
  //   viewHint: "Click to view", // Hint text for the view
  //   navLinkHint: "Click to navigate", // Hint text for navigation links
  //   closeHint: "Click to close", // Hint text for the close button
  //   timeHint: "Time", // Hint text for the time
  //   eventHint: "Event", // Hint text for events
  //   moreLinkClick: "popover", // Action when clicking on "more" link
  //   moreLinkClassNames: (arg) => "", // Class names generator for "more" link
  //   moreLinkContent: (arg) => "", // Content generator for "more" link
  //   moreLinkDidMount: (arg) => {}, // Handler invoked when "more" link is mounted
  //   moreLinkWillUnmount: (arg) => {}, // Handler invoked when "more" link is about to be unmounted
  //   //   monthStartFormat: { weekday: "short", day: "numeric" }, // Format for the start of the month
  //   handleCustomRendering: (arg) => {}, // Custom rendering handler
  //   customRenderingMetaMap: {}, // Map for custom rendering metadata
  //   customRenderingReplaces: false, // Determines if custom rendering replaces default rendering
  //
  //
  //   firstDay: 1, // First day of the week, Default to Sunday, Sunday = 1
  //   dateIncrement: { days: 7 }, // onClick Previous and Next week, default is 7
  //   hiddenDays: [0, 6], // Hide Sundays and Saturdays // Hidden days of the week
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

const EventDurationAndHeaders = {
  forceEventDuration: true, // Force events to have an end time
  dayHeaders: true, // Show day headers in views like timeGrid

  // Set dayHeaderFormat for specific views
  weekday: "short",
  month: "numeric",
  day: "numeric",
  omitCommas: true,
};

// const dayHeaderContent = (arg) => {
//   let classNames = "fc-col-header-cell fc-day";
//   if (arg.isToday) {
//     classNames += " fc-day-today";
//   } else if (arg.isPast) {
//     classNames += " fc-day-past";
//   } else if (arg.isFuture) {
//     classNames += " fc-day-future";
//   } else {
//     classNames += " fc-day-other";
//   }
//   // Add your custom class here
//   classNames += " my-custom-day-header-class";
//   return classNames;
// };

const DayHeaderAndCellCustomization = {
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

  //   dayHeaderClassNames: (arg) => {
  //     // Return a string or array of class names based on the day header arg
  //     return "my-custom-day-header-class";
  //   },

  //   dayHeaderWillUnmount: (arg) => {
  //     // Callback when a day header is about to be unmounted
  //     console.log("Day header will unmount:", arg);
  //   },

  //   dayHeaderDidMount: (arg) => {
  //     // Callback when a day header is mounted
  //     console.log("Day header mounted:", arg);
  //   },

  //   dayCellClassNames: (arg) => {
  //     // Return a string or array of class names based on the day cell arg
  //     return "my-custom-day-cell-class";
  //   },
  //
  //
  //
  //   Customize the day cells in daygrid and timegrid views with the following options:
  //   dayCellContent: (arg) => {
  //     // Return custom JSX or a string for the day cell content
  //     console.log("dayCellContent: ", arg);
  //       return <span>{arg.dayNumberText}</span>;
  //   },

  //   dayCellDidMount: (arg) => {
  //     // Callback when a day cell is mounted
  //     console.log("Day cell mounted:", arg);
  //   },

  //   dayCellWillUnmount: (arg) => {
  //     // Callback when a day cell is about to be unmounted
  //     console.log("Day cell will unmount:", arg);
  //   },
};

// View Render Hooks

// Hooks
// viewClassNames - a ClassName Input for adding classNames to the root view element. called whenever the view changes.
// viewDidMount - called right after the view has been added to the DOM
// viewWillUnmount - called right before the view will be removed from the DOM

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
// view - a View Object
// el - the view’s root HTML element. not available in viewClassNames

const ViewRenderHooks = {
  viewClassNames: (arg) => {
    // Example: return a class name based on some condition
    if (arg.view.type === "timeGridWeek") {
      return "time-grid-week-view";
    }
    return ""; // or return an array of class names as needed
  },

  viewDidMount: (arg) => {
    /* code to run on mount */
  },

  viewWillUnmount: (arg) => {
    /* code to run on unmount */
  },
};

// Now-Indicator Render Hooks
// nowIndicatorClassNames - a ClassName Input
// nowIndicatorContent - a Content Injection Input
// nowIndicatorDidMount
// nowIndicatorWillUnmount

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
// isAxis - boolean
// date - Date object
// el - the element. only available in nowIndicatorDidMount and nowIndicatorWillUnmount

const NowIndicatorRenderHooks = {
  nowIndicator: true,

  //   nowIndicatorClassNames - a ClassName Input
  nowIndicatorClassNames: (arg) => {
    // Custom class names for the now indicator
    return ["custom-now-indicator"];
  },

  //   nowIndicatorContent - a Content Injection Input
  // Indicator the current time in the calendar
  //   nowIndicatorContent: (arg) => {
  //     // Custom content for the now indicator
  //     return `<span>Now</span>`;
  //   },

  // nowIndicatorDidMount: Custom logic when the now indicator mounts
  nowIndicatorDidMount: (arg) => {
    // Custom logic when the now indicator mounts
  },

  // nowIndicatorWillUnmount: // Custom logic before the now indicator unmounts
  nowIndicatorWillUnmount: (arg) => {
    // Custom logic before the now indicator unmounts
  },

  //   Remove the rest
  showNonCurrentDates: true,
  lazyFetching: true,
  startParam: "start",
  endParam: "end",
  dragRevertDuration: 500,
  dragScroll: true,
  unselectAuto: true,
  dropAccept: (draggable) => {
    // Logic to determine if the draggable should be accepted
    return true;
  },
  eventOrder: "title", // or a function or array
  eventOrderStrict: false,
  longPressDelay: 1000,
  eventDragMinDistance: 5,
};

const TimeAndLocaleSettings = {
  timeZone: "local", // Set the timezone, e.g., 'UTC', 'local', or a specific timezone like 'America/New_York'
  timeZoneParam: "timeZone", // The name of the parameter used to pass the timezone information to the server
  locales: [], // Array of locale objects to be used in the calendar
  locale: "default", // Default locale to be used, e.g., 'en', 'fr'
};

const ThemeAndUISettings = {
  themeSystem: "standard", // Theme system to use, e.g., 'standard', 'bootstrap'
};

const InteractionSettings = {
  dragRevertDuration: 500, // Time in milliseconds for an event to revert to its original position after dragging
  dragScroll: true, // Allows the calendar to auto-scroll when an event is dragged to the edge
  eventDragMinDistance: 5, // Minimum distance in pixels an event should be dragged before it is considered a drag
  longPressDelay: 1000, // Time in milliseconds for a touch to be considered a long press
  dropAccept: (draggable) => true, // Function to specify which draggables can be dropped onto the calendar
};

// Event Displaying Settings
const EventDisplaySettings = {
  eventOrder: "title", // Defines the order in which events are displayed, can be a string, array, or function
  eventOrderStrict: false, // When true, events are sorted strictly by the eventOrder setting
  eventResizableFromStart: true, // Determines whether events can be resized from their start
  displayEventTime: true, // Determines whether to display the time of events
  displayEventEnd: true, // Determines whether to display the end time of events

  progressiveEventRendering: true, // Determines whether to use progressive event rendering
};

const WeekNumberSettings = {
  weekends: true,
  weekNumbers: true,
  //   weekNumberFormat: { week: 'numeric' }, // Format for displaying week numbers // NOT WORKING

  weekNumberCalculation: (momentDate) => {
    // Your custom logic to calculate the week number
    // For example, using moment.js to get the week number
    return moment(momentDate).week();
  },

  weekNumberClassNames: (arg) => {
    // Example: return a class based on some condition
    return arg.date.getDay() === 0 ? "sunday-week-number" : "regular-week-number";
  },

  weekNumberContent: (arg) => {
    /* custom content */
  },

  weekNumberDidMount: (arg) => {
    /* code to run on mount */
  },

  weekNumberWillUnmount: (arg) => {
    /* code to run on unmount */
  },
};

// Week Text Settings
const WeekTextSettings = {
  weekText: "Wk", // Short text representation of a week
  weekTextLong: "Week", // Long text representation of a week
};

// Miscellaneous Settings
const MiscellaneousSettings = {
  businessHours: [], // Business hours for the calendar
  initialDate: new Date(), // Initial date to display on the calendar
  now: new Date(), // Function or date for defining "now" on the calendar
  eventDataTransform: (data) => data, // Function to transform event data before rendering
  stickyHeaderDates: false, // Determines whether to use sticky header dates
  stickyFooterScrollbar: false, // Determines whether to use sticky footer scrollbar
  viewHeight: "auto", // Height of the calendar view
  defaultAllDay: false, // Determines whether events should be initially all-day
};

const EventSourceSettings = {
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

  eventBackgroundColor: "#2c3e50", // Background color for events
  eventBorderColor: "#000000", // Border color for events
  eventTextColor: "#000000", // Text color for events
  eventColor: "#000000", // General color for events (can be used as a shorthand for background, border, and text colors)
};

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

  // Custom content for events
  eventContent: (arg) => "",

  // Callback function when an event is mounted
  eventDidMount: (arg) => {},

  // Callback function before an event is unmounted
  eventWillUnmount: (arg) => {},
};

// Select Options
const SelectOptions = {
  // Constraint for selecting time range
  selectConstraint: null,

  // Determines whether the selection can overlap with other events
  selectOverlap: true,

  // Function to determine if a selection is allowed
  selectAllow: () => true,
};

// Drag and Drop Options
const DragAndDropOptions = {
  // Determines whether external elements can be dropped onto the calendar
  droppable: false,

  // Selector for elements that should not trigger unselecting a selection
  unselectCancel: "",
};

// TIME-AXIS SETTINGS
// slotDuration
// slotLabelInterval
// slotLabelFormat
// slotMinTime
// slotMaxTime
// scrollTime
// scrollTimeReset
// Slot Render Hooks
const TimeAxisSettings = {
  slotDuration: "00:15:00", // Duration of each time slot in the calendar view
  slotLabelInterval: "01:00:00", // Interval at which the slot labels are displayed

  // Format for the slot labels, // not working
  slotLabelFormat: function (date) {
    const hour = date.date.hour.toString().padStart(2, "0"); // Ensure hour is 2 digits
    const minute = date.date.minute.toString().padStart(2, "0"); // Ensure minute is 2 digits
    const meridiem = date.date.hour < 12 ? "am" : "pm"; // Determine meridiem based on the hour
    console.log("data:", date);
    return `${hour}:${minute}${meridiem}`;
  },

  slotMinTime: "00:00:00",
  slotMaxTime: "24:00:00",
  scrollTime: "08:00:00", // Scroll time - determines where the scroll position will be at the initial render

  // Reset the scroll time to the initial value when the date changes
  //   scrollTimeReset: true,
};

// Slot Render Hooks
// The horizontal time slots in timegrid view or the vertical datetime slots in timeline view.

// Label Hooks
// Where the date/time text is displayed.
// slotLabelClassNames - a ClassName Input
// slotLabelContent - a Content Injection Input
// slotLabelDidMount
// slotLabelWillUnmount

// Lane Hooks
// The long span of content next to the slot’s date/time text. In timegrid view, this is the horizontal space that passes under all of the days. In timeline view, this is the vertical space that passes through the resources.
// slotLaneClassNames - a ClassName Input
// slotLaneContent - a Content Injection Input
// slotLaneDidMount
// slotLaneWillUnmount

// Argument
// When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
// date - Date object
// text
// isPast
// isFuture
// isToday
// el - the <td> element. only available in slotLabelDidMount, slotLabelWillUnmount, slotLaneDidMount, and slotLaneWillUnmount
// level - only for slot labels, and only for timeline view when slotLabelFormat is specified as an array. Indicates which tier of the header is being rendered. 0 is the topmost.

const SlotRenderHooks = {
  // Slot Label Hooks
  // Class names generator for slot labels
  slotLabelClassNames: (arg) => "",

  // Content generator for slot labels
  slotLabelContent: (arg) => "",

  // Handler invoked when a slot label is mounted
  slotLabelDidMount: (arg) => {},

  // Handler invoked when a slot label is about to be unmounted
  slotLabelWillUnmount: (arg) => {},

  // Slot Lane Hook
  // Class names generator for slot lanes
  slotLaneClassNames: (arg) => "",

  // Content generator for slot lanes
  slotLaneContent: (arg) => "",

  // Handler invoked when a slot lane is mounted
  slotLaneDidMount: (arg) => {},

  // Handler invoked when a slot lane is about to be unmounted
  slotLaneWillUnmount: (arg) => {},
};

const dayEventLimits = {
  dayMaxEvents: 3, // Maximum number of events displayed on a day. Set to false for unlimited
  dayMaxEventRows: false, // Maximum number of event rows displayed on a day. Set to false for unlimited.
};

const dayDimensions = {
  //   dayMinWidth: 150, // Minimum width of a day column
  slotLabelInterval: { minutes: 30 }, // Interval between slot labels
};

const allDaySettings = {
  //   defaultAllDayEventDuration: (arg) => "",
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

// Higher-order function to create full calendar options
const createFullCalendarOptions = (customButtons) => ({
  plugins,
  ...LicenseOption,
  ...ViewOptions,
  ...ToolbarOptions,
  customButtons, // Spread custom buttons here

  ...TimeSlotOptions,
  ...dateSettings,

  //   ...EventDurationAndHeaders,
  ...DayHeaderAndCellCustomization,
  //   ...dayHeaderContent,
  ...ViewRenderHooks,
  //   ...EventRenderHooks,
  ...NowIndicatorRenderHooks,

  //   ...TimeAndLocaleSettings,
  //   ...ThemeAndUISettings,
  //   ...InteractionSettings,
  //   ...WeekNumberSettings,

  //   ...WeekTextSettings,
  //   ...MiscellaneousSettings,
  //   ...EventSourceSettings,

  //   ...SelectOptions,
  //   ...DragAndDropOptions,
  ...TimeAxisSettings,
  //   ...SlotRenderHooks,

  //   ...dayEventLimits,
  //   ...dayDimensions,
  //   ...allDaySettings,

  ...DateRangeSeparatorOptions,
});

export default createFullCalendarOptions;
