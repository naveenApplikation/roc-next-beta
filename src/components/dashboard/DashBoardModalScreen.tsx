"use client";

import React, { useState } from "react";
import { useMyContext } from "@/app/Context/MyContext";
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
import InfoAppScreen from "@/components/AllModalScreen/InfoAppModalScreen";
import WalksModal from "@/components/AllModalScreen/WalksModal";
import SearchModalScreen from "@/components/AllModalScreen/SearchModalScreen";
import ReservationCalenderModal from "@/components/AllModalScreen/reservationCalenderModal";
import FilterListModalScreen from "@/components/AllModalScreen/FilterListModalScreen";
import BetaExploreModal from "@/components/modal/BetaExploreModal";

type tabs = "Lists" | "Places";

type mylisttabs = "Created" | "Contributed";

const DashBoardModalScreen = () => {
  const { modalClick, showMap, iconClick, setModalNames } = useMyContext();
  const [showContent, setShowContent] = useState(false);
  const [tabValue, setTabValue] = useState("Lists");
  const [myListtabValue, setMyListTabValue] = useState("Created");
  // const [listData, setListData] = useState<string[]>([])
  const options = ["Lists", "Places"];
  const mylistoptions = ["Created", "Contributed"];

  const myListtabChange = async (value: mylisttabs) => {
    setMyListTabValue(value);
  };
  const tabChange = (value: tabs) => {
    setTabValue(value);
  };

  return (
    <>
      <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen
        {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
      />
      <FilterModalScreen showMap={showMap} />
      <FilterListModalScreen showMap={showMap} />
      <PlacesModalScreen showMap={showMap} />
      {/* <CalenderBookDatesModalScreen showMap={showMap} /> */}
      <PlaceOrderOnlineModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap} />
      <ActivitiesModalScreen showMap={showMap} />
      <DirectoryModalScreen showMap={showMap} />
      <ViewDirectionModalScreen showMap={showMap} />
      <ReservationCalenderModal showMap={showMap} />
      <WalksModal />
      <BetaExploreModal />
      <InfoAppScreen {...{ showMap }} />
    </>
  );
};

export default DashBoardModalScreen;
