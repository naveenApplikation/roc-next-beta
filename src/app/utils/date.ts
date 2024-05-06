import moment from "moment";

export function formatDate(timestamp: Date): string {
  return moment(timestamp).format("DD");
}
export function formatFullDate(timestamp: Date): string {
  return moment(timestamp).format("Do MMMM YYYY");
}

export function formatCalenderTime(timestamp: Date): string {
  return moment(timestamp).format("DD/MM/YYYY");
}

export function formatDay(timestamp: Date): string {
  return moment(timestamp).format("dddd");
}

export function formatMonth(timestamp: Date): string {
  return moment(timestamp).format("MMM");
}

export function formatTime(timestamp: Date): string {
  return moment(timestamp).format("LT");
}

export const skeletonItems = new Array(10).fill(null);

export const sideWidth = "480px";

export const categoryCreationDate = () => {
  const date = new Date();
  const day = date.getDate(); // Gets the day as a number (1-31)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()]; // Gets the month name
  const year = date.getFullYear().toString().slice(2); // Gets the last two digits of the year

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
