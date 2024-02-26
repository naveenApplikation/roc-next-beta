"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import RightSideLogo from "../../../assets/images/RightSideLogo.png";
import { rightSideMenu, rightSideMenuMobile } from "../dashboard/data";
import mapIcon from "../../../assets/images/mapIcon.png";
import profileIcon from "../../../assets/images/profileIcon.png";
import { useRouter } from "next/navigation";
import { headerHome, user } from "../utils/ImagePath";
import Header from "@/components/header/page";
import DashBoardModal from "../../components/modal/Modal";
import CalenderModalLayout from "../../components/modal/Modal";
import CalenderPlaceModalLayout from "../../components/modal/Modal";
import CreateAccountModalLayout from "../../components/modal/Modal";
import LoginAccountModalLayout from "../../components/modal/Modal";
import UpdateMyDetailsModalLayout from "../../components/modal/Modal";
import UpdateMyEmailModalLayout from "../../components/modal/Modal";
import UpdateMyPreferencesModalLayout from "../../components/modal/Modal";
import WelcomeBackModalLayout from "../../components/modal/Modal";
import CalenderConfirmModalLayout from "../../components/modal/Modal";
import ModalContent from "../dashboard/ModalContent";
import CalenderModal from "../dashboard/calenderModal";
import CommonButton from "@/components/button/CommonButton";
import PlacesFormModal from "../dashboard/placesFormModal";
import PlacesConfirmModal from "../dashboard/placeConfirmNodal";
import CreateAccountContent from "../dashboard/Menu Modal Contents/CreateAccount";
import LoginAccountContent from "../dashboard/Menu Modal Contents/Login";
import UpdateMyDetails from "../dashboard/Menu Modal Contents/UpdateMyDetails";
import UpdateMyEmail from "../dashboard/Menu Modal Contents/UpdateMyEmail";
import UpdateMyPreferences from "../dashboard/Menu Modal Contents/UpdateMyPreferences";
import Welcomeback from "../dashboard/Menu Modal Contents/Welcomeback";
import MapNavigator from "@/components/mapNavigator/page";
import SearchInput from "../../components/searchInput/SearchInput";
import LeafletMaps from "@/components/map/page";

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
    z-index: 3;
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
  $focused: boolean;
}>`
  width: ${({ $showMap }) => ($showMap ? "480px" : "580px")};
  paddingbottom: ${({ $showMap }) => ($showMap ? "0" : "0")};
  background: #f2f3f3;
  transition: 0.8s;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;

  @media screen and (max-width: 800px) {
    /* height: 100vh; */
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
const MapSection = styled.div`
  position: relative;
  .leaflet-container {
    height: 100vh;
    width: calc(100vw - 480px);
    transition: 0.5s;
    z-index: 0;
    @media screen and (max-width: 800px) {
      width: 100vw;
      height: 525px;
    }
  }
  .mapHeader {
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
    padding: 40px 34px;
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

const Layout = (WrappedComponent: any) => {
  const Hoc = () => {
    const [focused, setFocused] = useState(false);
    const [calenderModal, setCalenderModal] = useState<boolean>(false);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [modalName, setModalname] = useState("");
    const specificSectionRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const handleClick = (event: MouseEvent) => {
      if (
        specificSectionRef.current &&
        !specificSectionRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };
    useEffect(() => {
      document.body.addEventListener("click", handleClick);
      return () => {
        document.body.removeEventListener("click", handleClick);
      };
    }, []);

    const menuClick = (item: any) => {
      if (item.name === "To do") {
        router.push("/community/Top Rated Restaurants");
      } else if (item.name === "Dine") {
        router.push("/community/Eco Dining");
      } else if (item.name === "Shop") {
        router.push("/community/Wellbeing");
      } else if (item.name === "Events") {
        router.push("/categories/Events");
      } else if (item.name === "Tours") {
        router.push("/categories/Stays");
      } else if (item.name === "Hotels") {
        router.push("/categories/Scaffolding");
      } else if (item.name === "Activities") {
        router.push("/categories/Experiences");
      } else if (item.name === "Travel") {
        router.push("/categories/Attractions");
      } else if (item.name === "Nightlife") {
        router.push("/categories/Financial Services");
      }
    };
    const closeModal = () => {
      setCalenderModal(false);
      setModalname("");
    };
    const modalClick = (name: string) => {
      setModalname(name);
    };
    const iconClick = (name: string) => {
      if (name === "mapClick") {
        setShowMap(!showMap);
      }
    };

    // const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentName, onClose }) => {
    //   if (modalName) {
    //     const LazyComponent = lazy(() => import(`../dashboard/${componentName}`));
    //     return (
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <LazyComponent onClose={onClose} />
    //       </Suspense>
    //     );
    //   }
    // };

    // const showModalContent = () => {
    //   if (modalName === "ModalContent") {
    //     return <ModalContent onClose={closeModal} />
    //   } else if (modalName === "calenderModal") {
    //     return (<>
    //       <CalenderModal onClose={closeModal} />
    //       <div style={{ marginTop: 16, padding: "0px 24px" }} onClick={() => modalClick("PlacesFormModal")}>
    //         <CommonButton text="Next" />
    //       </div>
    //     </>)
    //   }
    // }
    return (
      <>
        <Container>
          <MainContainer>
            <DashboardMenu
              $showMap={showMap}
              $focused={focused}
              // style={{
              //   paddingBottom: `${focused ? "0px" : "0px"}`,
              //   minHeight: showMap ? "calc(100vh - 500px)" : "100vh",
              // }}
            >
              <Header {...{ modalClick, iconClick, showMap }} />
              {/* <CreateListings /> */}
              <WrappedComponent {...{ modalClick, showMap }} />
            </DashboardMenu>
          </MainContainer>
          {showMap && (
            <MapSection>
              <RightSideHeadMenu className="mapHeader">
                <Image
                  style={{ width: "116.615px", height: "48px" }}
                  src={RightSideLogo}
                  alt="Logo Outline"
                />
                <HeaderMapProfileContainer>
                  <Image
                    style={{ width: "48px", height: "48px" }}
                    src={showMap ? headerHome : mapIcon}
                    alt="Logo Outline"
                    onClick={() => iconClick("mapClick")}
                  />
                  <Image
                    style={{ width: "48px", height: "48px" }}
                    src={profileIcon}
                    alt="Logo Outline"
                  />
                </HeaderMapProfileContainer>
              </RightSideHeadMenu>
              <LeafletMaps {...{ showMap }} />
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
              <Image
                style={{ width: "116.615px", height: "48px" }}
                src={RightSideLogo}
                alt="Logo Outline"
              />
              <HeaderMapProfileContainer>
                <Image
                  style={{ width: "48px", height: "48px" }}
                  src={showMap ? headerHome : mapIcon}
                  alt="Logo Outline"
                  onClick={() => iconClick("mapClick")}
                />
                <Image
                  style={{ width: "48px", height: "48px" }}
                  src={profileIcon}
                  alt="Logo Outline"
                />
              </HeaderMapProfileContainer>
            </RightSideHeadMenu>
            <RightSideMenuContainer>
              {rightSideMenu.map((item, index) => {
                return (
                  <RightSideMenu key={index}>
                    <RightSideInsideMenuBox onClick={() => menuClick(item)}>
                      <Image className="iconSize" src={item.image} alt="icon" />
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
                    <RightSideInsideMenuBox onClick={() => menuClick(item)}>
                      <Image className="iconSize" src={item.image} alt="icon" />
                      <p>{item.name}</p>
                    </RightSideInsideMenuBox>
                  </RightSideMenu>
                );
              })}
            </MobileViewRightSideMenu>
            <AllCategories>
              <button>All Categories</button>
            </AllCategories>
          </RightMenu>
        </Container>
        <DashBoardModal
          isOpen={modalName === "ModalContent"}
          onClose={closeModal}
          {...{ showMap }}
          title="Brasserie Colmar"
        >
          <ModalContent onClose={closeModal} />
        </DashBoardModal>
        <CalenderModalLayout
          isOpen={modalName === "calenderModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Brasserie Colmar"
        >
          <CalenderModal onClose={closeModal} />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={() => modalClick("calenderPlaceModal")}
          >
            <CommonButton text="Next" />
          </div>
        </CalenderModalLayout>
        <CalenderPlaceModalLayout
          isOpen={modalName === "calenderPlaceModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Brasserie Colmar"
        >
          <PlacesFormModal />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={() => modalClick("PlacesConfirmModal")}
          >
            <CommonButton text="Next" />
          </div>
        </CalenderPlaceModalLayout>
        <CalenderConfirmModalLayout
          isOpen={modalName === "PlacesConfirmModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Brasserie Colmar"
        >
          <PlacesConfirmModal />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={closeModal}
          >
            <CommonButton text="Done" />
          </div>
        </CalenderConfirmModalLayout>
        <CreateAccountModalLayout
          isOpen={modalName === "createAccountModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Create an account"
        >
          <CreateAccountContent
            isOpen={() => modalClick("LoginAccountModal")}
            nextModal={() => modalClick("WelcomeBackModal")}
          />
        </CreateAccountModalLayout>
        <LoginAccountModalLayout
          isOpen={modalName === "LoginAccountModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Login"
        >
          <LoginAccountContent
            previousModal={() => modalClick("createAccountModal")}
            nextModal={() => modalClick("WelcomeBackModal")}
          />
        </LoginAccountModalLayout>
        <WelcomeBackModalLayout
          isOpen={modalName === "WelcomeBackModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Welcome back!"
        >
          <Welcomeback isOpen={() => modalClick("UpdateMyDetailsModal")} />
        </WelcomeBackModalLayout>
        <UpdateMyDetailsModalLayout
          isOpen={modalName === "UpdateMyDetailsModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Update my details"
        >
          <UpdateMyDetails isOpen={() => modalClick("UpdateMyEmailModal")} previousModal={() => modalClick("WelcomeBackModal")} />
        </UpdateMyDetailsModalLayout>
        <UpdateMyEmailModalLayout
          isOpen={modalName === "UpdateMyEmailModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Update my email"
        >
          <UpdateMyEmail
            isOpen={() => modalClick("UpdateMyPreferencesModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </UpdateMyEmailModalLayout>
        <UpdateMyPreferencesModalLayout
          isOpen={modalName === "UpdateMyPreferencesModal"}
          onClose={closeModal}
          {...{ showMap }}
          title="Update my preferences"
        >
          <UpdateMyPreferences previousModal={() => modalClick("UpdateMyEmailModal")} />
        </UpdateMyPreferencesModalLayout>
      </>

      // <LeafletMap />
    );
  };
  return Hoc;
};

export default Layout;
