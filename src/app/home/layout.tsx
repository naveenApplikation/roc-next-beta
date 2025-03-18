import { ReactNode } from "react";
import ScrollLayout from "../xmas/XmasComponents/ScrollLayout";

import '@/app/tailwind.css'
import App from "./IconToSvg";
import HomeDashBoard from "./HomeComps/HomeDashBoard";
import RightSideMenu from "@/components/RightSideMenu/page";
import Carousel from "../xmas/XmasComponents/CarouselScreen";
import {  getCarouselData } from "../xmas/XmasAction";
import MobileBackground from "./HomeComps/MobileBackground";
import DesktopRightSideMenu from "./HomeComps/DesktopRightSideMenu";
import AdsBanner from "@/components/adsBanner/page";
import { getAds, getAdsByCategory } from "../action";
 
export const maxDuration = 300;
export default async function Layout({children}:{children:any})
{
//  const data:any=await getCarouselData()
 const adsData=await getAds()
         const adsDataByCategory=await getAdsByCategory() as {data:any}
       
         const filterCategoryHaveAds=adsDataByCategory?.data?.find((item)=>{
             return item?.Title?.includes("home")
         })
       
         const getFilteredAds=()=>{
             if(!filterCategoryHaveAds)
             {
                return [...adsData.data]
             }
             else
             {
               const arrangingAds:any[]=[]
               filterCategoryHaveAds?.ad_ids.split(',').forEach((rowId)=>{
                   adsData.data.forEach((item)=>{
                         if(rowId==item.ad_id)
                         {
                            arrangingAds.push(item)
                         }
                   })
              })
                  return arrangingAds
             }
         }
        const arrangingAds=getFilteredAds()
 
     return <>
            <div className='min-[800px]:hidden fixed z-[0] top-0 h-screen bg-black w-full'></div>
            <MobileBackground></MobileBackground>
            <DesktopRightSideMenu></DesktopRightSideMenu>
    <ScrollLayout className="mt-[360px]">
         <HomeDashBoard></HomeDashBoard>
   </ScrollLayout>
   <AdsBanner adsData={arrangingAds} style={{zIndex:"2"}}></AdsBanner>
   
   {/* <RightSideMenu /> */}
 
           {children}
     </>
}