"use client";

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";

import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { eventsByDate } from "@/app/utils/homeIcon";
import { useRouter } from "next/navigation";
import { handleEventEncoding } from "@/app/utils/commanFun";
import Link from "next/link";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";

const EventsByDate = () => {
  const EventMenuClick = (item: any) => {
    return `/eventByDate/${handleEventEncoding("encode", item.name)}`;
  };
  return (
    <>
      <MenuDetails title="Events by date" hideShowAll={true} />
      <div className="flex overflow-y-hidden gap-x-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!eventsByDate
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
            </div>
          ))
          : eventsByDate.length
            ? eventsByDate.map((item: any, index: any) => {
                return (
                  <Link key={index} href={EventMenuClick(item)}>
                    <div
                      className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                      style={{ background: item?.color, cursor: "pointer" }}>
                      <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                        {" "}
                        {item?.icon}
                      </p>
                      <p
                        className="text-white text-[12px] font-medium leading-normal w-full"
                        style={{ paddingBottom: "5px" }}>
                        {item?.name}
                      </p>
                    </div>
                  </Link>
                );
              })
            : ""}
            {/* <BannerModal /> */}
      </div>
    </>
  );
};

export default EventsByDate;
