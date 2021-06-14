/* $Id$ */
let n = 0;
export function generateTaskId() {
  return ++n;
}

export function getFormattedDateTime(date) {
  const dateString = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const timeString = date.toLocaleTimeString(undefined, {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  return dateString + " " + timeString;
}
