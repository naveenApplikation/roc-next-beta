'use client'
import React from 'react'
import HomeMenu from './HomeMenu'
import { useMyContext } from '@/app/Context/MyContext';
import Image from 'next/image';
import fallback from "../../../../assets/images/fallbackimage.png";
const Sunshine = ({
    title,
    data,
    nav,
  }: {
    title: string;
    data: any;
    nav: string;
  })=>{
       
     const {modalClick,filterUrls}=useMyContext()
     const ImageUrlData = data.map((item:any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);
  return <>
     <HomeMenu link={nav}>{title}</HomeMenu>
      <div className="grid grid-flow-col gap-[8px] px-[40px] min-h-max max-[800px]:px-[16px] overflow-y-hidden no-scrollbar">
        {
            data?.slice(0, 10).map((item: any, index: any) => {
                return (
              
                    <div key={index}
                      className="flex w-[120px] flex-col gap-y-[8px]  cursor-pointer"
                      onClick={() =>
                        modalClick(
                          "activities",
                          item,
                          filteredUrls[index] ? filteredUrls[index] : fallback
                        )
                      }
                    >
                      <div className="rounded-[4px] bg-[#c4c4c4] h-[64px]">
                        <Image className="w-[140px] h-[64px] rounded-6px"
                          src={
                            filteredUrls[index] ? filteredUrls[index] : fallback
                          }
                          alt=""
                          width={500}
                          height={80}
                          style={{
                            borderRadius: 4,
                            maxWidth: "100%",
                            objectFit: "cover",
                          }}
                          loading="lazy"
                          
                        />
                      </div>
                      <p className="text-[13px] font-normal leading-normal block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.acf.title}
                      </p>
                      <p className="overflow-hidden text-black/[0.48] text-ellipsis text-[12px] font-normal leading-normal">
                        £ {item.acf.price_from}
                      </p>
                    </div>
                 
                );
              })}
        
 </div>
 </>
}

export default Sunshine