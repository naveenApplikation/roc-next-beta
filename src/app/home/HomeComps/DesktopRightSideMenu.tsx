'use client'
import { useMyContext } from '@/app/Context/MyContext'
import { rightSideMenu } from '@/app/utils/data'
import { useRouter } from 'next-nprogress-bar'
import React from 'react'
import Image from 'next/image'
const DesktopRightSideMenu = () => {

    const router=useRouter()
    const {menuClick}=useMyContext()
  return (
    <div className='fixed grid grid-cols-1 z-[1] no-scrollbar overflow-y-scroll right-[30px] max-[800px]:hidden gap-[24px] top-[60px] h-screen'>
          {rightSideMenu.map((item, index) => {
              return <>
                  <div key={index}style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}} className='relative w-[129px] h-[64px] bg-white/80 flex justify-center gap-[8px] items-center rounded-[8px]'
                  onClick={() => {
                    if (item.url == "upcoming") {
                      router.push("/eventCategory/upcoming");
                    } else if (item.url == "activity") {
                      router.push("/activityCategory/all activities");
                    } else {
                      menuClick(
                        index == 3 || index == 6 ? item.id : item.url,
                        index == 3 || index == 6 ? true : false,
                        index == 3 || index == 6 ? item.url : item.id
                      );
                    }
                  }}
                  >
                    <Image
                                     style={{
                                       width: item.name == "All" ? "22px" : "auto",
                                       height: item.name == "All" ? "auto" : "revert-layer",
                                     }}
                                     src={item.image}
                                     width={item.width}
                                     height={item.height}
                                     alt="icon"
                                   />
                                   <p className='text-[14px] font-normal leading-4 '>{item.name}</p>
                  </div>
              </>
          })}
    </div>
  )
}

export default DesktopRightSideMenu