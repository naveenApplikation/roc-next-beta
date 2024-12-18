"use client";
import Image from "next/image";
import XmasMenu from "./XmasMenu";
import fallback from "../../../../assets/images/fallbackimage.png";
import { convertGCSUrl } from "@/app/utils/commanFun";
import { getNextEvent, getEvent } from "@/app/utils/date";
import { useMyContext } from "@/app/Context/MyContext";
import moment from "moment";

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
        let event_date;
        if (item?.acf?.event_date) {
          nextEvent = getEvent(item.acf.event_date); // Single event, use getEvent
        } else {
          nextEvent = getNextEvent(item.acf?.event_dates);
           // Multiple events, use getNextEvent
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
        return { ...item, nextEvent,imageUrl};
      })
      .filter((item) => item.nextEvent) // Filter out items without `nextEvent`
      .sort((a, b) => {
        // Parse and format the date for both events: consider year, month, and day
        const dateA = moment(`${a.nextEvent.year}-${a.nextEvent.month}-${a.nextEvent.date}`, "YYYY-MMM-DD");
        const dateB = moment(`${b.nextEvent.year}-${b.nextEvent.month}-${b.nextEvent.date}`, "YYYY-MMM-DD");
     
        // Compare the events by date (year, month, and day)
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;
        return 0; // If both are equal, return 0
      });
  };
  


  const sortedData = sortEventsByDate(data);
  const mapEventData=sortedData.map((item:any)=>{
       if(item.nextEvent)
       {
        const formattedDate = convertToDateString(item.nextEvent);
        item.acf.event_date=formattedDate
        return item;
       }
        return item;
  })

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


const convertToDateString = (dateObj: { date: string, month: string, year: string }): string => {
  // Map month abbreviations to their corresponding month numbers
  const monthMap: { [key: string]: string } = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  };

  // Get the numeric month from the abbreviation
  const monthNumber = monthMap[dateObj.month];

  // Ensure the day is two digits (e.g., '18' remains '18', '5' becomes '05')
  const formattedDay = dateObj.date.padStart(2, '0');

  // Construct and return the date string in YYYYMMDD format
  return `${dateObj.year}${monthNumber}${formattedDay}`;
};

