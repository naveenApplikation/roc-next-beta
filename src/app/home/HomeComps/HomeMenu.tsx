
'use client'
import Image from "next/image"

import { backArrow } from "@/app/utils/ImagePath"
import { ReactNode } from "react"
import Link from "next/link"
export default function HomeMenu({children,link,isOpen}:{children:ReactNode,link:string,isOpen?:()=>any})
{
      return <>
            <Link href={link} onClick={isOpen} className="flex justify-between items-center px-[40px] max-[800px]:px-[16px]">
                  <div className="flex gap-[5px]">
                     <p className="capitalize text-[24px] font-[700]">{children}</p>
                 { link!="" &&   <Image
                     height={10}
                     width={8}
                     src={backArrow}
                     alt=""
                     className="text-black rotate-180"
                     >
                     </Image>}
                     </div>
                      
                 {link!="" &&    <p className="text-[14px] font-[700]">View All</p>}
                   
                </Link>    
      </>
}