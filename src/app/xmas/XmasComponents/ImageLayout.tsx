import Image from "next/image"
import { FrontArrow } from "../utils/XmasImagePath"
import { ReactNode } from "react"
export default function ImageLayout({image,children}:{image:any,children:ReactNode})
{
     return <>
       <div className="relative h-[200px] relative w-full rounded-[16px]">
                 <Image 
                  src={image}
                  alt=""
                  objectFit="cover"
                  className="w-full h-full rounded-[16px]"
                 />
                <div className="flex flex-row gap-[4px] box-border absolute bottom-[0px] w-full h-max backdrop-blur-[20px] p-[12px] rounded-b-[16px]">
                     <p className="text-white grow font-[600] text-[14px] overflow-hidden  text-ellipsis line-clamp-2">{children}</p>
                     <Image
                     height={10}
                     width={8}
                     src={FrontArrow}
                     alt=""

                     >


                     </Image>
                </div> 

                </div>  
     </>
}