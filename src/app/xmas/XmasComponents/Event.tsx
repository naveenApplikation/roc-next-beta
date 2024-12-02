"use client";
import Image from "next/image";
import {
  dining,
  drinks,
  EventImage,
  hearts,
  smily,
  XmasBgImage,
} from "../utils/XmasImagePath";
import XmasMenu from "./XmasMenu";
import fallback from "../../../../assets/images/fallbackimage.png";
import { convertGCSUrl } from "@/app/utils/commanFun";
import {
  formatMonth,
  formatDate,
  getNextEvent,
  getEvent,
} from "@/app/utils/date";
import { useMyContext } from "@/app/Context/MyContext";

const filterUrls = (ImageUrlData: any) => {
  const imageUrls: string[] = [];
  ImageUrlData?.forEach((item: any) => {
    if (item) {
      try {
        const jsonData = JSON.parse(item);
        const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

        if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
          imageUrls.push(convertGCSUrl(url));
        } else {
          imageUrls.push(fallback.src); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(fallback.src); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(fallback.src); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};
export default function XmasEvent({
  title,
  data,
  nav,
}: {
  title: string;
  data: any;
  nav: string;
}) {
  const ImageUrlData = data.map((item: any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  const { modalClick } = useMyContext();
  const sortEventsByDate = (data = []) => {
    return data
      .map((item: any) => {
        let nextEvent;
        if (item?.acf?.event_date) {
          nextEvent = getEvent(item.acf.event_date);
        } else {
          nextEvent = getNextEvent(item.acf?.event_dates);
        }

        // Add `nextEvent` to the item for sorting purposes
        return { ...item, nextEvent };
      })
      .filter((item) => item.nextEvent) // Filter out items without `nextEvent`
      .sort((a, b) => {
        const dateA = parseInt(a.nextEvent.date, 10); // Convert `date` to a number
        const dateB = parseInt(b.nextEvent.date, 10);
        return dateA - dateB; // Sort in ascending order
      });
  };
  const sortedData = sortEventsByDate(data);
  return (
    <>
      <XmasMenu link={nav}>{title}</XmasMenu>
      <div className="flex gap-[8px] min-h-max overflow-y-hidden no-scrollbar">
        {(sortedData || []).map((item, index) => {
          const nextEvent = item.nextEvent;

          if (!nextEvent) {
            return null;
          }
          return (
            <div
              onClick={() => {
                modalClick(
                  "eventListing",
                  item,
                  filteredUrls[index] ? filteredUrls[index] : fallback
                );
              }}
              key={index}
              className="flex flex-col  cursor-pointer w-[80px] gap-[8px]"
            >
              <div className="relative w-[80px]   rounded-[8px]">
                <Image
                  height={500}
                  width={500}
                  alt=""
                  objectFit="fill"
                  src={filteredUrls[index] ? filteredUrls[index] : fallback}
                  className="h-[83px] w-full rounded-[8px]"
                />
                <div className="absolute bottom-[4px] left-[4px] w-[30px] text-center bg-white rounded-[4px]">
                  <p className="text-[17px] font-extrabold leading-[1.0]">
                    {" "}
                    {nextEvent?.date}
                  </p>
                  <p className="text-[10px] font-bold leading-normal uppercase bg-[#ba2b2b] text-white rounded-b-[4px]">
                    {nextEvent?.month}
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-normal  leading-normal overflow-hidden  text-ellipsis line-clamp-2">
                {item.acf?.title}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
