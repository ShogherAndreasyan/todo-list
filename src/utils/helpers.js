import moment from 'moment';
export function formatDate(date) {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  } else if (typeof date === "string") {
    return date.slice(0, 10);
  } else if (!date) {
    return "";
  } else {
    return moment(date).format("YYYY-MM-DD");
  }
}

export function truncateText(text = "", maxLength = 30) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
