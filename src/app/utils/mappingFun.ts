import Instance from "./Instance";
import fallback1 from "../../../assets/images/fallbackimage.png";

export const topAttractionMapping = async (data: any) => {
  if (data?.data_type === "google") {
    try {
      const result = await Instance.get(`place/${data?.place_id}`);
      if (result?.status === 200) {
        return result?.data;
      }
    } catch (error) {}
  } else {
    return data;
  }
};

export const handleFilter = (arr: any, name: string) => {
  const newArr = [...arr];
  if (!newArr.length) {
    return [];
  }

  const newData = newArr.filter((val: any) => {
    if (val?.parishName === name) {
      return val;
    }
  });
  return name === "Any" ? arr : newData;
};

// const fallback = "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
const fallback = fallback1;

const filterUrls = (ImageUrlData: any) => {
  const jsonData = JSON.parse(ImageUrlData);

  return jsonData[0]?.url || fallback;
};

export const whatsOnMappingData = (arr: any[]): any[] => {
  return arr.map((val: any) => {
    return {
      type: val?.type,
      title: val?.name || val?.title?.rendered,
      date: val?.acf?.event_dates_start?  getFirstOrLastAvailableEventDate(val?.acf?.event_dates):"" ,
      image:
        val?.data_type === "google"
          ? val?.photoUrl === null
            ? fallback
            : val?.photoUrl
          : filterUrls(val?.acf?.header_image_data),
      data_type: val?.data_type,
      item: val,
    };
  });
};

type Event = {
  date: string;
  start_time: string;
  end_time: string;
};

export const getFirstOrLastAvailableEventDate = (events: Event[]): string | null => {
  // Get the current date in 'YYYYMMDD' format
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0].replace(/-/g, '');

  // Find the first event with a date greater than or equal to today's date
  const futureOrCurrentEvent = events.find(event => event.date >= formattedToday);

  // If a future or current event is found, return the date in 'MM/DD/YYYY' format
  if (futureOrCurrentEvent) {
    const eventDate = futureOrCurrentEvent.date;
    const year = eventDate.substring(0, 4);
    const month = eventDate.substring(4, 6);
    const day = eventDate.substring(6, 8);
    return `${day}/${month}/${year}`;
    }

  // If no future or current event is available, pick the last available past event
  const lastEvent = events[events.length - 1];

  // If there's at least one event, return the last event date in 'MM/DD/YYYY' format
  if (lastEvent) {
    const eventDate = lastEvent.date;
    const year = eventDate.substring(0, 4);
    const month = eventDate.substring(4, 6);
    const day = eventDate.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  // Return null if no events are available
  return "";
};
