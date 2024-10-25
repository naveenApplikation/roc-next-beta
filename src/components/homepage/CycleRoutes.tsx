 
import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
 
import { cycleRouteData } from "@/app/utils/data";
import { WalksAndCycleModel } from "./SunshineMenu";

 
 
const CycleRoutes = () => {
  
  
  return (
    <>
      <MenuDetails title="Cycle Routes" hideShowAll={true} />
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        {cycleRouteData.length
          ? cycleRouteData?.map((item: any, index: any) => {
              return (
                <WalksAndCycleModel key={index} {...{item}}>
                <div
                  className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                  key={index}
                  style={{ background: item?.bgColor }}
                
                >
                  <Image
                    src={item?.image}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-[4px]"
                    
                    
                  />
                  <p className="text-white text-[12px] font-medium leading-normal w-full">{item?.listName}</p>
                </div>
                </WalksAndCycleModel>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default CycleRoutes;
