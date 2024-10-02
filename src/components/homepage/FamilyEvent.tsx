"use client";

import React, { useEffect } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { skeletonItems } from "@/app/utils/date";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next-nprogress-bar";

interface DashboardProps {
  data?: any;
}

 
 
 

const FamilyEvent: React.FC<DashboardProps> = ({ data }) => {
  const { filterUrls, modalClick, menuClick } = useMyContext();

  const ImageUrlData = data.map((item: any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);
  const router = useRouter();
  
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const placeId = urlParams.get("search");

      if (placeId) {
        const temp = {
          data_type: "google",
          place_id: placeId,
        };

        modalClick("ModalContent", temp, fallback);
      }
    }
  }, [data]);
  const {resetFilters}=useMyContext()
  const navigate = () => {
    resetFilters();
    router.push("/eventCategory/upcoming");
  };
  return (
    <>
      <MenuDetails isOpen={() => navigate()} title="Upcoming Events" />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
                <Skeleton
                  width={80}
                  height={15}
                  style={{ marginTop: 8, borderRadius: 6 }}
                />
              </div>
            ))
          : data.slice(0, 10).map((item: any, index: any) => {
              return (
                <div
                  className="flex w-[80px] flex-col gap-[8px] flex-shrink-0"
                  key={index}
                  onClick={() =>
                    modalClick(
                      "eventListing",
                      item,
                      filteredUrls[index] ? filteredUrls[index] : fallback
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex flex-col relative">
                    <Image
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      alt=""
                      width={500}
                      height={80}
                      className="rounded-[4px] max-w-full h-[80px] object-cover"
                      loading="lazy"
                      placeholder="blur"
                    />
                    <div className="absolute bottom-[4px] left-[4px] text-center bg-white rounded-[4px]">
                      <p className="text-[17px] font-extrabold leading-normal w-[30px]">
                        {formatDate(item.acf.event_dates[0].date)}
                      </p>
                      <p className="text-[10px] font-bold leading-normal uppercase bg-[#ba2b2b] text-white w-[30px] rounded-b-[4px]">
                        {formatMonth(item.acf.event_dates[0].date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] font-normal leading-normal w-full overflow-hidden text-ellipsis line-clamp-3">
                    {item.acf.title}
                  </p>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default FamilyEvent;
