// Slot Render Hooks

function formatTime(timeString) {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const hoursInt = parseInt(hours, 10);
  const ampm = hoursInt >= 12 ? "pm" : "am";
  const formattedHours = ((hoursInt + 11) % 12) + 1; // Convert 24h to 12h format
  return `${formattedHours}:${minutes} ${ampm}`;
}

const SlotRenderHooks = {
  // // Slot Label Hooks
  // // Class names generator for slot labels
  // slotLabelClassNames: (arg) => "",

  // // Content generator for slot labels
  // // slotLabelContent: (arg) => "",

  // // Handler invoked when a slot label is mounted
  // slotLabelDidMount: (arg) => {},

  // // Handler invoked when a slot label is about to be unmounted
  // slotLabelWillUnmount: (arg) => {},

  // // Slot Lane Hook
  // // Class names generator for slot lanes
  // slotLaneClassNames: (arg) => "",

  // // Content generator for slot lanes
  // slotLaneContent: (arg) => "",

  // Handler invoked when a slot lane is mounted
  slotLaneDidMount: (arg) => {
    const timeSlots = document.querySelectorAll(".fc-timegrid-slot.fc-timegrid-slot-lane");
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

          // Set text content only if it's not a minor slot
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

  // // Handler invoked when a slot lane is about to be unmounted
  // slotLaneWillUnmount: (arg) => {},
};

export default SlotRenderHooks;
