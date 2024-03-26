import moment from "moment-timezone";

// Convert a UTC time to a specific timezone
function convertUTCToTimeZone(utcDate, timeZone) {
  return moment(utcDate).tz(timeZone).format();
}

// Convert a specific timezone time to UTC
function convertTimeZoneToUTC(date, timeZone) {
  return moment.tz(date, timeZone).utc().format();
}

const formatTime = (momentDate) => {
  // Ensure momentDate is a moment object
  const momentObj = moment.isMoment(momentDate) ? momentDate : moment(momentDate);
  return momentObj.format("h:mma"); // Formats time in 12-hour format with AM/PM
};

const displayLocalTime = (isoString) => {
  return new Date(isoString).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short",
  });
};

const convertAppointmentTimes = (appointments, timeZone) => {
  return appointments.map((appointment) => {
    const convertedStart = convertUTCToTimeZone(appointment.start, timeZone);
    const convertedEnd = convertUTCToTimeZone(appointment.end, timeZone);
    return {
      ...appointment,
      start: convertedStart,
      end: convertedEnd,
    };
  });
};

// Staff
// Function to find staff name by ID
const findStaffNameById = (staffId, staff) => {
  const staffMember = staff.find((member) => member.id === staffId);
  return staffMember ? staffMember.name : "Unknown";
};
export { convertAppointmentTimes, convertUTCToTimeZone, convertTimeZoneToUTC, formatTime, displayLocalTime, findStaffNameById };
