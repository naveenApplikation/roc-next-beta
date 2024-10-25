import React, { Suspense } from "react";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "../pageLayout";
import Image from "next/image";
import ScrollSet from "@/components/dashboard/ScrollSet";
export const maxDuration = 300;
import backgroundImg from "../../../assets/bg040724.webp";
import "@/app/tailwind.css"
 
 
// import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
const BottomSheetComp=dynamic(()=>import("@/components/dashboard/BottomSheet"),{ssr:false});

import DashBoard from "@/components/dashboard/DashBoardPage";
import dynamic from "next/dynamic";
import Loading from "@/components/dashboard/loading";
import Header from "@/components/header/page";
 
const  DashBoardModalScreen=dynamic(()=>import("@/components/dashboard/DashBoardModalScreen"),{ssr:false})
export default async function Page() {
   
  
  return (
    <>
          
        <div className="h-screen scroll-smooth   overflow-auto  max-[800px]:h-auto max-[800px]:overflow-hidden max-[800px]:rounded-t-3xl max-[800px]:mt-[470px] max-[800px]:z-[1] max-[800px]:bg-white no-scrollbar">
          <PageLayout>
            <ScrollSet>
            <BottomSheetComp>
              <div className="w-[480px] overflow-hidden  scroll-smooth h-auto bg-white transition-all duration-[600ms] ease-in-out bg-blend-normal shadow-[0_-8px_40px_0_rgba(0,0,0,0.25)] relative z-[1] flex flex-col gap-6 min-h-screen max-[800px]:w-full">
                 <Header></Header>
           
                 <Suspense fallback={<Loading></Loading>}>
            <DashBoard></DashBoard>
              </Suspense>
                    
               
              </div>
              </BottomSheetComp>
            </ScrollSet>
          </PageLayout>
        </div>
        
        <RightSideMenu>
        <div
        className="hidden max-[800px]:block background-image-wrapper"
        style={{ position: "absolute", inset: 0, zIndex: -1 }}>
        <Image
          src={backgroundImg.src}
          layout="fill"
          objectFit="cover"
          alt="Background"
          priority
        
        />
      </div>
        </RightSideMenu>
      <DashBoardModalScreen></DashBoardModalScreen>
  
    </>
  );
}
