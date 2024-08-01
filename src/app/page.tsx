import React from "react";
import Dashboard from "@/components/dashboard/DashBoardPage";
import Header from "@/components/header/page";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "./pageLayout";
import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
import { Container, DashboardMenu, MainContainer } from "@/app/style";
export const maxDuration = 300;
export default function Home() {
  return (
    <>
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
    </>
  );
}
