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
      filters.location.some((loc: any) =>
        event.acf.location?.some((eLoc: any) => eLoc.value === loc)
      );

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
    const dateMatch =
      !filters.date || (eventStartDate <= endDate && eventEndDate >= startDate);
    // Check if the event is happening today
    const today = new Date();

    const todayMatch =
      !filters.today ||
      isToday(eventStartDate) ||
      (eventStartDate <= today && eventEndDate >= today);

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
        event.acf.location.some(
          (loc: { value: any }) => loc.value === area.toLowerCase()
        )
      );

    console.log(filters.area, seasonalityMatch, areasMatch);

    // const cateringMatch =
    //   filters.catering?.length === 0 ||
    //   filters.catering?.some((cater: any) =>
    //     event.acf.key_facilities.some(
    //       (fac: { value: any }) => fac.value === cater
    //     )
    //   );

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
      areasMatch
      // &&
      // cateringMatch
    );
  });
}

