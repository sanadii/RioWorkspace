import timeGridPlugin from "@fullcalendar/timegrid";

function formatTime(timeString) {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const hoursInt = parseInt(hours, 10);
  const ampm = hoursInt >= 12 ? "pm" : "am";
  const formattedHours = ((hoursInt + 11) % 12) + 1; // Convert 24h to 12h format
  return `${formattedHours}:${minutes} ${ampm}`;
}

const viewOptions = {
  //  1) View API
  // The initial view when the calendar loads.
  initialView: "timeGridWeek",

  dateSet: () => {
    // Select all the relevant <td> elements
    const timeSlots = document.querySelectorAll(".fc-timegrid-slot.fc-timegrid-slot-lane");

    // Iterate over each <td> element
    timeSlots.forEach((slot) => {
      // Check if the slot already contains the 'fc-slot-times' div
      if (!slot.querySelector(".fc-slot-times")) {
        // Extract the time from the data-time attribute
        const time = slot.getAttribute("data-time");
        const formattedTime = formatTime(time);

        // Create the div structure to be inserted
        const div = document.createElement("div");
        div.className = "fc-slot-times";
        div.style.position = "relative";

        // Add multiple divs inside the main div
        for (let i = 0; i < 7; i++) {
          const innerDiv = document.createElement("div");
          innerDiv.className = "fc-slot-time";

          const span = document.createElement("span");
          span.className = "fc-slot-time-inner";

          // Add time content only if it's a major time slot
          if (!slot.classList.contains("fc-timegrid-slot-minor")) {
            span.textContent = formattedTime + " "; // Set the time as content
          }

          innerDiv.appendChild(span);
          div.appendChild(innerDiv);
        }

        // Append the created div structure to the <td> element
        slot.appendChild(div);
      }
    });
  },

  // 2) View Render Hooks

  // Hooks
  // viewClassNames - a ClassName Input for adding classNames to the root view element. called whenever the view changes.
  // viewDidMount - called right after the view has been added to the DOM
  // viewWillUnmount - called right before the view will be removed from the DOM

  // Argument
  // When the above hooks are specified as a function in the form function(arg), the arg is an object with the following properties:
  // view - a View Object
  // el - the view’s root HTML element. not available in viewClassNames

  //   View Object
  // A View object contains information about a calendar view, such as title and date range. This information about the current view is passed into nearly every handler.

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

export { viewOptions };
