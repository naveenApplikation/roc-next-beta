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

type Period = {
  close: { date: string; day: number; time: string };
  open: { date: string; day: number; time: string };
};

type ShopStatus = {
  open_now: boolean;
  periods: Period[];
  special_days: { date: string; exceptional_hours: boolean }[];
  weekday_text: string[];
};

const convertTo12HourTimeNew = (time: string): string => {
  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  return `${formattedHours}:${minutes} ${ampm}`;
};

export function getShopStatusMessage(shopStatus: ShopStatus): JSX.Element {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  if (!shopStatus){
    return <></>
  }
  // Check if the shop is currently open based on open_now flag
  if (shopStatus.open_now) {
    // Find the opening period for the current day
    const openingPeriod = shopStatus.periods.find(
      (period) => period.open.day === currentDay
    );
    if (openingPeriod) {
      const closeTime = convertTo12HourTimeNew(openingPeriod.close.time);
      return (
        <div style={{ display: "flex", gap: "5px" }}>
          <p style={{ color: "green" }}>Open</p> : <p>Closes at {closeTime}</p>
        </div>
      );
    }
  } else {
    // Find the next opening period for the current day or the next day if current time is after closing time
    const nextOpeningPeriod = shopStatus.periods.find((period) => {
      const closeTime = parseInt(period.close.time);
      return (
        (period.open.day === currentDay && closeTime > currentTime) ||
        period.open.day > currentDay
      );
    });

    if (nextOpeningPeriod) {
      const openTime = convertTo12HourTimeNew(nextOpeningPeriod.open.time);
      return (
        <div style={{ display: "flex", gap: "5px" }}>
          <p style={{ color: "red" }}>Closed</p> : <p>Opens at {openTime}</p>
        </div>
      );
    }
  }

  // If no appropriate opening period is found, return a default message
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <p style={{ color: "red" }}>Closed</p> : <p>Not available</p>
    </div>
  );
}

export function isOpen(periods: any[]) {
  let value;
  if (periods) {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0]; // Extracting current date in yyyy-mm-dd format
    const currentTime: any =
      currentDate.getHours() * 100 + currentDate.getMinutes(); // Extracting current time in HHMM format
    periods.map((val: any) => {
      if (val.open.date === currentDateString) {
        if (parseInt(currentTime) >= parseInt(val.open.time)) {
          value = (
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "green" }}>Open</p> :{" "}
              <p> Close to {convertTo12HourTime(val.close.time)}</p>
            </div>
          );
        } else {
          value = (
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "red" }}>Closed</p> :{" "}
              <p> Opens at {convertTo12HourTime(val.open.time)}</p>
            </div>
          );
        }
      }
    });
  }
  return value;
}
export function isOpenHead(periods: any[]) {
  let value;
  if (periods) {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0]; // Extracting current date in yyyy-mm-dd format
    const currentTime: any =
      currentDate.getHours() * 100 + currentDate.getMinutes(); // Extracting current time in HHMM format
    periods.map((val: any) => {
      if (val.open.date === currentDateString) {
        if (parseInt(currentTime) >= parseInt(val.open.time)) {
          value = (
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "green" }}>OPEN</p>
            </div>
          );
        } else {
          value = (
            <div style={{ display: "flex", gap: "5px" }}>
              <p style={{ color: "red" }}>CLOSED</p>{" "}
            </div>
          );
        }
      }
    });
  }
  return value;
}
