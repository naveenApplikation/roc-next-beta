import { relatedTypes, reservationTypes } from "./data";

export function convertTo12HourTime(time24Hour: any) {
  // Extract hours and minutes from the 24-hour time string
  if (time24Hour) {
    const hours24 = parseInt(time24Hour.substring(0, 2));
    const minutes = time24Hour.substring(2);

    // Convert to 12-hour format
    let hours12 = hours24 % 12 || 12; // Convert 0 or 24 to 12
    const period = hours24 < 12 ? 'AM' : 'PM';

    // Format the time as HH:MM AM/PM
    const formattedTime = `${hours12}:${minutes} ${period}`;

    return formattedTime;
  }
}

export function isOpen(periods: any) {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0]; // Extracting current date in yyyy-mm-dd format
  const currentTime: any = currentDate.getHours() * 100 + currentDate.getMinutes(); // Extracting current time in HHMM format

  for (const period of periods) {
    if (period.open.date === currentDateString) {
      if (parseInt(currentTime) >= parseInt(period.open.time)) {
        return `Open: ${convertTo12HourTime(period.open.time)} to ${convertTo12HourTime(period.close.time)}`;
      } else {
        return `Closed: Opens at ${convertTo12HourTime(period.open.time)}`;
      }
    }
  }
  return "Closed";
}


export const relatedTypesFun = (types: any[])=>{
  
  return relatedTypes.filter(type => types.includes(type));
  
  // console.log("Elements in relatedTypes but not in types:", elementsInRelatedTypesOnly);
}
export const reservationTypesFun = (types: any[])=>{
  
  return reservationTypes.filter(type => types.includes(type));
  
  // console.log("Elements in relatedTypes but not in types:", elementsInRelatedTypesOnly);
}
