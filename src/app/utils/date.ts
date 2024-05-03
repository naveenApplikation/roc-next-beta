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

export const sideWidth = "480px"