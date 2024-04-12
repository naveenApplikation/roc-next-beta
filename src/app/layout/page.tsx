"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { rightSideMenu, rightSideMenuMobile } from "../dashboard/data";
import { useRouter } from "next/navigation";
import {
  headerHome,
  logoBlack,
  mapBlack,
  mapIcon,
  profileBlack,
} from "../utils/ImagePath";
import Header from "@/components/header/page";
import FilterModal from "../../components/modal/FilterModal";
import DirectionModal from "../../components/modal/DirectionModal";
import AddToDirectoryModal from "../../components/modal/AddToDirectoryModal";
import CreateDirectoryModal from "../../components/modal/CreateDirectoryModal";
import ThankYouDiresctoryModal from "../../components/modal/ThankYouDiresctoryModal";
import FilterModalLayout from "../../components/modal/Modal";
import DirectionModalLayout from "../../components/modal/Modal";
import OrderOnlineModalLayout from "../../components/modal/Modal";
import OrderOnlineModal from "../dashboard/orderOnlineModal";
import MapNavigator from "@/components/mapNavigator/page";
import SearchInput from "../../components/searchInput/SearchInput";
import GoogleMapComp from "@/components/googleMap/page";
import ShadowWrapper from "@/components/Beta UI/page";
import { useMyContext } from "@/app/Context/MyContext";
import ProfileAccountModalScreen from '@/components/AllModalScreen/ProfileAccountModalScreen'
import ProfileMylistModalScreen from '@/components/AllModalScreen/ProfileMylistModalScreen'
import SearchModalScreen from '@/components/AllModalScreen/SearchModalScreen'
import FilterModalScreen from '@/components/AllModalScreen/FilterModalScreen'
import PlacesModalScreen from '@/components/AllModalScreen/PlacesModalScreen'
import ViewDirectionModalScreen from '@/components/AllModalScreen/ViewDirectionModalScreen'
import CalenderBookDatesModalScreen from '@/components/AllModalScreen/CalenderBookDatesModalScreen'
import PlaceOrderOnlineModalScreen from '@/components/AllModalScreen/PlaceOrderOnlineModalScreen'
import EventListingModalScreen from '@/components/AllModalScreen/EventListingModalScreen'
import ActivitiesModalScreen from '@/components/AllModalScreen/ActivitiesModalScreen'
import DirectoryModalScreen from '@/components/AllModalScreen/DirectoryModalScreen'

interface LayoutProps {
  children: any;
  createAccountModal?: boolean;
  setCreateAccountModal?: Function;
}
interface DynamicComponentProps {
  componentName: string;
  onClose: Function;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
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

const RightSideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  padding: 40px;
  gap: 24px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px;
    height: auto;
    overflow: hidden;
    flex-direction: row;
    display: none;
  }
`;

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

  @media screen and (max-width: 800px) {
    display: ${({ $showMap }) => ($showMap ? "none" : "flex")};
    width: 100%;
    min-height: ${({ $showMap }) =>
      $showMap ? "calc(100vh - 500px)" : "100vh"};
  }
`;

const RightSideMenu = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const RightSideInsideMenuBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 129px;
  height: 64px;
  padding: 16px 24px;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;
  .iconSize {
    width: 22px;
    height: auto;
  }

  p {
    /* font-family: Inter; */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @media screen and (max-width: 800px) {
      color: white;
    }
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.16);
  }
  @media screen and (max-width: 530px) {
    flex-direction: column;
  }
  @media screen and (max-width: 450px) {
    padding: 8px;
  }
`;

const RightMenu = styled.div`
  position: fixed;
  right: 24px;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    height: 500px;
    padding: 16px;
    position: fixed;
    top: 0;
    width: 100%;
    right: 0;
  }
`;

const MobileViewRightSideMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    z-index: 23;
  }
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
      height: 525px;
    }
    div {
      outline: none !important;
    }
  }
  .mapHeader {
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
    padding: 40px 15px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
    top: 0;
    z-index: 2;
  }
`;

