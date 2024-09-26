"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import { skeletonItems } from '@/app/utils/date'
import { walkData } from "@/app/utils/data";
import { walkMask } from "@/app/utils/ImagePath";
import fallback from '../../../assets/images/fallbackimage.png'

interface DashboardProps {
  data?: any;
  menuClick?: any;
}

  

  


const Walks: React.FC<DashboardProps> = ({data}) => {

  const {modalClick} = useMyContext();

  return (
    <>
      <MenuDetails title="Walks" hideShowAll={true} />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <ShopBrachSkeleton />
              </div>
            ))
          : walkData?.map((item, index) => {
              return (
                <div
                  className="h-[120px] min-w-[120px] bg-black/[0.01] bg-bottom bg-no-repeat flex flex-col items-end justify-between relative"
                  key={index}
                  onClick={() => modalClick("walksModal", item)}
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
                    loading="lazy"
                    quality={50}
                  />
                  <Image
                    src={walkMask}
                    alt=""
                    width={120}
                    height={64}
                    className="h-full w-full rounded-[4px]"
                    style={{ position: "absolute", bottom: 0, height: 50 }}
                    loading="lazy"
                    quality={50}
                  />
                  <p className="text-white text-[14px] font-normal absolute bottom-[8px] left-[12px]">
                    {item?.name}
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Walks;
