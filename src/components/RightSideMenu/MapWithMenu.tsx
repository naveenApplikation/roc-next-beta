import React from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  logoBlack,
  mapBlack,
  mapIcon,
  profileBlack,
  NewLogoRoc
} from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import GoogleMapComp from "@/components/googleMap/page";
import MapNavigator from "@/components/mapNavigator/page";
import SearchInput from "../../components/searchInput/SearchInput";

const RightSideHeadMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    /* padding: 0px 16px; */
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
`;

const HeaderMapProfileContainer = styled.div`
  display: flex;
  /* align-items:center; */
  gap: 16px;
`;

const MapSection = styled.div<{
  $showMap: boolean;
}>`
  position: relative;
  .googleMap {
    height: 100vh;
    width: ${({ $showMap }) =>
      $showMap
        ? "calc(100vw - 480px)"
        : "calc(100vw - 580px)"}; /* Adjust width based on $showMap */
    transition: width 0.6s ease; /* Adjust transition timing function and duration */
    z-index: 0;
    @media screen and (max-width: 800px) {
      width: 100vw;
    }
    div {
      outline: none !important;
    }
  }
  .mapHeader {
    position: absolute;
    top: 50px;
    z-index: 3;
    width: 100%;
    padding: 20px 10px 0px 10px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    z-index: 2;
  }
`;

const SearchFilterSection = styled.div`
  position: absolute;
  bottom: 105px;
  width: 100%;
  overflow: auto;
  display: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;
  box-shadow: 0px 0px 0px 0px #5229001a;
  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;

const MapSearch = styled.div`
  background-color: white !important;
  width: 100%;
  position: absolute;
  bottom: 0px;
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px -8px 40px 0px #00000040;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const MapWithMenu = () => {
  const { modalClick, showMap, iconClick } = useMyContext();

  return (
    <MapSection $showMap={showMap}>
      <RightSideHeadMenu className="mapHeader">
        <Image
          style={{ width: "116.615px", height: "48px" }}
          src={NewLogoRoc}
          alt="Logo Outline"
        />
        <HeaderMapProfileContainer>
          <Image
            style={{ width: "48px", height: "48px" }}
            src={showMap ? mapBlack : mapIcon}
            alt="Logo Outline"
            onClick={() => iconClick("mapClick")}
          />
          <Image
            style={{ width: "48px", height: "48px" }}
            src={profileBlack}
            alt="Logo Outline"
            onClick={() => modalClick("createAccountModal")}
          />
        </HeaderMapProfileContainer>
      </RightSideHeadMenu>
      <GoogleMapComp />
      <SearchFilterSection>
        <MapNavigator />
      </SearchFilterSection>
      <MapSearch>
        <InputWrapper className="filterInput">
          <SearchInput />
        </InputWrapper>
      </MapSearch>
    </MapSection>
  );
};

export default MapWithMenu;
