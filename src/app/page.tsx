import React, { Suspense, useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/DashBoardPage";
import ShadowWrapper from "@/components/Beta UI/page";
import Header from "@/components/header/page";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "./pageLayout";
import DashBoardModalScreen from '@/components/dashboard/DashBoardModalScreen'
import {Container,DashboardMenu,MainContainer} from '@/app/style'



export default function Home() {
 
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      {/* <ShadowWrapper {...{ showContent, setShowContent }}> */}
      <Container>
        <MainContainer>
          <PageLayout>
            <DashboardMenu>
              <Header />
              <Dashboard />
            </DashboardMenu>
          </PageLayout>
        </MainContainer>
        <RightSideMenu />
      </Container>
      <DashBoardModalScreen />
      {/* </ShadowWrapper> */}
    </Suspense>
  );
}
