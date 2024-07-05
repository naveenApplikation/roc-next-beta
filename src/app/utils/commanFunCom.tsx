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

const convertTo12HourTimeNew = (time: string): string => {
  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  return `${formattedHours}:${minutes} ${ampm}`;
};

type Period = {
  close: {
    date: string;
    day: number;
    time: string;
  };
  open: {
    date: string;
    day: number;
    time: string;
  };
};

type Schedule = {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
};

export function getVenueStatus(
  schedule: Schedule,
  Venue?: string
): JSX.Element {
  if (Venue && Venue == "Grosnez Castle") {
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        <p style={{ color: "green" }}>Open</p>
      </div>
    );
  }
  // Get the current time in Jersey Island (GMT+1)
  const currentDate = new Date();
  const jerseyOffset = 1 * 60; // Jersey is GMT+1
  const localOffset = currentDate.getTimezoneOffset();
  const jerseyTime = new Date(
    currentDate.getTime() + (jerseyOffset + localOffset) * 60000
  );

  const currentDay = jerseyTime.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const currentTime = jerseyTime.getHours() * 100 + jerseyTime.getMinutes(); // HHMM format

  if (!schedule) {
    return <></>;
  }

  // Helper to format time from HHMM to standard time representation
  const formatTime = (time: string): string => {
    const timeInt = parseInt(time, 10);
    const hours = Math.floor(timeInt / 100);
    const minutes = timeInt % 100;
    return `${hours % 12 || 12}:${minutes < 10 ? "0" + minutes : minutes} ${
      hours < 12 ? "AM" : "PM"
    }`;
  };

  // Filter for periods of today, checking for undefined or null
  const todayPeriods: Period[] = schedule.periods.filter(
    (period) => period.open.day === currentDay
  );

  const isNowOpen: boolean = todayPeriods.some(
    (period) =>
      currentTime >= parseInt(period.open.time) &&
      currentTime < parseInt(period.close.time)
  );

  if (isNowOpen) {
    const currentPeriod = todayPeriods.find(
      (period) =>
        currentTime >= parseInt(period.open.time) &&
        currentTime < parseInt(period.close.time)
    );
    if (currentPeriod) {
      return (
        <div style={{ display: "flex", gap: "5px" }}>
          <p style={{ color: "green" }}>Open</p> :{" "}
          <p>Closes at {formatTime(currentPeriod.close.time)}</p>
        </div>
      );
    }
  }

  // Finding the next period assuming periods are sorted by time
  const nextPeriod =
    todayPeriods.find((period) => currentTime < parseInt(period.open.time)) ||
    schedule.periods.find((period) => period.open.day === (currentDay + 1) % 7);

  if (nextPeriod) {
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        <p style={{ color: "red" }}>Closed</p> :{" "}
        <p>Opens at {formatTime(nextPeriod.open.time)}</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <p style={{ color: "red" }}>Closed</p> : <p>No more openings today</p>
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
export function isOpenHead(schedule: Schedule): JSX.Element {
  const currentDate = new Date();
  const jerseyOffset = 1 * 60; // Jersey is GMT+1
  const localOffset = currentDate.getTimezoneOffset();
  const jerseyTime = new Date(
    currentDate.getTime() + (jerseyOffset + localOffset) * 60000
  );

  const currentDay = jerseyTime.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const currentTime = jerseyTime.getHours() * 100 + jerseyTime.getMinutes(); // HHMM format

  if (!schedule) {
    return <></>;
  }

  // Filter for periods of today, checking for undefined or null
  const todayPeriods: Period[] = schedule.periods.filter(
    (period) => period.open.day === currentDay
  );

  const isNowOpen: boolean = todayPeriods.some(
    (period) =>
      currentTime >= parseInt(period.open.time) &&
      currentTime < parseInt(period.close.time)
  );

  if (isNowOpen) {
    const currentPeriod = todayPeriods.find(
      (period) =>
        currentTime >= parseInt(period.open.time) &&
        currentTime < parseInt(period.close.time)
    );
    if (currentPeriod) {
      return (
        <div style={{ display: "flex", gap: "5px" }}>
          <p style={{ color: "green", fontSize: "16px" }}>Open</p>
          {/* <p>Closes at {formatTime(currentPeriod.close.time)}</p> */}
        </div>
      );
    }
  }

  // Finding the next period assuming periods are sorted by time
  const nextPeriod =
    todayPeriods.find((period) => currentTime < parseInt(period.open.time)) ||
    schedule.periods.find((period) => period.open.day === (currentDay + 1) % 7);

  if (nextPeriod) {
    return (
      <div style={{ display: "flex", gap: "5px" }}>
        <p style={{ color: "red", fontSize: "16px" }}>Closed</p> :{" "}
        {/* <p>Opens at {formatTime(nextPeriod.open.time)}</p> */}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <p style={{ color: "red" }}>Closed</p> : <p>No more openings today</p>
    </div>
  );
}
