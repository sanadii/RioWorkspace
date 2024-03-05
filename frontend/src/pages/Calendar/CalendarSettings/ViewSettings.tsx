import timeGridPlugin from "@fullcalendar/timegrid";

const ViewAPI = {
  // The initial view when the calendar loads.
  initialView: "timeGridWeek",

  //   View Object
  // A View object contains information about a calendar view, such as title and date range. This information about the current view is passed into nearly every handler.
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
  // viewClassNames: (arg) => {
  //   // Example: return a class name based on some condition
  //   if (arg.view.type === "timeGridWeek") {
  //     return "time-grid-week-view";
  //   }
  //   return ""; // or return an array of class names as needed
  // },

  // viewDidMount: (arg) => {
  //   /* code to run on mount */
  // },

  // viewWillUnmount: (arg) => {
  //   /* code to run on unmount */
  // },
};


// Calendar::view
// Access the View Object for the current view.
// This is a property of a Calendar object, not a method. This is useful if you want to get information about the calendar’s title or start/end dates.

// Example Usage:



export { ViewAPI, ViewRenderHooks };
