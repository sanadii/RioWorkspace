import moment from 'moment-timezone';

// Convert a UTC time to a specific timezone
const convertUTCToTimeZone = (utcDate, timeZone) => {
  return moment(utcDate).tz(timeZone).format();
};

// Convert a specific timezone time to UTC
const convertTimeZoneToUTC = (date, timeZone) => {
  return moment.tz(date, timeZone).utc().format();
};


const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
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
  return appointments.map(appointment => {
    const convertedStart = convertUTCToTimeZone(appointment.start, timeZone);
    const convertedEnd = convertUTCToTimeZone(appointment.end, timeZone);
    return {
      ...appointment,
      start: convertedStart,
      end: convertedEnd
    };
  });
};




export { convertAppointmentTimes, convertUTCToTimeZone, convertTimeZoneToUTC, formatTime, displayLocalTime };
