import Image from "next/image";
import {
  dining,
  drinks,
  FrontArrow,
  hearts,
  RedArrow,
  EventLayout,
  smily,
  winterDomes,
} from "../utils/XmasImagePath";
import { backArrow } from "@/app/utils/ImagePath";
import XmasMenu from "./XmasMenu";
import XmasEvent from "./Event";
import CommonButton from "./CommonButton";
import ListingItems from "./ListingItems";
import ImageLayout from "./ImageLayout";
import { getCategory } from "../XmasAction";
import { Fragment } from "react";
import { handleEventEncoding } from "@/app/utils/commanFun";
import { imageOptimization } from "@/app/action";

export default async function EventAndActivities({ ads }: { ads: any }) {
  const events: any = await getCategory("main");
  const categoryList: any = await getCategory("secondary");
  const data = await Promise.all(
    events.map(async (data: any) => {
      const response = await imageOptimization(data.EventList);
      return { ...data, EventList: response };
    })
  );
  const EventItems = () => {
    return data.map((data, index) => {
      return (
        <Fragment key={index}>
          <XmasEvent
            nav={
              "/eventCategory/" + handleEventEncoding("encode", data?.listName)
            }
            data={data.EventList}
            title={data?.listName}
          ></XmasEvent>
        </Fragment>
      );
    });
  };

  return (
    <>
      <div
        id="events"
        className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]"
      >
        <div className="">
          <h1 className="text-[#F40035] text-[32px] font-[900] ">
            Events & Activities
          </h1>
        </div>
        <ImageLayout data={ads}>
          {ads?.title.split(":")[0]} <br /> {ads?.title.split(":")[1]}
        </ImageLayout>

        <EventItems></EventItems>
        <ListingItems title="event" data={categoryList}></ListingItems>
        <CommonButton>All Christmas Events</CommonButton>
      </div>
    </>
  );
}

const data = [
  {
    content: "Dining & Tasting",
    image: dining,
  },
  {
    content: "Family-Friendly",
    image: smily,
  },
  {
    content: "Community & Charity",
    image: hearts,
  },
  {
    content: "New Years Eve",
    image: drinks,
  },
];
const EventListing = () => {
  return (
    <>
      <div className="py-[16px] px-[24px] bg-[#F5F5F5] rounded-[16px]">
        {data.map((item: any) => {
          return (
            <div
              key={item}
              className="flex justify-between items-center  border border-x-0 border-t-0 border-b-gray-300 "
            >
              <div className="relative border-none flex items-center grow gap-[16px] py-[12px]">
                <Image alt="" src={item.image}></Image>

                <p className="absolute text-[18px] left-[50px] font-[400]">
                  {item.content}
                </p>
              </div>
              <Image height={10} width={8} src={RedArrow} alt=""></Image>
            </div>
          );
        })}
      </div>
    </>
  );
};
