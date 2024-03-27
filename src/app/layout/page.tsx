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
  profileIcon,
  profileWhite,
  MobileMap,
  MobileProfile,
  MobileRocLogo,
} from "../utils/ImagePath";
import Header from "@/components/header/page";
import FilterModal from "../../components/modal/FilterModal";
import DirectionModal from "../../components/modal/DirectionModal";
import AddToDirectoryModal from "../../components/modal/AddToDirectoryModal";
import CreateDirectoryModal from "../../components/modal/CreateDirectoryModal";
import ThankYouDiresctoryModal from "../../components/modal/ThankYouDiresctoryModal";
import FilterModalLayout from "../../components/modal/Modal";
import AddToDirectoryModalLayout from "../../components/modal/Modal";
import DirectionModalLayout from "../../components/modal/Modal";
import DashBoardModal from "../../components/modal/Modal";
import CalenderModalLayout from "../../components/modal/Modal";
import CreateAccountModalLayout from "../../components/modal/Modal";
import LoginAccountModalLayout from "../../components/modal/Modal";
import UpdateMyDetailsModalLayout from "../../components/modal/Modal";
import UpdateMyEmailModalLayout from "../../components/modal/Modal";
import UpdateMyPreferencesModalLayout from "../../components/modal/Modal";
import OrderOnlineModalLayout from "../../components/modal/Modal";
import WelcomeBackModalLayout from "../../components/modal/Modal";
import SearchModalLayout from "../../components/searchModal/page";
import ModalContent from "../dashboard/ModalContent";
import OrderOnlineModal from "../dashboard/orderOnlineModal";
import CalenderModal from "../dashboard/calenderModal";
import CommonButton from "@/components/button/CommonButton";
import PlacesFormModal from "../dashboard/placesFormModal";
import PlacesConfirmModal from "../dashboard/placeConfirmNodal";
import CreateAccountContent from "../dashboard/Menu Modal Contents/CreateAccount";
import LoginAccountContent from "../dashboard/Menu Modal Contents/Login";
import UpdateMyDetails from "../dashboard/Menu Modal Contents/UpdateMyDetails";
import UpdateMyEmail from "../dashboard/Menu Modal Contents/UpdateMyEmail";
import UpdateName from "../dashboard/Menu Modal Contents/UpdateName";
import UpdatePasssword from "../dashboard/Menu Modal Contents/UpdatePasssword";
import ContactUs from "../dashboard/Menu Modal Contents/ContactUs";
import UpdateMyPreferences from "../dashboard/Menu Modal Contents/UpdateMyPreferences";
import Welcomeback from "../dashboard/Menu Modal Contents/Welcomeback";
import MapNavigator from "@/components/mapNavigator/page";
import SearchInput from "../../components/searchInput/SearchInput";
import dynamic from "next/dynamic";
import DashboardSearchContainer from "@/components/dashboardSearchContainer/page";
import GoogleMapComp from "@/components/googleMap/page";

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
    width: ${({ $showMap }) => ($showMap ? "calc(100vw - 480px)" : "calc(100vw - 580px)")}; /* Adjust width based on $showMap */
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

const SearchedContainer = styled.div`
  background-color: #f2f3f3;
  padding: 0px 40px;
  border-radius: 24px 24px 0px 0px;
  transition: 5s;
  min-height: 100vh;
  @media screen and (max-width: 800px) {
    box-shadow: none;
    background-color: transparent;
    padding: 0px 15px;
  }

  .ant-segmented {
    width: 100%;
    min-height: 32px;
    padding: 3px;
    background-color: #7676801f;
  }
  .filterInput {
    padding: 0px;
    box-shadow: 0px 0px 0px 0px #5229001a;
    box-shadow: 0px 9px 21px 0px #5229001a;
    margin: 15px 0px;
  }
  .ant-segmented-item {
    flex-grow: 1;
  }
  :where(.css-dev-only-do-not-override-1rqnfsa).ant-segmented
    .ant-segmented-item-selected {
    border-radius: 7px;
    box-shadow: 0px 3px 8px 0px #0000001f;
  }
  .ant-segmented-item-label {
    font-size: 13px;
    font-weight: 500;
  }
  .ant-segmented-item-selected .ant-segmented-item-label {
    font-weight: 600;
  }
`;

