import { relatedTypes, reservationTypes } from "./data";

export function convertTo12HourTime(time24Hour: any) {
  // Extract hours and minutes from the 24-hour time string
  if (time24Hour) {
    const hours24 = parseInt(time24Hour.substring(0, 2));
    const minutes = time24Hour.substring(2);

    // Convert to 12-hour format
    let hours12 = hours24 % 12 || 12; // Convert 0 or 24 to 12
    const period = hours24 < 12 ? "AM" : "PM";

    // Format the time as HH:MM AM/PM
    const formattedTime = `${hours12}:${minutes} ${period}`;

    return formattedTime;
  }
}

export function isOpen(periods: any) {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0]; // Extracting current date in yyyy-mm-dd format
  const currentTime: any =
    currentDate.getHours() * 100 + currentDate.getMinutes(); // Extracting current time in HHMM format

  for (const period of periods) {
    if (period.open.date === currentDateString) {
      if (parseInt(currentTime) >= parseInt(period.open.time)) {
        return `Open: ${convertTo12HourTime(
          period.open.time
        )} to ${convertTo12HourTime(period.close.time)}`;
      } else {
        return `Close: Opens at ${convertTo12HourTime(period.open.time)}`;
      }
    }
  }
  return "Close";
}

export const relatedTypesFun = (types: any[]) => {
  if (types) {
    return relatedTypes.filter((type) => types.includes(type));
  } else {
    return [];
  }

  // console.log("Elements in relatedTypes but not in types:", elementsInRelatedTypesOnly);
};
export const reservationTypesFun = (types: any[]) => {
  if (types) {
    return reservationTypes.filter((type) => types.includes(type));
  } else {
    return [];
  }

  // console.log("Elements in relatedTypes but not in types:", elementsInRelatedTypesOnly);
};

type EventType = "encode" | "decode";

export function handleEventEncoding(
  type: EventType,
  eventName: string
): string {
  if (type === "encode") {
    // Encode: Convert to lowercase, replace " & " with "-and-", and replace spaces with hyphens, except around "and"
    return eventName
      .toLowerCase()
      .replace(/ & /g, "-and-") // Replace " & " with "-and-"
      .replace(/\s(?!(and|&)\s)/g, "-"); // Replace spaces with hyphens, except if the space is around "and" or "&"
  } else if (type === "decode") {
    // Decode: Replace "-and-" with " & ", replace hyphens with spaces, and capitalize first letter of each word
    const decodedEvent = eventName
      .replace(/-and-/g, " & ") // Replace "-and-" with " & "
      .replace(/-/g, " "); // Replace hyphens with spaces
    return decodedEvent
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(" ");
  } else {
    throw new Error('Invalid type. Must be either "encode" or "decode".');
  }
}

export function formatPhoneNumberForIOS(phoneNumber: string): string {
  // Remove any characters that are not digits or the plus sign
  const formattedNumber = phoneNumber.replace(/[^+\d]/g, "");

  // Ensure the number starts with a '+' for international format
  if (!formattedNumber.startsWith("+") && formattedNumber.length === 10) {
    // If it's a 10-digit number (common in the US), assume country code +1 (US)
    return `+1${formattedNumber}`;
  }

  // Return the formatted number
  return formattedNumber;
}

export const handleCall = (linkNum: string) => {
  window.location.href = `tel:${formatPhoneNumberForIOS(linkNum)}`;
};

export function convertGCSUrl(gcsUrl:string) {
  // Check if the input URL is valid and in the expected format
  const regex = /^https:\/\/storage\.cloud\.google\.com\/(.+)\/(.+)$/;
  const match = gcsUrl.match(regex);

  if (match) {
    // Extract the bucket name and the path to the image
    const bucketName = match[1];
    const imagePath = match[2];

    // Construct the direct access URL
    return `https://storage.googleapis.com/${bucketName}/${imagePath}`;
  } else {
    return gcsUrl;
  }
}
