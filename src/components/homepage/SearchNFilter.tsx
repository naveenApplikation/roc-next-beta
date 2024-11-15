"use client";

import React from "react";

import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import { search } from "@/app/utils/ImagePath";
import { FrontArrow } from "@/app/xmas/utils/XmasImagePath";
import Link from "next/link";

const SearchNFilter = () => {
  const { modalClick } = useMyContext();

  return (
    <>
      <div className="max-[800px]:mt-[20px]  flex flex-col gap-[25px] px-[16px] md:px-[40px] md:pt-[16px]">
      <Link href={'/xmas'} className="flex justify-between max-[800px]:hidden items-center rounded-[8px] px-[16px] py-[12px] bg-[#F40035]">
        {/* <button
          style={{ cursor: "pointer" }}
          onClick={() => menuClick("Community", true, "category-item")}>
          All Categories
        </button> */}
        
            <p style={{fontWeight:"700",fontSize:"14px",color:"white"}}>Jersey Christmas Guide</p>
            <div style={{display:"flex",gap:"8px"}}>
               <p style={{fontWeight:"400",fontSize:"14px",color:"white"}}>Open</p>
               <Image
                width={9}
                height={14}
                src={FrontArrow}
                alt=""
               />

            </div>
        
      </Link>
        <button
          className="px-[24px] py-[19px] shadow-[0_0_24px_rgba(82,41,0,0.5)] bg-white outline-none border-none w-full rounded-[8px] flex justify-between items-center text-[18px] font-medium"
          onClick={() => modalClick("search")}>
          <p>Search...</p>
          <Image
            className="cursor-pointer"
            src={search}
            alt="Search"
            priority
          />
        </button>
      </div>
    </>
  );
};

export default SearchNFilter;
