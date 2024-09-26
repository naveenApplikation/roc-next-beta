'use client'

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import CommonButton from "@/components/button/CommonButton";
import { skeletonItems } from '@/app/utils/date'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardProps {
  listData?: any;
}


const TrendingList: React.FC<DashboardProps> = ({ listData }) => {

  const { modalClick, menuClick } = useMyContext();

  const clickOnCreate = () => {
    const loginToken = typeof window !== "undefined" ? window.localStorage.getItem("loginToken") : null;
    if (loginToken) {
      menuClick("AddToCreate")
    } else {
      modalClick("LoginSignupModal")
    }
  }

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Trending Lists", true, "category-item")}
        title="Trending Lists"
      />

      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!listData
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : listData.length
          ? listData.map((item: any, index: any) => {
              return (
                <div
                  className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                  key={index}
                  style={{ background: item?.bgColor, cursor: "pointer" }}
                  onClick={() => menuClick(item?.listName, false, item?._id)}
                >
                  <p
                    className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full"
                
                  >
                    {item?.image}
                  </p>
                  <p className="text-white text-[12px] font-medium leading-normal w-full">
                    {item?.listName}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
      <div style={{ padding: "0px 40px" }} onClick={() => clickOnCreate()}>
        <CommonButton text="Create a List" />
      </div>
    </>
  );
};

export default TrendingList;

 