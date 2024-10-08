"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { cycleRouteData } from "@/app/utils/data";

 
 
const CycleRoutes = () => {
  
  const {modalClick } = useMyContext();

  return (
    <>
      <MenuDetails title="Cycle Routes" hideShowAll={true} />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {cycleRouteData.length
          ? cycleRouteData?.map((item: any, index: any) => {
              return (
                <div
                  className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                  key={index}
                  style={{ background: item?.color }}
                  onClick={() => modalClick("walksModal", item)}
                >
                  <Image
                    src={item?.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-[4px]"
                    loading="lazy"
                    quality={70}
                    
                  />
                  <p className="text-white text-[12px] font-medium leading-normal w-full">{item?.name}</p>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default CycleRoutes;
