"use client";

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { handleEventEncoding } from "@/app/utils/commanFun";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

interface DashboardProps {
  data?: any;
  type: string;
  name: string;
  title: string;
}

const CategoriesComps: React.FC<DashboardProps> = ({
  data,
  name,
  type,
  title,
}) => {
  const router = useRouter();

  const getEventLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/eventCategory/${encodedName}`;
  };

  const getCategoryLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/activityCategory/${encodedName}`;
  };

  return (
    <>
      <MenuDetails
        isOpen={() => {
          if (type === "event-category-list") {
            router.push("eventCategory");
          } else {
            router.push("activityCategory");
          }
        }}
        title={title}
      />
      <div className="flex overflow-y-hidden gap-x-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : data.length
            ? data.slice(0, 10).map((item: any, index: any) => {
                return (
                  <Link
                    key={index}
                    href={
                      type === "event-category-list"
                        ? getEventLink(item.listName)
                        : getCategoryLink(item.listName)
                    }>
                    <div
                      className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                      style={{ background: item?.bgColor, cursor: "pointer" }}>
                      {item.image && (
                        <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                          {" "}
                          {item?.image}
                        </p>
                      )}
                      <p
                        className="text-white text-[12px] font-medium leading-normal w-full"
                        style={{ paddingBottom: "5px" }}>
                        {item?.listName}
                      </p>
                    </div>
                  </Link>
                );
              })
            : ""}
      </div>
    </>
  );
};

export default CategoriesComps;
