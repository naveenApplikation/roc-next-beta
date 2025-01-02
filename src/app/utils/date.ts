import moment from "moment";

// Formatting functions
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

// Helper to get the formatted category creation date

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

// Skeleton items and side width constants
export const skeletonItems = new Array(10).fill(null);
export const sideWidth = "480px";

// Event type and Result type
type Event = {
  date: string; // Date in YYYYMMDD format
  start_time: string; // Start time
  end_time: string; // End time
};

type Result = {
  date: string; // Formatted date (DD)
  month: string; // Formatted month (MMM)
  year: string; // Formatted year (YYYY)
};

// Function to get the next event
export function getNextEvent(events: Event[]): Result | null {
  const currentDate = moment();

  // Filter events that are today or in the future
  const upcomingEvents = events
    .map((event) => ({
      ...event,
      momentDate: moment(event.date, "YYYYMMDD"),
    }))
    .filter((event) => event.momentDate.isSameOrAfter(currentDate, "day"));

  if (upcomingEvents.length === 0) {
    return null; // No upcoming events
  }

  // Sort the events by date to get the earliest upcoming event
  upcomingEvents.sort(
    (a, b) => a.momentDate.valueOf() - b.momentDate.valueOf()
  );

  // Choose the event: either today or the next upcoming one
  const chosenEvent = upcomingEvents[0];

  return {
    date: chosenEvent.momentDate.format("DD"),
    month: chosenEvent.momentDate.format("MMM"),
    year: chosenEvent.momentDate.format("YYYY"), // Include year
  };
}

// Function to get formatted result from a timestamp
export function getEvent(timestamp: Date): Result | null {
  return {
    date: formatDate(timestamp),
    month: formatMonth(timestamp),
    year: moment(timestamp).format("YYYY"), // Include year
  };
}
