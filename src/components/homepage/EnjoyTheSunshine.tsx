"use client"

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import { useMyContext } from "@/app/Context/MyContext";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from "@/app/utils/date";
import Image from "next/image";
import fallback from '../../../assets/images/fallbackimage.png'

interface DashboardProps {
  data?: any;
}
 
const EnjoyTheSunshine: React.FC<DashboardProps> = ({data}) => {

  const { filterUrls,modalClick,menuClick } = useMyContext();

  const ImageUrlData = data.map((item:any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Enjoy the sunshine", true, "sun-shine")}
        title="Enjoy the sunshine"
      />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : data?.slice(0, 10).map((item: any, index: any) => {
              return (
                <div key={index}>
                  <div
                    className="flex w-[120px] flex-col flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      modalClick(
                        "activities",
                        item,
                        filteredUrls[index] ? filteredUrls[index] : fallback
                      )
                    }
                  >
                    <div className="rounded-[4px] bg-[#c4c4c4] h-[64px] self-stretch">
                      <Image className="w-[140px] h-[64px] rounded-6px"
                        src={
                          filteredUrls[index] ? filteredUrls[index] : fallback
                        }
                        alt=""
                        width={500}
                        height={80}
                        style={{
                          borderRadius: 4,
                          maxWidth: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                        
                      />
                    </div>
                    <p className="text-[13px] font-normal leading-normal mt-[8px] block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.acf.title}
                    </p>
                    <p className="overflow-hidden text-black/[0.48] text-ellipsis text-[12px] font-normal leading-normal mt-[8px]">
                      £ {item.acf.price_from}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default EnjoyTheSunshine;
