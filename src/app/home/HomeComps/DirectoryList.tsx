'use client'
import { useMyContext } from '@/app/Context/MyContext'
import { DirectoryHomepage } from '@/app/utils/homeIcon'
import React from 'react'
import ReactIconsTOSvg from '../IconToSvg'
import HomeMenu from './HomeMenu'

const DirectoryList = () => {

    const {menuClick,modalClick}=useMyContext()
  return <>
    <HomeMenu link='/screens/directoryList' >Directory</HomeMenu>
     {DirectoryHomepage.slice(0, 5).map((item: any, index: any) => (
           <div
             className="flex justify-between border-b border-black/[0.1] mx-[16px] pb-[17px] md:mx-[40px]"
             key={index}
           >
             <div
               className="flex items-center justify-start gap-[15px] flex-1 cursor-pointer"
               onClick={() => menuClick(item.data[0].url, true, "Directory")}
             >
               <ReactIconsTOSvg icon={item.data[0].image} classNames='w-[16] h-[16] '></ReactIconsTOSvg>
               <p className="text-[16px] font-normal leading-normal cursor-pointer capitalize">
                 {item.data[0].title}
               </p>
             </div>
             <div
               className="flex items-center justify-start gap-[15px] flex-1 cursor-pointer"
               onClick={() => menuClick(item.data[1].url, true, "Directory")}
             >
                <ReactIconsTOSvg icon={item.data[1].image} classNames='w-[16] h-[16] '></ReactIconsTOSvg>
               <p className="text-[16px] font-normal leading-normal cursor-pointer capitalize">
                 {item.data[1].title}
               </p>
             </div>
           </div>
         ))}
         <button
           className="flex px-[16px] py-[12px] justify-center items-center gap-[8px] self-stretch rounded-[8px] bg-white border-none  mx-[16px] text-[#2f80ed] text-[14px] font-semibold cursor-pointer md:mx-[40px]"
           onClick={() => modalClick("AddDirectoryModal")}
           style={{boxShadow:"0px 0px 24px 0px rgba(0, 0, 0, 0.09), 0px 9px 21px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 0px rgba(0, 0, 0, 0.10)"}}

         >
           Add to Directory
         </button>
  </>
}

export default DirectoryList