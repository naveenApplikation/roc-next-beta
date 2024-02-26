"use client";

import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import RightSideLogo from "../../../assets/images/RightSideLogo.png";
import { rightSideMenu, rightSideMenuMobile } from "../dashboard/data";
import mapIcon from "../../../assets/images/mapIcon.png";
import profileIcon from "../../../assets/images/profileIcon.png";
import { useRouter } from "next/navigation";
import { user } from "../utils/ImagePath";
import Header from "@/components/header/page";
import DashBoardModal from "../../components/modal/Modal";
import CalenderModalLayout from "../../components/modal/Modal";
import CalenderPlaceModalLayout from "../../components/modal/Modal";
import CreateAccountModalLayout from "../../components/modal/Modal";
import CalenderConfirmModalLayout from "../../components/modal/Modal";
import ModalContent from "../dashboard/ModalContent";
import CalenderModal from "../dashboard/calenderModal";
import CommonButton from "@/components/button/CommonButton";
import PlacesFormModal from "../dashboard/placesFormModal";
import PlacesConfirmModal from "../dashboard/placeConfirmNodal";
import CreateAccountContent from "../dashboard/Menu Modal Contents/CreateAccount";

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

const DashboardMenu = styled.div`
  width: 580px;
  background: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 800px) {
    /* height: 100vh; */
    width: 100%;
  }
`;
const RightSideMenu = styled.div`
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
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    height: 500px;
    padding: 16px;
    position: fixed;
    top: 0;
    width: 100%;
  }
`;

const MobileViewRightSideMenu = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: space-between;
    gap: 8px;
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
        router.push("/screens/community/Top Rated Restaurants");
      } else if (item.name === "Dine") {
        router.push("/screens/community/Eco Dining");
      } else if (item.name === "Shop") {
        router.push("/screens/community/Wellbeing");
      } else if (item.name === "Events") {
        router.push("/screens/categories/Events");
      } else if (item.name === "Tours") {
        router.push("/screens/categories/Stays");
      } else if (item.name === "Hotels") {
        router.push("/screens/categories/Scaffolding");
      }
    };
    const closeModal = () => {
      setCalenderModal(false);
      setModalname("");
    };
    const modalClick = (name: string) => {
      setModalname(name);
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
              style={{
                paddingBottom: `${focused ? "0px" : "0px"}`,
                minHeight: "100vh",
              }}
            >
              <Header modalClick={modalClick} />
              <WrappedComponent {...{ modalClick }} />
            </DashboardMenu>
          </MainContainer>
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
                  src={mapIcon}
                  alt="Logo Outline"
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
          title="Brasserie Colmar"
        >
          <ModalContent onClose={closeModal} />
          {/* <OrderOnlineModal /> */}
        </DashBoardModal>
        <CalenderModalLayout
          isOpen={modalName === "calenderModal"}
          onClose={closeModal}
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
          title="Create an account"
        >
          <CreateAccountContent />
        </CreateAccountModalLayout>
      </>
    );
  };
  return Hoc;
};

export default Layout;
