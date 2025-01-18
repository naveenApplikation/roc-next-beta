import React from "react";
import Dashboard from "@/components/dashboard/DashBoardPage";
import Header from "@/components/header/page";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "./pageLayout";
import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
import { Container, DashboardMenu, MainContainer } from "@/app/style";
import ScrollSet from "@/components/dashboard/ScrollSet";
export const maxDuration = 300;
import "./globals.css";
import "@/app/tailwind.css"
import AdsBanner from "@/components/adsBanner/page";
import BottomSheet from "@/components/dashboard/BottomSheetV2";
export default function Home() {
  return (
    <>
{/* 
<div className='min-[800px]:hidden fixed z-[1] top-0 h-screen bg-white w-full'></div> */}
  <BottomSheet>
            <div className="scroll-smooth h-auto   flex flex-col gap-[24px] min-h-screen max-[800px]:w-full">
            <Dashboard />
            </div>
</BottomSheet>
      <Container>
        <MainContainer>
          <PageLayout>
            <ScrollSet>
              <DashboardMenu>
                <Header />
                <Dashboard />
              </DashboardMenu>
            </ScrollSet>
          </PageLayout>
        </MainContainer>
        <RightSideMenu />
      </Container>
      <DashBoardModalScreen />
    </>
  );
}
