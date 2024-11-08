'use client'
import Image from "next/image"
import { FrontArrow } from "../utils/XmasImagePath"
import { ReactNode } from "react"
import Link from "next/link"
import { useMyContext } from "@/app/Context/MyContext"
import fallback from "../../../../assets/images/fallbackimage.png";
import { convertGCSUrl } from "@/app/utils/commanFun"
import { useRouter } from "next-nprogress-bar"

const filterUrls = (ImageUrlData: any) => {
     const imageUrls: string[] = [];
     ImageUrlData?.forEach((item: any) => {
       if (item) {
         try {
           const jsonData = JSON.parse(item);
           const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined
   
           if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
             imageUrls.push(convertGCSUrl(url));
           } else {
             imageUrls.push(
               fallback.src
             ); // Push default image URL if URL is not valid
           }
         } catch (error) {
           console.error("Error parsing JSON:", error);
           imageUrls.push(
             fallback.src          ); // Push default image URL if JSON parsing fails
         }
       } else {
         imageUrls.push(
           fallback.src        ); // Push default image URL if item is undefined
       }
     });
     return imageUrls;
   };
export default function ImageLayout({data,children}:{children:ReactNode,data?:any})
{
    const router=useRouter()
    const {modalClick}=useMyContext()
    const navigate=(type:string,item:any)=>{
    
        switch(type)
        {
           case 'event':
               const filteredUrls = filterUrls([item.event_id.acf.header_image_data]);
               console.log(filteredUrls)
               modalClick(
                   "eventListing",
                   {
                       acf:item.event_id.acf
                   },
                   filteredUrls[0] ? filteredUrls[0] : fallback
                 )
               break;
           case 'iframe':
                router.push(`/xmas/iframe/advertisement/${item?._id}`)
                break;
           case 'eventCategory':
                router.push(`/eventCategory/${item?.category_id}`)
             
                break;
           case 'place':
               console.log(item)
                  modalClick(
                    "eventListing",
                    {
                         data_type: 'google',
                         ...item.placeDetails 
                    },
                    item?.img_url?item.img_url:fallback
                  )
                break;
           default:
              router.push('/xmas')     
        }
      
        
  }

     return <>
       <div onClick={()=>{navigate(data.link_type,data)}} className="relative cursor-pointer h-[200px] w-full rounded-[16px]">
                 <Image 
                  src={data.img_url}
                  alt=""
                  width={500}
                  height={500}

                  objectFit="cover"
                  className="w-full h-full rounded-[16px]"
                 />
                <div className="flex flex-row gap-[4px] box-border absolute bottom-[0px] w-full h-max  p-[12px] rounded-b-[16px]">
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