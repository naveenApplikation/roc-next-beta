import Image from "next/image";
import XmasMenu from "./XmasMenu";
import { Banjo } from "../utils/XmasImagePath";
export default function Places({title}:{title:string})
{
    return <>
             <XmasMenu>{title}</XmasMenu>
           <div className="flex gap-[8px] overflow-y-hidden no-scrollbar">
  {[1,2,3,4,5,6,7,8,9,10].map((index) => {
    return (
      <div key={index} className="flex flex-col  w-[120px] gap-[8px]">
        <div className="w-[120px]  rounded-[8px]">
          <Image height={70} width={120} alt="" objectFit="cover" src={Banjo} className="rounded-[8px]" />
        </div>
        <p className="text-[12px] font-normal  leading-normal overflow-hidden  text-ellipsis line-clamp-1">
          Famous Kitchen Tour and activities 
        </p>
      </div>
    );
  })}
</div>
    </>
}