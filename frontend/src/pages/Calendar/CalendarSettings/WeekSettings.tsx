import moment from "moment";

const WeekNumberSettings = {
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

export { WeekNumberSettings, WeekTextSettings };
