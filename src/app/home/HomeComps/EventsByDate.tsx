import React from 'react'
import HomeMenu from './HomeMenu'
import { handleEventEncoding } from '@/app/utils/commanFun';
import { eventsByDate } from '@/app/utils/homeIcon';
import Link from 'next/link';

const EventsByDate = () => {
     const EventMenuClick = (item: any) => {
        return `/eventByDate/${handleEventEncoding("encode", item.name)}`;
      };
  return <>
       <HomeMenu link="">Events by Date</HomeMenu>
           <div className="grid grid-flow-col gap-[8px] px-[40px] min-h-max max-[800px]:px-[16px] overflow-y-hidden no-scrollbar">

        {  (eventsByDate|| []).map((item: any, index: any) => {
                return (
                  <Link key={index} href={EventMenuClick(item)}>
                    <div
                      className="flex w-[80px] p-[7px] px-[8px] flex-col justify-between items-end gap-[8px] flex-shrink-0 h-[80px] rounded-[8px] bg-[#bb6bd9] cursor-pointer"
                      style={{ background: item?.color, cursor: "pointer" }}>
                      <p className="flex flex-col-reverse items-end text-white text-[12px] font-medium leading-normal w-full">
                        {" "}
                        {item?.icon}
                      </p>
                      <p
                        className="text-white text-[12px] font-medium leading-normal w-full"
                        style={{ paddingBottom: "5px" }}>
                        {item?.name}
                      </p>
                    </div>
                  </Link>
                );
              })
            }
        </div>
  </>
}

export default EventsByDate