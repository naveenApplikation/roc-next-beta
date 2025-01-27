import { ReactNode } from "react";
import ScrollLayout from "../xmas/XmasComponents/ScrollLayout";

import '@/app/tailwind.css'
import App from "./IconToSvg";
import HomeDashBoard from "./HomeComps/HomeDashBoard";
import RightSideMenu from "@/components/RightSideMenu/page";
import Carousel from "../xmas/XmasComponents/CarouselScreen";
import { getCarouselData } from "../xmas/XmasAction";
import MobileBackground from "./HomeComps/MobileBackground";
import DesktopRightSideMenu from "./HomeComps/DesktopRightSideMenu";
export const maxDuration = 300;
export default async function Layout({children}:{children:any})
{
 const data:any=await getCarouselData()
     return <>
            <div className='min-[800px]:hidden fixed z-[0] top-0 h-screen bg-black w-full'></div>
            <MobileBackground></MobileBackground>
            <DesktopRightSideMenu></DesktopRightSideMenu>
    <ScrollLayout className="mt-[360px]">
         <HomeDashBoard></HomeDashBoard>
   </ScrollLayout>

   {/* <RightSideMenu /> */}
 
           {children}
     </>
}