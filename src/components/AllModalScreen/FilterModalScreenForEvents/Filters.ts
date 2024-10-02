export function parseStateDateRange(dateRange: any) {
  if (!dateRange) {
    return { startDate: new Date(0), endDate: new Date(0) };
  }
  const [start, end] = dateRange.split("-");
  const startDate = new Date(start);
  const endDate = new Date(end);
  return { startDate, endDate };
}
export function parseDateRange(dateRange) {
  // Split the string on " - " to get the two date parts
  const dates = dateRange.split(' - ');

  // Function to parse a single date string into YYYY-MM-DD format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format both dates and join with '%20-%20'
  const formattedStartDate = formatDate(dates[0]);
  const formattedEndDate = formatDate(dates[1]);
  
  return `${formattedStartDate}%20-%20${formattedEndDate}`;
}

function isTimeWithinRange(startTime: any, endTime: any, currentTime: any) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);
  return currentTime >= start && currentTime <= end;
}
function isToday(eventDate: any) {
  let date = new Date(
    eventDate.toString().slice(0, 4),
    eventDate.toString().slice(4, 6) - 1,
    eventDate.toString().slice(6, 8)
  );
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function parseDate(selectedDate: any) {
  const eventDate = new Date(
    selectedDate.toString().slice(0, 4),
    selectedDate.toString().slice(4, 6) - 1,
    selectedDate.toString().slice(6, 8)
  );

  return eventDate;
}

export function filterEvents(events: any, filters: any) {
  const { startDate, endDate } = parseStateDateRange(filters.date);
  return events.filter((event: any) => {
    // Check location
    const locationMatch =
      filters.location.length === 0 ||
      filters.location.includes("Any") ||
      filters.location.some((loc: any) => {
        if (typeof event.acf.parish === "string") {
          return false;
        } else if (event.acf.parish && event.acf.parish.label) {
          return event.acf.parish.label.includes(loc.replace("Saint", ""));
        }
        return false;
      });

    // Check if the event is free
    const freeMatch =
      filters.free.length === 0 ||
      filters.free.some((free: any) =>
        event.acf.booking_information?.some(
          (b: any) => b.label.toLowerCase() === free.toLowerCase()
        )
      );

    // Check booking information
    const bookingMatch =
      filters.booking.length === 0 ||
      filters.booking.some((book: any) =>
        event.acf.booking_information?.some((eBook: any) =>
          eBook.value.includes(book)
        )
      );

    // Check date

    // const dateMatch =
    //   !filters.date || (eventStartDate <= endDate && eventEndDate >= startDate);
    // Check if the event is happening today
    const today = new Date();
    const dateMatch =
      !filters.date ||
      (parseDate(event.acf?.event_date) >= startDate &&
        parseDate(event.acf?.event_date) <= endDate);

    const todayMatch =
      !filters.today ||
      (event.acf.event_date && isToday(event.acf?.event_date));
    // Check key facilities
    const familyFriendlyMatch =
      !filters.family_friendly ||
      event.acf.key_facilities?.some(
        (fac: { value: string }) => fac.value === "family-friendly"
      );
    const couplesMatch =
      !filters.couples ||
      event.acf.key_facilities?.some(
        (fac: { value: string }) => fac.value === "couples"
      );
    const indoorMatch =
      !filters.indoor ||
      event.acf.key_facilities?.some(
        (fac: { value: string }) => fac.value === "indoor"
      );
    const outdoorMatch =
      !filters.outdoor ||
      event.acf.key_facilities?.some(
        (fac: { value: string }) => fac.value === "outdoor"
      );
    const wheelchairAccessMatch =
      !filters.wheelchair_access ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "wheelchair-access"
      );
    const hearingLoopMatch =
      !filters.hearing_loop ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "hearing-loop"
      );
    const petFriendlyMatch =
      !filters.pet_friendly ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "pet-friendly"
      );

    const parkingMatch =
      !filters.parking ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "parking"
      );
    const seasonalityMatch =
      filters.seasonality.length === 0 ||
      filters.seasonality?.some((season: any) =>
        event.acf.seasonality?.some(
          (eSeason: { value: any }) => eSeason.value === season.toLowerCase()
        )
      );
    const areasMatch =
      filters.area?.length === 0 ||
      filters.area?.some((area: any) =>
        event.acf.location?.some(
          (loc: { value: any }) => loc.value === area.toLowerCase()
        )
      );

    const cateringMatch =
      !filters.catering ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "catering"
      );

    // Return true if any of the values match the filter

    return (
      locationMatch &&
      freeMatch &&
      bookingMatch &&
      dateMatch &&
      familyFriendlyMatch &&
      couplesMatch &&
      indoorMatch &&
      outdoorMatch &&
      wheelchairAccessMatch &&
      hearingLoopMatch &&
      petFriendlyMatch &&
      todayMatch &&
      parkingMatch &&
      seasonalityMatch &&
      areasMatch &&
      cateringMatch
    );
  });
}
