"use client"

import React from "react";

import { topSideMenu } from "@/app/utils/data";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";

 

const InfoApp = () => {

  const {modalClick} = useMyContext();

  const formatNameWithSpaces = (name:any) => {
    // Use a regular expression to split the string into words
    // and then join them with spaces
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <>
      <div className="flex overflow-auto px-[16px] md:px-[40px] no-scrollbar gap-[25px]">
        {topSideMenu.map((item: any, index: any) => {
          return (
            <div
              className="flex flex-col items-center cursor-pointer gap-[8px] justify-betwee"
              key={index}
              onClick={() => modalClick("infoApp", item.name)}
            >
              <Image
                className="h-[18px] w-[18px]"
                src={item.image}
                alt="right icon"
                priority
              />
              <p
                className="text-black text-center text-[14px] font-normal leading-normal"
                style={{
                  textTransform:
                    item.name === "sos" ? "uppercase" : "capitalize",
                  whiteSpace: "nowrap",
                }}
              >
                {formatNameWithSpaces(item.name)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InfoApp;