const options = ["Lists", "Places"];
type tabs = "Lists" | "Places";

const Layout = (WrappedComponent: any) => {
  const Hoc = () => {
    const [showMap, setShowMap] = useState<boolean>(false);
    const [modalName, setModalName] = useState<string>("");
    const specificSectionRef = useRef<HTMLDivElement>(null);
    const [tabValue, setTabValue] = useState("Lists");
    const [modalType, setModalType] = useState({
      ModalContent: false,
      orderOnlineModal: false,
      calenderModal: false,
      calenderPlaceModal: false,
      PlacesConfirmModal: false,
      createAccountModal: false,
      LoginAccountModal: false,
      WelcomeBackModal: false,
      UpdateMyDetailsModal: false,
      UpdateMyEmailModal: false,
      UpdateMyPreferencesModal: false,
      modalFilter: false,
      AddDirectoryModal: false,
      DirectionModal: false,
      search: false,
    });

    const DynamicMap = dynamic(() => import("../../components/map/page"), {
      ssr: false,
    });

    const router = useRouter();
    // const handleClick = (event: MouseEvent) => {
    //   if (
    //     specificSectionRef.current &&
    //     !specificSectionRef.current.contains(event.target as Node)
    //   ) {
    //   }
    // };
    // useEffect(() => {
    //   document.body.addEventListener("click", handleClick);
    //   return () => {
    //     document.body.removeEventListener("click", handleClick);
    //   };
    // }, []);

    const menuClick = (item: any) => {
      if (item.name === "To do") {
        // router.push("/screens/resturants");
        router.push("/screens/events");
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
      }else if (item === "CategorieList") {
        router.push("/screens/categorieList");
      }
    };
    const closeModal = (name: string) => {
      setModalType((prev: any) => ({
        ...prev,
        [name]: !prev[name] as boolean,
      }));
      setModalName("");
    };

    const modalClick = (name: string) => {
      setModalType((prev: any) => ({
        ...prev,
        [name]: !prev[name] as boolean,
      }));
      setModalName(name);
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

    const DirectoryModalHandle = () => {
      if (modalName === "AddDirectoryModal") {
        return (
          <>
            <AddToDirectoryModal
              isOpen={() => modalClick("CreateDirectoryModal")}
            />
          </>
        );
      } else if (modalName === "CreateDirectoryModal") {
        return (
          <>
            <CreateDirectoryModal
              isOpen={() => modalClick("ThankYouDiresctoryModal")}
            />
          </>
        );
      } else if (modalName === "ThankYouDiresctoryModal") {
        return (
          <>
            <ThankYouDiresctoryModal
              isOpen={() => closeModal("AddDirectoryModal")}
            />
          </>
        );
      }
    };

    const showLoginHandle = () => {
      if (modalName === "createAccountModal") {
        return (
          <>
            <CreateAccountContent
              isOpen={() => modalClick("LoginAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          </>
        );
      } else if (modalName === "LoginAccountModal") {
        return (
          <>
            <LoginAccountContent
              previousModal={() => modalClick("createAccountModal")}
              nextModal={() => modalClick("WelcomeBackModal")}
            />
          </>
        );
      } else if (modalName === "WelcomeBackModal") {
        return (
          <>
            <Welcomeback isOpen={() => modalClick("UpdateMyDetailsModal")} isOpenContact={() => modalClick("ContactUsModal")} />
          </>
        );
      } else if (modalName === "UpdateMyDetailsModal") {
        return (
          <>
            <UpdateMyDetails
              isOpen={() => modalClick("UpdateMyEmailModal")}
              isOpenName={() => modalClick("UpdateNameModal")}
              isOpenPassword={() => modalClick("UpdatePassswordModal")}
              isOpenContact={() => modalClick("UpdateMyPreferencesModal")}
              previousModal={() => modalClick("WelcomeBackModal")}
            />
          </>
        );
      } else if (modalName === "UpdateMyEmailModal") {
        return (
          <>
            <UpdateMyEmail
              isOpen={() => modalClick("WelcomeBackModal")}
              previousModal={() => modalClick("UpdateMyDetailsModal")}
            />
          </>
        );
      } else if (modalName === "UpdateNameModal") {
        return (
          <>
            <UpdateName
              isOpen={() => modalClick("WelcomeBackModal")}
              previousModal={() => modalClick("UpdateMyDetailsModal")}
            />
          </>
        );
      } else if (modalName === "UpdatePassswordModal") {
        return (
          <>
            <UpdatePasssword
              isOpen={() => modalClick("WelcomeBackModal")}
              previousModal={() => modalClick("UpdateMyDetailsModal")}
            />
          </>
        );
      } else if (modalName === "ContactUsModal") {
        return (
          <>
            <ContactUs
             isOpen={() => modalClick("LoginThankYouDiresctoryModal")}
              previousModal={() => modalClick("UpdateMyDetailsModal")}
            />
          </>
        );
      } else if (modalName === "LoginThankYouDiresctoryModal") {
        return (
          <>
            <ThankYouDiresctoryModal
              isOpen={() => closeModal("createAccountModal")}
            />
          </>
        );
      } else if (modalName === "UpdateMyPreferencesModal") {
        return (
          <>
            <UpdateMyPreferences
            isOpen={() => modalClick("WelcomeBackModal")}
              previousModal={() => modalClick("UpdateMyDetailsModal")}
            />
          </>
        );
      }
    };

    const showModalContent = () => {
      if (modalName === "calenderModal") {
        return (
          <>
            <CalenderModal onClose={closeModal} />
            <div
              style={{ marginTop: 16, padding: "0px 24px" }}
              onClick={() => modalClick("calenderPlaceModal")}
            >
              <CommonButton text="Next" />
            </div>
          </>
        );
      } else if (modalName === "calenderPlaceModal") {
        return (
          <>
            <PlacesFormModal />
            <div
              style={{ marginTop: 16, padding: "0px 24px" }}
              onClick={() => modalClick("PlacesConfirmModal")}
            >
              <CommonButton text="Next" />
            </div>
          </>
        );
      } else if (modalName === "PlacesConfirmModal") {
        return (
          <>
            <PlacesConfirmModal />
            <div
              style={{ marginTop: 16, padding: "0px 24px" }}
              onClick={() => closeModal("PlacesConfirmModal")}
            >
              <CommonButton text="Done" />
            </div>
          </>
        );
      }
    };

    const [CreateListState,setCreateListState] = useState("")

    const CreateListHandle = (name:string)=>{
      setCreateListState(name)
    }

    const tabChange = (value: tabs) => {
      setTabValue(value);
    };
    return (
      <>
        <Container>
          <MainContainer>
            <DashboardMenu $showMap={showMap}>
              <Header {...{ modalClick, iconClick, showMap }} />
              <WrappedComponent {...{ modalClick, showMap,CreateListHandle }} />
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
              <Image src={MobileRocLogo} alt="Logo Outline" />
              <HeaderMapProfileContainer>
                <Image
                  src={showMap ? headerHome : MobileMap}
                  alt="Logo Outline"
                  onClick={() => iconClick("mapClick")}
                />
                <Image
                  src={MobileProfile}
                  alt="Logo Outline"
                  onClick={() => modalClick("createAccountModal")}
                />
              </HeaderMapProfileContainer>
            </RightSideHeadMenu>
            <RightSideMenuContainer>
              {rightSideMenu.map((item, index) => {
                return (
                  <RightSideMenu key={index}>
                    <RightSideInsideMenuBox onClick={() => menuClick(item)}>
                      <Image
                        style={{
                          width: item.name == "All" ? "22px" : "auto",
                          height: item.name == "All" ? "auto" : "auto",
                        }}
                        src={item.image}
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
                    <RightSideInsideMenuBox onClick={() => menuClick(item)}>
                      <Image src={item.image} alt="icon" />
                      <p>{item.name}</p>
                    </RightSideInsideMenuBox>
                  </RightSideMenu>
                );
              })}
            </MobileViewRightSideMenu>
            <AllCategories>
              <button onClick={() => menuClick("CategorieList")} >All Categories</button>
            </AllCategories>
          </RightMenu>
        </Container>
        <DashBoardModal
          isOpen={modalType.ModalContent}
          onClose={() => closeModal("ModalContent")}
          name="ModalContent"
          {...{ showMap }}
          title="Brasserie Colmar"
        >
          <ModalContent
            onClose={() => closeModal("ModalContent")}
            reservationModal={modalClick}
          />
        </DashBoardModal>
        <DirectionModalLayout
          isOpen={modalType.DirectionModal}
          onClose={() => closeModal("DirectionModal")}
          name="DirectionModal"
          {...{ showMap }}
          title="Directions"
        >
          <DirectionModal />
        </DirectionModalLayout>
        <FilterModalLayout
          isOpen={modalType.modalFilter}
          onClose={() => closeModal("modalFilter")}
          name="modalFilter"
          {...{ showMap }}
        >
          <FilterModal />
        </FilterModalLayout>
        <AddToDirectoryModalLayout
          isOpen={
            modalName === "AddDirectoryModal" ||
            modalName === "CreateDirectoryModal" ||
            modalName === "ThankYouDiresctoryModal"
          }
          onClose={() => closeModal("AddDirectoryModal")}
          name="AddDirectoryModal"
          {...{ showMap }}
          title={
            (modalName === "AddDirectoryModal" && "Add to directory") ||
            (modalName === "CreateDirectoryModal" && "Add to directory") ||
            (modalName === "ThankYouDiresctoryModal" && "Thank you")
          }
        >
          {DirectoryModalHandle()}
        </AddToDirectoryModalLayout>
        <OrderOnlineModalLayout
          isOpen={modalType.orderOnlineModal}
          onClose={() => closeModal("orderOnlineModal")}
          {...{ showMap }}
          title="Order Online"
          name="orderOnlineModal"
        >
          <OrderOnlineModal
            previousModal={() => modalClick("orderOnlineModal")}
          />
        </OrderOnlineModalLayout>
        <CalenderModalLayout
          isOpen={
            modalName === "calenderModal" ||
            modalName === "calenderPlaceModal" ||
            modalName === "PlacesConfirmModal"
          }
          onClose={() => closeModal("calenderModal")}
          {...{ showMap }}
          name="calenderModal"
          title="Brasserie Colmar"
        >
          {showModalContent()}
          {/* <CalenderModal onClose={closeModal} />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={() => modalClick("calenderPlaceModal")}
          >
            <CommonButton text="Next" />
          </div> */}
        </CalenderModalLayout>
        {/* <CalenderPlaceModalLayout
          isOpen={modalType.calenderPlaceModal}
          onClose={closeModal}
          {...{ showMap }}
          name="calenderPlaceModal"
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
          isOpen={modalType.PlacesConfirmModal}
          onClose={closeModal}
          {...{ showMap }}
          name="PlacesConfirmModal"
          title="Brasserie Colmar"
        >
          <PlacesConfirmModal />
          <div
            style={{ marginTop: 16, padding: "0px 24px" }}
            onClick={closeModal}
          >
            <CommonButton text="Done" />
          </div>
        </CalenderConfirmModalLayout> */}
        <CreateAccountModalLayout
          isOpen={
            modalName === "createAccountModal" ||
            modalName === "LoginAccountModal" ||
            modalName === "WelcomeBackModal" ||
            modalName === "UpdateMyDetailsModal" ||
            modalName === "UpdateMyEmailModal" ||
            modalName === "UpdatePassswordModal" ||
            modalName === "UpdateNameModal" ||
            modalName === "ContactUsModal" ||
            modalName === "LoginThankYouDiresctoryModal" ||
            modalName === "UpdateMyPreferencesModal"
          }
          onClose={() => closeModal("createAccountModal")}
          {...{ showMap }}
          name="createAccountModal"
          title={
            (modalName === "createAccountModal" && "Create an account") ||
            (modalName === "LoginAccountModal" && "Login") ||
            (modalName === "WelcomeBackModal" && "Welcome back!") ||
            (modalName === "UpdateMyDetailsModal" && "Update my details") ||
            (modalName === "UpdateMyEmailModal" && "Update my email") ||
            (modalName === "UpdateNameModal" && "Update my name") ||
            (modalName === "UpdatePassswordModal" && "Update my password") ||
            (modalName === "ContactUsModal" && "Contact us") ||
            (modalName === "LoginThankYouDiresctoryModal" && "Thank you") ||
            (modalName === "UpdateMyPreferencesModal" &&
              "Update my preferences")
          }
        >
          {showLoginHandle()}
        </CreateAccountModalLayout>
        {/* <LoginAccountModalLayout
          isOpen={modalType.LoginAccountModal}
          onClose={() => closeModal("LoginAccountModal")}
          {...{ showMap }}
          title="Login"
          name="LoginAccountModal"
        >
          <LoginAccountContent
            previousModal={() => modalClick("createAccountModal")}
            nextModal={() => modalClick("WelcomeBackModal")}
          />
        </LoginAccountModalLayout>
        <WelcomeBackModalLayout
          isOpen={modalType.WelcomeBackModal}
          onClose={() => closeModal("WelcomeBackModal")}
          {...{ showMap }}
          title="Welcome back!"
          name="WelcomeBackModal"
        >
          <Welcomeback isOpen={() => modalClick("UpdateMyDetailsModal")} />
        </WelcomeBackModalLayout> */}
        {/* <UpdateMyDetailsModalLayout
          isOpen={modalType.UpdateMyDetailsModal}
          onClose={() => closeModal("UpdateMyDetailsModal")}
          {...{ showMap }}
          title="Update my details"
          name="UpdateMyDetailsModal"
        >
          <UpdateMyDetails
            isOpen={() => modalClick("UpdateMyEmailModal")}
            previousModal={() => modalClick("WelcomeBackModal")}
          />
        </UpdateMyDetailsModalLayout> */}
        {/* <UpdateMyEmailModalLayout
          isOpen={modalType.UpdateMyEmailModal}
          onClose={() => closeModal("UpdateMyEmailModal")}
          {...{ showMap }}
          title="Update my email"
          name="UpdateMyEmailModal"
        >
          <UpdateMyEmail
            isOpen={() => modalClick("UpdateMyPreferencesModal")}
            previousModal={() => modalClick("UpdateMyDetailsModal")}
          />
        </UpdateMyEmailModalLayout> */}
        {/* <UpdateMyPreferencesModalLayout
          isOpen={modalType.UpdateMyPreferencesModal}
          onClose={() => closeModal("UpdateMyPreferencesModal")}
          {...{ showMap }}
          title="Update my preferences"
          name="UpdateMyPreferencesModal"
        >
          <UpdateMyPreferences
            previousModal={() => modalClick("UpdateMyEmailModal")}
          />
        </UpdateMyPreferencesModalLayout> */}
        <SearchModalLayout
          isOpen={modalType.search}
          onClose={() => closeModal("search")}
          {...{ showMap }}
          title="Search"
          name="search"
        >
          {/* <UpdateMyPreferences previousModal={() => modalClick("UpdateMyEmailModal")} /> */}
          <SearchedContainer>
            <DashboardSearchContainer
              {...{ tabChange, options, tabValue, showMap }}
            />
          </SearchedContainer>
        </SearchModalLayout>
      </>

      // <LeafletMap />
    );
  };
  return Hoc;
};

export default Layout;
