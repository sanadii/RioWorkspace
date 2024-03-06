const LicenseOption = {
  schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
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
  // themeSystem: "standard",
  viewClassNames: 'high-contrast', // Need to change this to higher than view

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

export { LicenseOption, ToolbarSettings, ThemeSettings, EventDurationAndHeaders, BusinessHours };
