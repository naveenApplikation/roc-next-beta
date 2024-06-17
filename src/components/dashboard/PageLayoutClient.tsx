"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
import MapWithMenu from "@/components/RightSideMenu/MapWithMenu";

const PageLayoutClient = () => {
  const { modalClick, showMap, iconClick } = useMyContext();

  return (
    <>
      {showMap && <MapWithMenu />}
      <PlacesModalScreen showMap={showMap} />
    </>
  );
};

export default PageLayoutClient;
