"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { wellbeingImg } from "@/app/utils/ImagePath";
import AdsBanner from "../adsBanner/page";

interface DashboardProps {
  data?: any;
  menuClick?: any;
}
 


const Wellbeing: React.FC<DashboardProps> = ({data}) => {

  const {menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Wellbeing", true, "wellbeing-lists")}
        title="Wellbeing"
      />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : data.length
          ? data.map((item: any, index: any) => {
              return (
                <div
                  className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                  key={index}
                  style={{ background: item?.bgColor, cursor: "pointer" }}
                  onClick={() =>
                    menuClick(item?.listName, false, item?.categoryId)
                  }
                >
                  {/* <p>{item?.image}</p> */}
                  <p style={{ textAlign: "right" }}>
                    <Image
                      src={wellbeingImg}
                      alt=""
                      priority
                      placeholder="blur"
                    />
                  </p>
                  <p className="text-white">{item?.listName}</p>
                </div>
              );
            })
          : ""}
      </div>
        {/* <AdsBanner/> */}
    </>
  );
};

export default Wellbeing;
