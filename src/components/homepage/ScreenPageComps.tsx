"use client";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import fallback from "../../../assets/images/fallbackimage.png";
import Skeleton from "react-loading-skeleton";
import { skeletonItems } from "@/app/utils/date";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Image from "next/image";
import ShopBrachSkeleton from "../skeleton Loader/ShopBrachSkeleton";
import { MaskGroupImg } from "@/app/utils/ImagePath";
interface DashboardProps {
  data?: any;
  title: string;
}

const ScreenPageComps: React.FC<DashboardProps> = ({ data, title }) => {
  const { modalClick, menuClick } = useMyContext();

  return (
    
    <>
      <MenuDetails
        isOpen={() => menuClick(data?.name, false, data?.id)}
        title={title}
      />
      <div className="flex overflow-auto gap-[8px] px-[16px] md:px-[40px] no-scrollbar">
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                {title.includes("Top Attractions") ? (
                  <div key={index}>
                    <Skeleton
                      width={80}
                      height={80}
                      style={{ borderRadius: "100%" }}
                    />
                    <Skeleton
                      width={80}
                      height={15}
                      style={{ marginTop: 8, borderRadius: 6 }}
                    />
                  </div>
                ) : title.includes("Beach life") ? (
                  <ShopBrachSkeleton />
                ) : (
                  <CommonSkeletonLoader />
                )}
              </div>
            ))
          : title.includes("Beach life")
            ? data.listData?.slice(0, 10).map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="h-[120px] min-w-[120px] bg-black/[0.01] bg-bottom bg-no-repeat flex flex-col items-end relative cursor-pointer justify-between"
                    onClick={() =>
                      modalClick(
                        "ModalContent",
                        item,
                        item?.data_type === "google"
                          ? item?.photoUrl
                          : item.photoUrl
                            ? item.photoUrl
                            : fallback
                      )
                    }>
                    {item?.data_type === "google" ? (
                      <Image
                        className="w-full h-full rounded-[4px] object-cover cursor-pointer"
                        width={500}
                        height={80}
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt="Image"
                        loading="lazy"
                        placeholder="blur"
                      />
                    ) : (
                      <Image
                        src={item.photoUrl ? item.photoUrl : fallback}
                        alt=""
                        width={500}
                        height={80}
                        className="rounded-[4px] w-full h-full object-cover cursor-pointer"
                        loading="lazy"
                        placeholder="blur"
                      />
                    )}
                    <Image
                      src={MaskGroupImg}
                      alt=""
                      width={120}
                      height={64}
                      className="absolute bottom-0 h-[50px]"
                      loading="lazy"
                      placeholder="blur"
                    />
                    <p className="text-white text-[14px] font-normal overflow-hidden text-ellipsis line-clamp-3 absolute bottom-[8px] left-[12px]">
                      {item?.data_type === "google" ? item?.name : item?.name}
                    </p>
                  </div>
                );
              })
            : title.includes("Top Attractions")
              ? data.listData?.slice(0, 10).map((item: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-[8px] w-[80px] cursor-pointer"
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.data_type === "google"
                            ? item?.photoUrl
                            : item?.photoUrl
                              ? item?.photoUrl
                              : fallback
                        )
                      }>
                      <div className="w-[80px] h-[80px] rounded-full bg-black/[0.08] border border-black/[0.08] bg-contain">
                        {item?.data_type === "google" ? (
                          item.photoUrl == undefined ? (
                            <Image
                              src={fallback}
                              alt=""
                              width={500}
                              height={80}
                              className="rounded-full w-full h-full object-cover"
                              loading="lazy"
                              placeholder="blur"
                            />
                          ) : (
                            <Image
                              className="w-full h-full rounded-full object-cover cursor-pointer"
                              width={500}
                              height={80}
                              src={item.photoUrl}
                              alt="Image"
                              loading="lazy"
                              placeholder="blur"
                            />
                          )
                        ) : (
                          <Image
                            src={fallback}
                            alt=""
                            width={500}
                            height={80}
                            className="rounded-full w-full h-full object-cover"
                            loading="lazy"
                            placeholder="blur"
                          />
                        )}
                      </div>
                      <p className="text-center text-[12px] font-medium overflow-hidden text-ellipsis line-clamp-3">
                        {item?.data_type === "google" ? item?.name : item?.name}
                      </p>
                    </div>
                  );
                })
              : data.listData?.slice(0, 10).map((item: any, index: any) => (
                  <div key={index}>
                    <RatingMenu
                      headerImage={item.photoUrl}
                      containerImageUrl={true}
                      MenutitleDetail={item.name}
                      isOpen={() =>
                        modalClick("ModalContent", item, item.photoUrl, true)
                      }
                    />
                  </div>
                ))}
      </div>
    </>
  );
};

export default ScreenPageComps;
