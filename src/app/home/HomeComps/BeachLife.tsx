'use client'
import React from 'react'
import HomeMenu from './HomeMenu'
import Image from 'next/image'
import fallback from "../../../../assets/images/fallbackimage.png";
import { useMyContext } from '@/app/Context/MyContext';
const BeachLife = ({
title,nav,data
}:{title:string,nav:string,data:any[]}) => {

   const {modalClick}=useMyContext()
  return <>
     <HomeMenu link=''>{title}</HomeMenu>
     <div className='grid grid-flow-col px-[40px] max-[800px]:px-[16px] gap-[8px] overflow-x-scroll no-scrollbar'>
           {(data||[]).map((item,index)=>{
               return <>
                  <div  onClick={() =>
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
                    } key={index} className='cursor-pointer h-[120px] w-[120px] max-w-[120px] rounded-[4px] relative flex justify-center'>
                  <div className="w-[120px] h-[120px]  rounded-[8px]">
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
                  className="h-[120px] w-[120px] object-cover  rounded-[8px]"
                />
                </div>
                 <p className='text-white absolute bottom-[10px] text-[14px] font-normal leading-[12px] line-clamp-1'>{item?.name}</p>
                  </div>
               </>
           })}
     </div>
  </>
}

export default BeachLife