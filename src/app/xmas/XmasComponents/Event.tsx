import Image from "next/image"
import { dining, drinks,EventImage,hearts, smily, XmasBgImage } from "../utils/XmasImagePath"
import XmasMenu from "./XmasMenu"

 
export default function XmasEvent({title}:{title:string})
{
    return <>
           <XmasMenu>{title}</XmasMenu>
           <div className="flex gap-[8px] min-h-max overflow-y-hidden no-scrollbar">
  {[1,2,3,4,5,6,7,8,9,10].map((index) => {
    return (
      <div key={index} className="flex flex-col  w-[80px] gap-[8px]">
        <div className="relative w-[80px]  rounded-[8px]">
          <Image height={500} width={500} alt="" objectFit="fill" src={EventImage} className="h-[83px] w-full rounded-[8px]" />
          <div className="absolute bottom-[4px] left-[4px] w-[30px] text-center bg-white rounded-[4px]">
            <p className="text-[17px] font-extrabold leading-[1.0]">29</p>
            <p className="text-[10px] font-bold leading-normal uppercase bg-[#ba2b2b] text-white rounded-b-[4px]">
              OCT
            </p>
          </div>
        </div>
        <p className="text-[12px] font-normal  leading-normal overflow-hidden  text-ellipsis line-clamp-2">
          Famous Kitchen Tour and activities 
        </p>
      </div>
    );
  })}
</div>

    </>
}
