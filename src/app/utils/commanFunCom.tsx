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

export function isOpen(periods: any[]) {
  let value
  if(periods){
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0]; // Extracting current date in yyyy-mm-dd format
    const currentTime: any = currentDate.getHours() * 100 + currentDate.getMinutes(); // Extracting current time in HHMM format
    periods.map((val: any)=>{
      if (val.open.date === currentDateString) {
        if (parseInt(currentTime) >= parseInt(val.open.time)) {
           value = <div style={{display:'flex', gap:'5px'}} ><p style={{color: "green"}}>Open</p> : <p> Close to {convertTo12HourTime(val.close.time)}</p></div>;
        } else {
          value = <div style={{display:'flex', gap:'5px'}}><p style={{color: "red"}}>Closed</p> : <p> Opens at {convertTo12HourTime(val.open.time)}</p></div>;
        }
      }
    })

  }
  return value

}