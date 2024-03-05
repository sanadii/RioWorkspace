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
  dropAccept: (draggable) => {
    // Logic to determine if the draggable should be accepted
    return true;
  },
  eventOrder: "title", // or a function or array
  eventOrderStrict: false,
  longPressDelay: 1000,
  eventDragMinDistance: 5,
};

export default NowIndicatorRenderHooks;
