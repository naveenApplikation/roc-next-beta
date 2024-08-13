import React from "react";
import Dashboard from "@/components/dashboard/DashBoardPage";
import Header from "@/components/header/page";
import RightSideMenu from "@/components/RightSideMenu/page";
import PageLayout from "./pageLayout";
import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
import { Container, DashboardMenu, MainContainer } from "@/app/style";
import ScrollSet from "@/components/dashboard/ScrollSet";
export const maxDuration = 300;
export default function Home() {
  return (
    <>
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