const SearchFilterSection = styled.div`
  position: absolute;
  bottom: 40px;
  /* left:30px; */
  padding: 0px 15px;
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
  bottom: -126px;
  min-height: 22vh;
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px -8px 40px 0px #00000040;
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const AllCategories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;

  button {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.16);
    border: none;
    border-radius: 8px;
    padding: 12px 8px;
    color: #fff;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const options = ["Lists", "Places"];
type tabs = "Lists" | "Places";
const mylistoptions = ["Created", "Contributed"];
type mylisttabs = "Created" | "Contributed";

const Layout = (WrappedComponent: any) => {
  const Hoc = () => {
    // const [showMap, setShowMap] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState("Lists");

    const router = useRouter();

    const { modalName, closeModal, modalClick, dataDetails,modalType,showMap,iconClick } = useMyContext();

    const menuClick = (item: any,condition?: boolean,id?:number) => {
      if (item.name === "To do") {
        router.push(`/categories/Top Rated Restaurants?search=${id}`);
      } else if (item.name === "Dine") {
        router.push("/screens/events");
      } else if (item.name === "Shop") {
        router.push("/screens/events");
      } else if (item.name === "Events") {
        router.push("/screens/events");
      } else if (item.name === "Tours") {
        router.push("/screens/stays");
      } else if (item.name === "Hotels") {
        router.push("/screens/scaffolding");
      } else if (item.name === "Activities") {
        router.push("/screens/experiences");
      } else if (item.name === "Travel") {
        router.push("/screens/attractions");
      } else if (item.name === "Nightlife") {
        router.push("/screens/financial");
      } else if (item === "CategorieList") {
        router.push("/screens/categorieList");
      }
    };

    // const iconClick = (name: string) => {
    //   if (name === "mapClick") {
    //     setShowMap(!showMap);
    //   }
    // };

    const [myListtabValue, setMyListTabValue] = useState("Created");

    const myListtabChange = (value: mylisttabs) => {
      setMyListTabValue(value);
    };


    const [CreateListState, setCreateListState] = useState("");

    const CreateListHandle = (name: string) => {
      setCreateListState(name);
    };

    const tabChange = (value: tabs) => {
      setTabValue(value);
    };
    return (
      <ShadowWrapper>
        <Container>
          <MainContainer>
            <DashboardMenu $showMap={showMap}>
              <Header {...{ modalClick, iconClick, showMap }} />
              <WrappedComponent
                {...{ modalClick, showMap, CreateListHandle }}
              />
            </DashboardMenu>
          </MainContainer>
          {showMap && (
            <MapSection $showMap={showMap}>
              <RightSideHeadMenu className="mapHeader">
                <Image
                  style={{ width: "116.615px", height: "48px" }}
                  src={logoBlack}
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
              {/* <DynamicMap {...{ showMap }} /> */}
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
          )}
          <RightMenu>
            <RightSideHeadMenu>
              <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201662.png?alt=media&token=1d8c1112-bb3f-4b87-b411-5f30d9a923e4"} width={117} height={48} alt="Logo Outline" />
              <HeaderMapProfileContainer>
                <Image
                  src={showMap ? headerHome : "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSubtract.png?alt=media&token=139cba6b-da87-459e-a98f-1175af63647b"}
                  alt="Logo Outline"
                  width={48}
                  height={48}
                  onClick={() => iconClick("mapClick")}
                />
                <Image
                  src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSubtract%20(1).png?alt=media&token=076b658c-cbac-4ea1-86a3-343611447c45"}
                  width={48}
                  height={48}
                  alt="Logo Outline"
                  onClick={() => modalClick("createAccountModal")}
                />
              </HeaderMapProfileContainer>
            </RightSideHeadMenu>
            <RightSideMenuContainer>
              {rightSideMenu.map((item, index) => {
                return (
                  <RightSideMenu key={index}>
                    <RightSideInsideMenuBox>
                      <Image
                        style={{
                          width: item.name == "All" ? "22px" : "auto",
                          height: item.name == "All" ? "auto" : "revert-layer",
                        }}
                        src={item.image}
                        width={item.width}
                        height={item.height}
                        alt="icon"
                      />
                      <p>{item.name}</p>
                    </RightSideInsideMenuBox>
                  </RightSideMenu>
                );
              })}
            </RightSideMenuContainer>
            <MobileViewRightSideMenu>
              {rightSideMenuMobile.map((item, index) => {
                return (
                  <RightSideMenu key={index}>
                    <RightSideInsideMenuBox >
                      <Image src={item.image} width={item.width} height={item.height} alt="icon" />
                      <p>{item.name}</p>
                    </RightSideInsideMenuBox>
                  </RightSideMenu>
                );
              })}
            </MobileViewRightSideMenu>
            <AllCategories>
              <button onClick={() => menuClick("CategorieList")}>
                All Categories
              </button>
            </AllCategories>
          </RightMenu>
        </Container>
        <ProfileAccountModalScreen showMap={showMap} />
        <ProfileMylistModalScreen {...{ myListtabChange, mylistoptions, myListtabValue, showMap }} />
        {/* <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} /> */}
        <FilterModalScreen showMap={showMap}  />
        <PlacesModalScreen showMap={showMap}  />
        <CalenderBookDatesModalScreen showMap={showMap} />
        <PlaceOrderOnlineModalScreen showMap={showMap} />
        <EventListingModalScreen showMap={showMap}  />
        <ActivitiesModalScreen showMap={showMap}  />
        <DirectoryModalScreen showMap={showMap}  />
        <ViewDirectionModalScreen showMap={showMap}  />
      </ShadowWrapper>
    );
  };
  return Hoc;
};

export default Layout;
