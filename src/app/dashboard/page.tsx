"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import filter from "../../../assets/images/filter.png";
import {
  EnjoyShineMenuItem,
  familyEventMenuItem,
  LocalCuisineMenuItem,
  topAttractionItem,
  topSideMenu,
  community,
  RestroListData,
  WalksData,
} from "./data";
import chevronRight from "../../../assets/images/chevron-right.png";
import CommentRatingImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import SearchInput from "../../components/searchInput/SearchInput";
import MenuDetails from "../../components/dashboard/MenuDetails";
import RatingMenu from "../../components/dashboard/RatingMenu";
import Directory from "../../components/dashboard/Directory";
import {  boxOverlay} from "../utils/ImagePath";
import Layout from "../layout/page";

interface DashboardProps {
  modalClick: Function;
}

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
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

const DirectoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0px 40px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const DirectoryTitle = styled.p`
  font-family: "Proxima Nova";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffffcc;
  display: flex;
  align-items: end;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 10px;
  }
`;

const options = ["Lists", "Places"];

type tabs = "Lists" | "Places";

const DashBoard: React.FC<DashboardProps> = ({ modalClick }) => {
  const specificSectionRef = useRef<HTMLDivElement>(null);


  const handleClick = (event: MouseEvent) => {
    if (
      specificSectionRef.current &&
      !specificSectionRef.current.contains(event.target as Node)
    ) {
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
     
          <InputWrapper>
            <SearchInput onFocus={()=>modalClick("search")} />
            <FilterInput>
              <Image
                style={{ width: "16px", height: "16px" }}
                src={filter}
                alt="Filter icon"
              />
              Filter
            </FilterInput>
          </InputWrapper>
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Local cuisine"
          />
          <ScrollingMenu>
            {LocalCuisineMenuItem.map((item, index) => {
              return (
                <div key={index}>
                  <RatingMenu
                    title={item.menuName}
                    menuImageUrl={item.image}
                    containerImageUrl={true}
                    MenutitleDetail={item.resturantName}
                  />
                </div>
              );
            })}
          </ScrollingMenu>
          <MenuDetails
            isOpen={() => modalClick("calenderModal")}
            title="Family Events"
          />
          <ScrollingMenu>
            {familyEventMenuItem.map((item, index) => {
              return (
                <FamilEventContainer key={index}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p className="date">{item.date}</p>
                    <span className="month">{item.month}</span>
                  </div>
                  <FamilEventText>{item.resturantName}</FamilEventText>
                </FamilEventContainer>
              );
            })}
          </ScrollingMenu>
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Enjoy the sunshine"
          />
          <ScrollingMenu>
            {EnjoyShineMenuItem.map((item, index) => {
              return (
                <div key={index}>
                  <RatingMenu
                    title={item.menuName}
                    menuImageUrl={item.image}
                    containerImageUrl={true}
                    MenutitleDetail={item.resturantName}
                  />
                </div>
              );
            })}
          </ScrollingMenu>
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Top Attractions"
          />
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
          <MenuDetails isOpen={() => modalClick("ModalContent")} title="Bars" />
          <ScrollingMenu>
            {LocalCuisineMenuItem.map((item, index) => {
              return (
                <div key={index}>
                  <RatingMenu
                    title={item.menuName}
                    menuImageUrl={item.image}
                    containerImageUrl={true}
                    MenutitleDetail={item.resturantName}
                  />
                </div>
              );
            })}
          </ScrollingMenu>
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Community"
          />
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
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Walks"
          />
          <ScrollingMenu>
            {WalksData.map((item, index) => {
              return (
                <WalkContainer
                  key={index}
                  style={{
                    backgroundImage: `url(${boxOverlay.src}) !important`,
                  }}
                >
                  <p>{item.name}</p>
                </WalkContainer>
              );
            })}
          </ScrollingMenu>
          <MenuDetails
            isOpen={() => modalClick("ModalContent")}
            title="Heritage"
          />
          <ScrollingMenu style={{ paddingBottom: "40px" }}>
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
                      background: "linear-gradient(45deg, black, transparent)",
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
      
  );
};
export default Layout(DashBoard);
// export default DashBoard;
