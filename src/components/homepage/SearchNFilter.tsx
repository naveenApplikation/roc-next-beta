"use client";

import React from "react";

import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import { search } from "@/app/utils/ImagePath";

const SearchNFilter = () => {
  const { modalClick } = useMyContext();

  return (
    <>
      <div className="mt-[20px] px-[16px] md:px-[40px] md:pt-[16px]">
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
