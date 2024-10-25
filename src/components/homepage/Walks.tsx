 
import React from "react";
 
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import { walkData } from "@/app/utils/data";
import { walkMask } from "@/app/utils/ImagePath";
import fallback from '../../../assets/images/fallbackimage.png'
import { WalksAndCycleModel } from "./SunshineMenu";
 
interface DashboardProps {
  data?: any;
  menuClick?: any;
}

  

  


const Walks: React.FC<DashboardProps> = ({data}) => {
 

  return (
    <>
      <MenuDetails title="Walks" hideShowAll={true} />
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px] no-scrollbar">
        {  walkData?.map((item, index) => {
              return (
                <WalksAndCycleModel key={index} {...{item}}>
                <div
                  className="h-[120px] min-w-[120px] bg-black/[0.01] bg-bottom bg-no-repeat flex flex-col items-end justify-between relative"
                  key={index}
                
                >
                  <Image
                    src={item.icon ? item.icon : fallback}
                    alt=""
                    width={500}
                    height={80}
                    className="h-full w-full rounded-[4px]"
                    style={{
                      borderRadius: "8px",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                   
                  />
                  <Image
                    src={walkMask}
                    alt=""
                    width={120}
                    height={64}
                    className="h-full w-full rounded-[4px]"
                    style={{ position: "absolute", bottom: 0, height: 50 }}
                   
                  />
                  <p className="text-white text-[14px] font-normal absolute bottom-[8px] left-[12px]">
                    {item?.listName}
                  </p>
                </div>
                </WalksAndCycleModel>
              );
            })}
      </div>
    </>
  );
};

export default Walks;
