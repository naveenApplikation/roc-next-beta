"use client";

import styled from "styled-components";
import React, { useState } from "react";
import Dashboard from "@/components/dashboard/DashBoardPage";
import { useMyContext } from "@/app/Context/MyContext";
import ShadowWrapper from "@/components/Beta UI/page";
import Header from "@/components/header/page";
import RightSideMenu from "@/components/RightSideMenu/page";
import MapWithMenu from "@/components/RightSideMenu/MapWithMenu";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ProfileMylistModalScreen from "@/components/AllModalScreen/ProfileMylistModalScreen";
import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
import PlaceOrderOnlineModalScreen from "@/components/AllModalScreen/PlaceOrderOnlineModalScreen";
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import ActivitiesModalScreen from "@/components/AllModalScreen/ActivitiesModalScreen";
import DirectoryModalScreen from "@/components/AllModalScreen/DirectoryModalScreen";
import { toast, ToastContainer } from "react-toastify";
import InfoAppScreen from "@/components/AllModalScreen/InfoAppModalScreen";
import PageLayout from "./pageLayout";

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: 580px;
`;

const MainContainer = styled.div`
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    border-radius: 24px 24px 0px 0px;
    height: auto;
    overflow: hidden;
    margin-top: 500px;
    z-index: 1;
  }
`;

const DashboardMenu = styled.div<{
  $showMap: boolean;
}>`
  width: ${({ $showMap }) => ($showMap ? "480px" : "580px")};
  padding-bottom: ${({ $showMap }) => ($showMap ? "0" : "0")};
  background: #f2f3f3;
  transition: width 0.6s ease; /* Adjust transition timing function and duration */
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
.shoadow_wrapper_container{
  opacity:0;
}
  @media screen and (max-width: 800px) {
    display: ${({ $showMap }) => ($showMap ? "none" : "flex")};
    width: 100%;
    min-height: ${({ $showMap }) =>
    $showMap ? "calc(100vh - 500px)" : "100vh"};
  }
`;

type mylisttabs = "Created" | "Contributed";

export default function Home() {
  const { modalClick, showMap, iconClick } = useMyContext();
  const [showContent, setShowContent] = useState(false);

  const [myListtabValue, setMyListTabValue] = useState("Created");

  const mylistoptions = ["Created", "Contributed"];

  const myListtabChange = (value: mylisttabs) => {
    setMyListTabValue(value);
  };
  return (
    <ShadowWrapper {...{ showContent, setShowContent }}>
      <Container>
        <MainContainer>
          <PageLayout>
            <DashboardMenu $showMap={showMap}>
              <Header className={showContent ? "shoadow_wrapper_container" : ""} {...{ modalClick, iconClick, showMap }} />
              <Dashboard />
            </DashboardMenu>
          </PageLayout>
        </MainContainer>
        <RightSideMenu />
      </Container>
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen {...{ myListtabChange, mylistoptions, myListtabValue, showMap }} />
      <FilterModalScreen showMap={showMap} />
      <PlacesModalScreen showMap={showMap} />
      <CalenderBookDatesModalScreen showMap={showMap} />
      <PlaceOrderOnlineModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap} />
      <ActivitiesModalScreen showMap={showMap} />
      <DirectoryModalScreen showMap={showMap} />
      <ViewDirectionModalScreen showMap={showMap} />
      <InfoAppScreen {...{ showMap }} />
    </ShadowWrapper>
  );
}
