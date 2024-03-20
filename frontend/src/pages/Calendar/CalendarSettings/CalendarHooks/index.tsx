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

export { formatTime, displayLocalTime };
