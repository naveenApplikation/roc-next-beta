import React, { Suspense } from "react";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "@//app/pageLayout";
import Image from "next/image";
import ScrollSet from "@/components/dashboard/ScrollSet";
export const maxDuration = 300;

import "@/app/tailwind.css";

// import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";

import DashBoard from "@/components/dashboard/DashBoardPage";
import dynamic from "next/dynamic";
import Loading from "@/components/dashboard/loading";
import Header from "@/components/header/page";
import { backgroundImage } from "./utils/ImagePath";
const AdsBanner = dynamic(() => import("@/components/adsBanner/page"));
import BottomSheetComp from "@/components/dashboard/BottomSheet";
import BottomSheetV2 from "@/components/dashboard/BottomSheetV2";

const DashBoardModalScreen = dynamic(
  () => import("@/components/dashboard/DashBoardModalScreen"),
  { ssr: false }
);

export default async function Page() {
  return (
    <>
      <Suspense fallback={<Loading></Loading>}>
        {/* <BottomSheetComp> */}
        <div className="relative z-[1] ">
          <BottomSheetV2>
            <div className="scroll-smooth h-auto   flex flex-col gap-[24px] min-h-screen max-[800px]:w-full">
              <DashBoard></DashBoard>
            </div>
          </BottomSheetV2>
        </div>

        {/* </BottomSheetComp> */}
      </Suspense>
      <AdsBanner maxWidth="auto" />

      <RightSideMenu>
        <div
          className="hidden max-[800px]:block background-image-wrapper"
          style={{ position: "absolute", inset: 0, zIndex: -1 }}
        >
          <Image
            src={backgroundImage.src}
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
