 

import React from "react";
import Image from "next/image";
import { formatMonth, formatDate } from "@/app/utils/date";
import fallback from "../../../assets/images/fallbackimage.png";
import { convertGCSUrl } from "@/app/utils/commanFun";
import { OpenModal, UpcomingMenu } from "./Menu";

interface DashboardProps {
  data?: any;
}

 
 
 

const FamilyEvent: React.FC<DashboardProps> = ({ data }) => {
  

  const ImageUrlData = data.map((item: any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);
 
  
  
  
   
  return (
    <>
      <UpcomingMenu {...{data}}></UpcomingMenu>
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        { data.slice(0, 10).map((item: any, index: any) => {
              return (
                <OpenModal key={index} url={filteredUrls[index]} {...{item}}>
                <div
                  className="flex w-[80px] flex-col gap-[8px] "
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex flex-col relative">
                    <Image
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      alt=""
                      width={500}
                      height={80}
                      className="rounded-[4px] max-w-full h-[80px] object-cover"
                    
                      priority
                      
                    />
                    <div className="absolute bottom-[4px] left-[4px] text-center bg-white rounded-[4px]">
                      <p className="text-[17px] font-extrabold leading-normal w-[30px]">
                        {formatDate(item.acf.event_dates[0].date)}
                      </p>
                      <p className="text-[10px] font-bold leading-normal uppercase bg-[#ba2b2b] text-white w-[30px] rounded-b-[4px]">
                        {formatMonth(item.acf.event_dates[0].date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] font-normal leading-normal w-full overflow-hidden text-ellipsis line-clamp-3">
                    {item.acf.title}
                  </p>
                </div>
                </OpenModal>
              );
            })}
      </div>
    </>
  );
};

export default FamilyEvent;

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
          imageUrls.push(
            fallback.src
          ); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(
          fallback.src          ); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(
        fallback.src        ); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};