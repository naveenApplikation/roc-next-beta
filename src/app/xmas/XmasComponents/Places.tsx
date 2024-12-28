"use client";
import Image from "next/image";
import XmasMenu from "./XmasMenu";
import { Banjo } from "../utils/XmasImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../../assets/images/fallbackimage.png";
export default function Places({
  title,
  data,
  nav,
}: {
  title: string;
  data: any;
  nav: string;
}) {
  // // console.log(data,"data")
  const { modalClick } = useMyContext();
  return (
    <>
      <XmasMenu link={nav}>{title}</XmasMenu>
      <div className="flex gap-[8px] overflow-y-hidden no-scrollbar">
        {(data || []).map((item, index) => {
          return (
            <div
              onClick={() =>
                modalClick(
                  "eventListing",
                  item,
                  item?.data_type === "google" ||
                    (item?.data_type == "roc_places" &&
                      item?.photoUrl &&
                      typeof item.photoUrl == "string")
                    ? item?.photoUrl
                    : Array.isArray(item.photoUrl)
                      ? item.photoUrl[0]
                      : fallback
                )
              }
              key={index}
              className="flex flex-col cursor-pointer  w-[120px] gap-[8px]"
            >
              <div className="w-[120px]  rounded-[8px]">
                <Image
                  height={500}
                  width={500}
                  alt=""
                  objectFit="cover"
                  src={
                    typeof item.photoUrl == "string"
                      ? item?.photoUrl
                      : Array.isArray(item.photoUrl)
                        ? item.photoUrl[0]
                        : fallback
                  }
                  className="h-[70px] w-[120px] object-cover w- rounded-[8px]"
                />
              </div>
              <p className="text-[12px] font-normal  leading-normal overflow-hidden  text-ellipsis line-clamp-1">
                {item?.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
