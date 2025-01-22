
import Image from "next/image"

import { backArrow } from "@/app/utils/ImagePath"
import { ReactNode } from "react"
import Link from "next/link"
export default function HomeMenu({children,link}:{children:ReactNode,link:string})
{
      return <>
            <Link href={link} className="flex justify-between items-center px-[40px] max-[800px]:px-[16px]">
                  <div className="flex gap-[5px]">
                     <p className="capitalize text-[24px] font-[700]">{children}</p>
                     <Image
                     height={10}
                     width={8}
                     src={backArrow}
                     alt=""
                     className="text-black rotate-180"
                     >
                     </Image>
                     </div>
                      
                      <p className="text-[14px] font-[700]">View All</p>
                       
                </Link>    
      </>
}