"use client";
import Image from "next/image";
import XmasMenu from "./XmasMenu";
import fallback from "../../../../assets/images/fallbackimage.png";
import { convertGCSUrl } from "@/app/utils/commanFun";
import { getNextEvent, getEvent } from "@/app/utils/date";
import { useMyContext } from "@/app/Context/MyContext";

// Removed filterUrls function from here

export default function XmasEvent({
  title,
  data,
  nav,
}: {
  title: string;
  data: any;
  nav: string;
}) {
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

        // Extract and filter the image URL
        const headerImageData = item.acf?.header_image_data;
        let imageUrl = fallback.src; // Default image

        if (headerImageData) {
          try {
            const jsonData = JSON.parse(headerImageData);
            const url = jsonData[0]?.url;

            if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
              imageUrl = convertGCSUrl(url);
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
            // Use default image if parsing fails
          }
        }

        // Add `nextEvent` and `imageUrl` to the item
        return { ...item, nextEvent, imageUrl };
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
                  item.imageUrl ? item.imageUrl : fallback.src
                );
              }}
              key={index}
              className="flex flex-col cursor-pointer w-[80px] gap-[8px]"
            >
              <div className="relative w-[80px] rounded-[8px]">
                <Image
                  height={500}
                  width={500}
                  alt=""
                  objectFit="fill"
                  src={item.imageUrl ? item.imageUrl : fallback.src}
                  className="h-[83px] w-full rounded-[8px]"
                />
                <div className="absolute bottom-[4px] left-[4px] w-[30px] text-center bg-white rounded-[4px]">
                  <p className="text-[17px] font-extrabold leading-[1.0]">
                    {nextEvent?.date}
                  </p>
                  <p className="text-[10px] font-bold leading-normal uppercase bg-[#ba2b2b] text-white rounded-b-[4px]">
                    {nextEvent?.month}
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-normal leading-normal overflow-hidden text-ellipsis line-clamp-2">
                {item.acf?.title}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
