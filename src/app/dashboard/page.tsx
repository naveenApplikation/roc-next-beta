"use client";

import React, { useEffect, useRef, useState } from "react";
import DashBoardModal from "../../components/modal/Modal";
import CalenderModalLayout from "../../components/modal/Modal";
import CalenderPlaceModalLayout from "../../components/modal/Modal";
import CalenderConfirmModalLayout from "../../components/modal/Modal";
import CreateAccountModalLayout from "../../components/modal/Modal";
import styled from "styled-components";
import Image from "next/image";
import logoOutline from "../../../assets/images/logo-outline.png";
import RightSideLogo from "../../../assets/images/RightSideLogo.png";
import filter from "../../../assets/images/filter.png";
import {
  EnjoyShineMenuItem,
  familyEventMenuItem,
  LocalCuisineMenuItem,
  rightSideMenu,
  topAttractionItem,
  topSideMenu,
  DirectoryMenu,
  rightSideMenuMobile,
  community,
  RestroListData,
} from "./data";
import chevronRight from "../../../assets/images/chevron-right.png";
import mapIcon from "../../../assets/images/mapIcon.png";
import profileIcon from "../../../assets/images/profileIcon.png";
import CommentRatingImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import SearchInput from "../../components/searchInput/SearchInput";
import MenuDetails from "../../components/dashboard/MenuDetails";
import RatingMenu from "../../components/dashboard/RatingMenu";
import Directory from "../../components/dashboard/Directory";
import ModalContent from "./ModalContent";
import CalenderModal from "./calenderModal";
import PlacesFormModal from "./placesFormModal";
import PlacesConfirmModal from "./placeConfirmNodal";
import OrderOnlineModal from "./orderOnlineModal";
import { Segmented } from "antd";
import TabPanel from "@/components/tabPanel";
import { blank, filterSearch, thumbsup, utensils } from "../utils/ImagePath";
import FilterSection from "@/components/filterSection";
import Ratings from "@/components/ratings";
import Lists from "../../components/search/Lists";
import CommonButton from "@/components/button/CommonButton";
import CreateAccount from './Menu Modal Contents/CreateAccount'
import Login from './Menu Modal Contents/Login'
import UpdateMyDetails from './Menu Modal Contents/UpdateMyDetails'
import UpdateMyEmail from './Menu Modal Contents/UpdateMyEmail'
import UpdateMyPreferences from './Menu Modal Contents/UpdateMyPreferences'
import Welcomeback from './Menu Modal Contents/Welcomeback'

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
  gap: 16px;
`;

const DashboardMenu = styled.div`
  width: 580px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.8) 100%
    ),
    #ff0;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  padding: 40px 0px;
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

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const FilterInput = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0px 16px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    display: none;
  }
`;

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  }
`;

const TopAttractionContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  p {
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const TopAttractionprofile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const FamilEventContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;

  .date {
    font-size: 17px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  .month {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    background-color: red;
    width: fit-content;
    color: #fff;
  }
`;

const FamilEventText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
`;

const TopsideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 56px;

  p {
    font-size: 14px;
    font-weight: 400;
  }
`;

const DirectoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0px 40px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const DirectoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0px 40px;
  padding-bottom: 17px;
`;

const DirectoryMenuTitle = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DirectoryTitle = styled.p`
  font-family: "Proxima Nova";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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

const SearchedContainer = styled.div`
  background-color: #f2f3f3;
  padding: 0px 40px;
  border-radius: 24px 24px 0px 0px;
  box-shadow: 0px -8px 40px 0px #00000040;
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
const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
  div {
    padding: 0px;
  }
`;
const SearchedListContainer = styled.div`
  padding-bottom: 40px;
`;
const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  p {
    font-size: 13px;
    font-weight: 400;
  }
  .likes {
    background-color: #00000014;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;

    @media screen and (max-width: 350px) {
      padding: 6px 12px;
    }
  }
  .shopName {
    font-size: 16px;
    font-weight: 600;
  }
  p span {
    color: #2b902b;
  }
`;

const options = ["Lists", "Places"];

type tabs = "Lists" | "Places";

const DashBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placesProfileModal, setPlacesProfileModal] = useState(false);
  const [calenderModal, setCalenderModal] = useState(false);
  const [calenderPlaceModal, setCalenderPlaceModal] = useState(false);
  const [calenderConfirmModal, setCalenderConfirmModal] = useState(false);
  const [createAccountModal, setCreateAccountModal] = useState(false);
  const [modalName, setModalName] = useState<string>("");
  const [tabValue, setTabValue] = useState("Lists");
  const [focused, setFocused] = useState(false);
  const specificSectionRef = useRef<HTMLDivElement>(null);

  console.log(tabValue, "tabValue");

  const opencalenderModalHandle = () => {
    setCalenderModal(true);
  };

  const closecalenderModalHandle = () => {
    setCalenderModal(false);
  };

  
  const opencreateAccountHandle = () => {
    setCreateAccountModal(true);
  };

  const closecreateAccountHandle = () => {
    setCreateAccountModal(false);
  };


  const openNextcalenderModalHandle = () => {
    setCalenderModal(false);
    setCalenderPlaceModal(true);
  };

  const closecalenderPlaceModalHandle = () => {
    setCalenderPlaceModal(false);
  };

  const openNextConfirmcalenderModalHandle = () => {
    setCalenderPlaceModal(false);
    setCalenderConfirmModal(true);
  };

  const closecalenderConfirmModalHandle = () => {
    setCalenderConfirmModal(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModalClick = (name: string) => {
    console.log("name", name);

    setModalName(name);
  };
  const tabChange = (value: tabs) => {
    setTabValue(value);
    console.log(value);
  };
  const searchFocus = (e: any) => {
    setFocused(true);
  };

  const handleClick = (event: MouseEvent) => {
    console.log("specificSectionRef", specificSectionRef);
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

  return (
    <>
      <Container>
        <MainContainer>
          <DashboardMenu
            style={{ paddingBottom: `${focused ? "0px" : "40px"}` }}
          >
            {!focused ? (
              <>
                <HeadMenu>
                  <Image
                    style={{ width: "116.615px", height: "48px" }}
                    src={logoOutline}
                    alt="Logo Outline"
                  />
                  <HeaderMapProfileContainer>
                    <Image
                      style={{ width: "48px", height: "48px" }}
                      src={mapIcon}
                      alt="Logo Outline"
                    />
                    <Image
                      style={{ width: "48px", height: "48px",cursor:"pointer" }}
                      src={profileIcon}
                      alt="Logo Outline"
                      onClick={opencreateAccountHandle}
                    />
                  </HeaderMapProfileContainer>
                </HeadMenu>
                <InputWrapper>
                  <SearchInput onFocus={searchFocus} />
                  <FilterInput>
                    <Image
                      style={{ width: "16px", height: "16px" }}
                      src={filter}
                      alt="Filter icon"
                    />
                    Filter
                  </FilterInput>
                </InputWrapper>

                <ScrollingMenu>
                  {topSideMenu.map((item, index) => {
                    return (
                      <TopsideMenuContainer
                        onClick={() => openModalClick(item.name)}
                        key={index}
                      >
                        <Image
                          style={{ width: "16px", height: "16px" }}
                          src={item.image}
                          alt="icon"
                        />
                        <p>{item.name}</p>
                      </TopsideMenuContainer>
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails isOpen={openModal} title="Local cuisine" />
                <ScrollingMenu>
                  {LocalCuisineMenuItem.map((item) => {
                    return (
                      <RatingMenu
                        title={item.menuName}
                        menuImageUrl={item.image}
                        containerImageUrl={true}
                        MenutitleDetail={item.resturantName}
                      />
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails
                  isOpen={opencalenderModalHandle}
                  title="Family Events"
                />
                <ScrollingMenu>
                  {familyEventMenuItem.map((item, index) => {
                    return (
                      <FamilEventContainer key={index}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p className="date">{item.date}</p>
                          <span className="month">{item.month}</span>
                        </div>
                        <FamilEventText>{item.resturantName}</FamilEventText>
                      </FamilEventContainer>
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails isOpen={openModal} title="Enjoy the sunshine" />
                <ScrollingMenu>
                  {EnjoyShineMenuItem.map((item) => {
                    return (
                      <RatingMenu
                        title={item.menuName}
                        menuImageUrl={item.image}
                        containerImageUrl={true}
                        MenutitleDetail={item.resturantName}
                      />
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails isOpen={openModal} title="Top Attractions" />
                <ScrollingMenu>
                  {topAttractionItem.map((item, index) => {
                    return (
                      <TopAttractionContainer key={index}>
                        <TopAttractionprofile></TopAttractionprofile>
                        <p>{item.menuName}</p>
                      </TopAttractionContainer>
                    );
                  })}
                </ScrollingMenu>
                <DirectoryContainer>
                  <DirectoryTitle>Directory</DirectoryTitle>
                  <Image
                    style={{ width: "10px", height: "16px" }}
                    src={chevronRight}
                    alt="right icon"
                  />{" "}
                </DirectoryContainer>
                <Directory />
                <MenuDetails isOpen={openModal} title="Bars" />
                <ScrollingMenu>
                  {LocalCuisineMenuItem.map((item) => {
                    return (
                      <RatingMenu
                        title={item.menuName}
                        menuImageUrl={item.image}
                        containerImageUrl={true}
                        MenutitleDetail={item.resturantName}
                      />
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails isOpen={openModal} title="Community" />
                <ScrollingMenu>
                  {community.map((item, index) => {
                    return (
                      <CommunityContainer
                        key={index}
                        style={{ background: item.color }}
                      >
                        <Image
                          style={{ width: "18px", height: "16px" }}
                          src={item.image}
                          alt="right icon"
                        />{" "}
                        <p>{item.name}</p>
                      </CommunityContainer>
                    );
                  })}
                </ScrollingMenu>
                <MenuDetails isOpen={openModal} title="Heritage" />
                <ScrollingMenu>
                  {LocalCuisineMenuItem.map((item, index) => {
                    return (
                      <div
                        style={{
                          width: 120,
                          gap: 16,
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={index}
                      >
                        <div
                          style={{
                            height: 64,
                            width: "100%",
                            background:
                              "linear-gradient(45deg, black, transparent)",
                          }}
                        ></div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: 4,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{ width: "68px", height: "12px" }}
                              src={CommentRatingImage}
                              alt="right icon"
                            />{" "}
                            <p>4.7</p>
                          </div>
                          <p style={{ fontSize: 14 }}>{item.resturantName}</p>
                        </div>
                      </div>
                    );
                  })}
                </ScrollingMenu>
              </>
            ) : (
              <SearchedContainer ref={specificSectionRef}>
                <InputWrapper className="filterInput">
                  <SearchInput />
                </InputWrapper>
                <TabPanel
                  defaultValue="Lists"
                  tabChange={tabChange}
                  options={options}
                />
                {tabValue == "Lists" ? (
                  <>
                    <Lists />
                  </>
                ) : (
                  <>
                    <FilterContainer>
                      <FilterSection />
                    </FilterContainer>
                    <SearchedListContainer>
                      {RestroListData.map((item: any) => {
                        return (
                          <SearchedData>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                              }}
                            >
                              <Image
                                style={{ background: "white" }}
                                src={blank}
                                alt=""
                              />
                              <div className="restroRating">
                                <p className="shopName">{item.name}</p>
                                <Image
                                  src={utensils}
                                  style={{
                                    width: "13px",
                                    height: "13px",
                                    marginRight: 8,
                                  }}
                                  alt="utensils"
                                />
                                <Ratings defaultValue={item.rating} />
                                <p>
                                  <span>Open - Closes</span>
                                </p>
                                <p>Indoors</p>
                              </div>
                            </div>
                            <div className="likes">
                              <Image
                                src={thumbsup}
                                alt="like"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <p>{item.likeCount}</p>
                            </div>
                          </SearchedData>
                        );
                      })}
                    </SearchedListContainer>
                  </>
                )}
              </SearchedContainer>
            )}
          </DashboardMenu>
        </MainContainer>
        <RightMenu className="lllllll">
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
                  <RightSideInsideMenuBox>
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
                  <RightSideInsideMenuBox>
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
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Brasserie Colmar"
      >
        <ModalContent onClose={closeModal} />
        {/* <OrderOnlineModal /> */}
      </DashBoardModal>
      <CalenderModalLayout
        isOpen={calenderModal}
        onClose={closecalenderModalHandle}
        title="Brasserie Colmar"
      >
        <CalenderModal onClose={closecalenderModalHandle} />
        <div style={{ marginTop: 16,padding:"0px 24px" }} onClick={openNextcalenderModalHandle}>
          <CommonButton text="Next" />
        </div>
      </CalenderModalLayout>
      <CalenderPlaceModalLayout
        isOpen={calenderPlaceModal}
        onClose={closecalenderPlaceModalHandle}
        title="Brasserie Colmar"
      >
        <PlacesFormModal  />
        <div style={{ marginTop: 16,padding:"0px 24px" }} onClick={openNextConfirmcalenderModalHandle}>
          <CommonButton text="Next" />
        </div>
      </CalenderPlaceModalLayout>
      <CalenderConfirmModalLayout
        isOpen={calenderConfirmModal}
        onClose={closecalenderConfirmModalHandle}
        title="Brasserie Colmar"
      >
        <PlacesConfirmModal  />
        <div style={{ marginTop: 16,padding:"0px 24px" }} onClick={closecalenderConfirmModalHandle}>
          <CommonButton text="Done" />
        </div>
      </CalenderConfirmModalLayout>
      <CreateAccountModalLayout
        isOpen={createAccountModal}
        onClose={closecreateAccountHandle}
        title="Create an account"
      >
        <CreateAccount  />
      </CreateAccountModalLayout>
    </>
  );
};

export default DashBoard;
