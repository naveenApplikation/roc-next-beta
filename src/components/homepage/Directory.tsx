"use client";

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
 
import { DirectoryHomepage } from "@/app/utils/homeIcon";
import { useMyContext } from "@/app/Context/MyContext";
 
const DirectoryList = () => {
  const { modalClick, menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        title="Directory"
        isOpen={() => menuClick("directoryList")}
      />
      {DirectoryHomepage.slice(0, 5).map((item: any, index: any) => (
        <div
          className="flex justify-between border-b border-black/[0.1] mx-[16px] pb-[17px] md:mx-[40px]"
          key={index}
        >
          <div
            className="flex items-center justify-start gap-[15px] flex-1 cursor-pointer"
            onClick={() => menuClick(item.data[0].url, true, "Directory")}
          >
            {item.data[0].image}
            <p className="text-[1.6rem] font-normal leading-normal cursor-pointer capitalize">
              {item.data[0].title}
            </p>
          </div>
          <div
            className="flex items-center justify-start gap-[15px] flex-1 cursor-pointer"
            onClick={() => menuClick(item.data[1].url, true, "Directory")}
          >
            {item.data[1].image}
            <p className="text-[1.6rem] font-normal leading-normal cursor-pointer capitalize">
              {item.data[1].title}
            </p>
          </div>
        </div>
      ))}
      <button
        className="flex px-[16px] py-[12px] justify-center items-center gap-[8px] self-stretch rounded-[8px] bg-white border-none shadow-[0_0_40px_rgba(0,0,0,0.4)] mx-[16px] text-[#2f80ed] text-[14px] font-semibold cursor-pointer md:mx-[40px]"
        onClick={() => modalClick("AddDirectoryModal")}
      >
        Add to Directory
      </button>
    </>
  );
};

export default DirectoryList;
