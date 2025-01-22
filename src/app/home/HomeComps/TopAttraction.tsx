'use client'
import React from 'react'
import HomeMenu from './HomeMenu'
import Image from 'next/image'
import fallback from "../../../../assets/images/fallbackimage.png";
import { useMyContext } from '@/app/Context/MyContext';
const TopAttraction = ({
    title,nav,data
    }:{title:string,nav:string,data:any[]}) => {
    const {modalClick}=useMyContext()
  return <>
        <HomeMenu link={nav}>{title}</HomeMenu>
     <div className='grid grid-flow-col px-[40px] max-[800px]:px-[16px] gap-[10px] overflow-x-scroll no-scrollbar'>
           {(data||[]).map((item,index)=>{
               return <>
                  <div 
                   onClick={() =>
                    modalClick(
                      "ModalContent",
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
                  key={index} className='h-max w-[80px] max-w-[120px] flex flex-col gap-[10px]'>
                  <div className='w-[80px] h-[80px] rounded-full cursor-pointer'>
                <Image
                  height={500}
                  width={300}
                  alt=""
                  objectFit="cover"
                  src={
                    typeof item.photoUrl == "string"
                      ? item?.photoUrl
                      : Array.isArray(item.photoUrl)
                        ? item.photoUrl[0]
                        : fallback
                  }
                  className="h-full w-full max-h-[80px] object-cover  rounded-full"
                />
                 </div>
                 <p className='text-black text-[14px] font-normal text-ellipsis line-clamp-2  text-center leading-[19px]'>{item?.name}</p>
                  </div>
               </>
           })}
     </div>
  </>
}

export default TopAttraction