function parseStateDateRange(dateRange: any) {
  if (!dateRange) {
    console.log("no filters");
    return { startDate: new Date(0), endDate: new Date(0) };
  }
  const [start, end] = dateRange.split("-");
  const startDate = new Date(start);
  const endDate = new Date(end);
  return { startDate, endDate };
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
function isToday(date: any) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
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
          console.log(event.acf.parish.label);
          console.log(
            event.acf.parish.label.includes(loc.replace("Saint", ""))
          );
          return event.acf.parish.label.includes(loc.replace("Saint", ""));
        }
        return false;
      });

    // Check if the event is free
    const freeMatch =
      filters.free.length === 0 ||
      (filters.free.includes("free-entry") &&
        event.acf.booking_information?.some(
          (b: any) => b.value === "free-entry"
        ));

    // Check booking information
    const bookingMatch =
      filters.booking.length === 0 ||
      filters.booking.some((book: any) =>
        event.acf.booking_information?.some(
          (eBook: any) => eBook.value === book
        )
      );

    // Check date
    const eventStartDate = new Date(event.acf.event_dates_start);
    const eventEndDate = new Date(event.acf.event_dates_end);
    // const dateMatch =
    //   !filters.date || (eventStartDate <= endDate && eventEndDate >= startDate);
    // Check if the event is happening today
    const today = new Date();
    const dateMatch =
      !filters.date ||
      event.acf.event_dates.some((dateObj: any, index: any) => {
        const eventDate = new Date(
          dateObj.date.slice(0, 4),
          dateObj.date.slice(4, 6) - 1,
          dateObj.date.slice(6, 8)
        );
        if (eventDate >= startDate && eventDate <= endDate) {
          event.acf.event_dates = [
            event.acf.event_dates[index],
            ...event.acf.event_dates.slice(0, index),
            ...event.acf.event_dates.slice(
              index + 1,
              event.acf.event_dates.length
            ),
          ];
        }
        return eventDate >= startDate && eventDate <= endDate;
      });
    const todayMatch =
      !filters.today ||
      event.acf.event_dates.some((dateObj: any, index: any) => {
        const eventDate = new Date(
          dateObj.date.slice(0, 4),
          dateObj.date.slice(4, 6) - 1,
          dateObj.date.slice(6, 8)
        );

        console.log(filters.today);
        if (isToday(eventDate)) {
          event.acf.event_dates = [
            event.acf.event_dates[index],
            ...event.acf.event_dates.slice(0, index),
            ...event.acf.event_dates.slice(
              index + 1,
              event.acf.event_dates.length
            ),
          ];
        }
        return isToday(eventDate);
      });
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

    console.log(filters.area, seasonalityMatch, areasMatch);

    const cateringMatch =
      !filters.catering ||
      event.acf.key_facilities?.some(
        (acc: { value: string }) => acc.value === "catering"
      );

    // Return true if any of the values match the filter
    console.log(locationMatch);
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
