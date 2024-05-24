interface FilterValues {
    openingHours?: boolean;
    rating?: string;
    distance?: string;
  }
  interface Location {
    latitude?: string;
    longitude?: string;
  }
 export function buildFilterUrl(
    place: string,
    filterValues: FilterValues,
    location: Location
  ): string {
    const { openingHours, rating, distance } = filterValues;
    let url = `/filter/places?place=${place}`;
    if (openingHours) {
      url += `&openNow=${openingHours}`;
    }
    if (rating && rating.trim() !== '') {
      url += `&rating=${rating}`;
    }
    if (
      distance &&
      distance.trim() !== '' &&
      location.latitude &&
      location.latitude.trim() !== '' &&
      location.longitude &&
      location.longitude.trim() !== ''
    ) {
      url += `&distance=${distance}`;
      url += `&latitude=${location.latitude}`;
      url += `&longitude=${location.longitude}`;
    }
    return url;
  }