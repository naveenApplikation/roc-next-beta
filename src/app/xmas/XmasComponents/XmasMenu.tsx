
import Image from "next/image"
import { FrontArrow } from "../utils/XmasImagePath"
import { backArrow } from "@/app/utils/ImagePath"
import { ReactNode } from "react"
export default function XmasMenu({children}:{children:ReactNode})
{
      return <>
            <div className="flex gap-[5px]">
                     <p className="capitalize text-[15px] font-[700]">{children}</p>
                     <Image
                     height={10}
                     width={8}
                     src={backArrow}
                     alt=""
                     className="text-black rotate-180"
                     >
                     </Image>
                </div>    
      </>
}