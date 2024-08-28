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
      date: val?.acf?.event_dates_start || "",
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
