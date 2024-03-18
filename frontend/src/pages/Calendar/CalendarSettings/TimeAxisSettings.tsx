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
    const hour = date.date.hour % 12 || 12; // Ensure hour is in 12-hour format
    const minute = date.date.minute.toString().padStart(2, "0"); // Ensure minute is 2 digits
    const meridiem = date.date.hour < 12 ? "am" : "pm"; // Determine meridiem based on the hour
    return `${hour}:${minute}${meridiem}`;
  },

  slotMinTime: "08:00:00",
  slotMaxTime: "24:00:00",
  scrollTime: "10:00:00",

  // Reset the scroll time to the initial value when the date changes
  //   scrollTimeReset: true,

};

export default TimeAxisSettings;
