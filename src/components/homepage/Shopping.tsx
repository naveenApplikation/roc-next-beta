"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import { skeletonItems } from '@/app/utils/date'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface DashboardProps {
  Shoppingdata?: any;
}
 
const Shopping: React.FC<DashboardProps> = ({Shoppingdata}) => {
  const {menuClick } = useMyContext();


  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Shopping", true, "shopping-lists")}
        title="Shopping"
      />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!Shoppingdata
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : Shoppingdata.length
          ? Shoppingdata.map((item: any, index: any) => {
              return (
                <div
                  className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                  key={index}
                  style={{ background: item?.bgColor, cursor: "pointer" }}
                  onClick={() =>
                    menuClick(item?.listName, false, item?.categoryId)
                  }
                >
                  <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                    <Image
                      src={item?.image}
                      alt={""}
                      priority
                      placeholder="blur"
                    />
                  </p>
                  <p className="text-white text-[12px] font-medium leading-normal w-full">
                    {item?.listName}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Shopping;
