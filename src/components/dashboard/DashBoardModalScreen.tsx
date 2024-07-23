"use client";

import React, { useState } from "react";
import { useMyContext } from "@/app/Context/MyContext";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ProfileMylistModalScreen from "@/components/AllModalScreen/ProfileMylistModalScreen";
import MyBookMarkModal from "@/components/AllModalScreen/MyBookMarkModal";
import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
 
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
import PrivacyPolicy from "../homepage/PrivacyAndPolicyModal/page";



type mylisttabs = "Created" | "Contributed";
type myBookmarktabs = "Lists" | "Events";

const DashBoardModalScreen = () => {
  const {showMap} = useMyContext();
 
  
  const [myListtabValue, setMyListTabValue] = useState("Created");
  const [myBookMarkState, setMyBookMarkState] = useState("Lists");
 
  const options = ["Lists", "Places", "What's On"];
  const mylistoptions = ["Created", "Contributed"];
  const myBookmarkoptions = ["Lists", "Events"];

  const myListtabChange = async (value: mylisttabs) => {
    setMyListTabValue(value);
  };

  const myBookmarktabChange = async (value: myBookmarktabs) => {
    setMyBookMarkState(value);
  };
 

  return (
    <>
    
      <SearchModalScreen {...{  options, showMap }} />
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen
        {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
      />
        <MyBookMarkModal
        {...{ myBookmarktabChange, myBookmarkoptions, myBookMarkState, showMap }}
      />
       <PrivacyPolicy {...{showMap}}></PrivacyPolicy>
      <FilterModalScreen showMap={showMap} />
      <FilterListModalScreen showMap={showMap} />
      <PlacesModalScreen showMap={showMap} />
    
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
