"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { filter } from "../utils/ImagePath";
import {
  EnjoyShineMenuItem,
  familyEventMenuItem,
  LocalCuisineMenuItem,
  topAttractionItem,
  topSideMenu,
  community,
  RestroListData,
  WalksData,
  BarMenuItem,
} from "./data";
import { chevronRight } from "../utils/ImagePath";
import CommentRatingImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import SearchInput from "../../components/searchInput/SearchInput";
import MenuDetails from "../../components/dashboard/MenuDetails";
import RatingMenu from "../../components/dashboard/RatingMenu";
import Directory from "../../components/dashboard/Directory";
import { boxOverlay, yellowStar } from "../utils/ImagePath";
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

const TopAttractionprofile = styled.div<{
  $image: any;
}>`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-image: url(${(props) => props.$image?.src}) !important;
  background-size: contain;
`;

const FamilEventContainer = styled.div<{
  $image: any;
}>`
  display: flex;
  width: 80px;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;

  .date {
    font-size: 10px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    width: 30px;
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
    width: 30px;
  }
  div {
    background-image: url(${(props) => props.$image.src}) !important;
    height: 64px;
    background-size: contain;
    justify-content: end;
    padding: 8px;
    p {
      background-color: white;
      color: black;
      text-align: center;
    }
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
  /* font-family: "Proxima Nova"; */
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffffcc;
  display: flex;
  align-items: end;
  flex-direction: column;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 10px;
  }
  img {
    height: 85px;
    width: 100%;
    /* border-radius: 10px; */
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
        <SearchInput onFocus={() => modalClick("search")} />
        <FilterInput>
          <Image src={filter} alt="Filter icon" />
          Filter
        </FilterInput>
      </InputWrapper>
      <ScrollingMenu>
        {topSideMenu.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                height: 56,
                justifyContent: "space-evenly",
              }}
              key={index}
            >
              <Image src={item.image} alt="right icon" />{" "}
              <p style={{ fontSize: "14px" }}>{item.name}</p>
            </div>
          );
        })}
      </ScrollingMenu>
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
                headerImage={item.headerImage}
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
          console.log("item.headerImageitem.headerImage", item.headerImage);

          return (
            <FamilEventContainer key={index} $image={item.headerImage}>
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
                headerImage={item.headerImage}
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
          console.log("item", item);

          return (
            <TopAttractionContainer key={index}>
              <TopAttractionprofile
                $image={item.headerImage}
              ></TopAttractionprofile>
              <p>{item.menuName}</p>
            </TopAttractionContainer>
          );
        })}
      </ScrollingMenu>
      <DirectoryContainer>
        <DirectoryTitle>Directory</DirectoryTitle>
        <Image src={chevronRight} alt="right icon" />{" "}
      </DirectoryContainer>
      <Directory />
      <MenuDetails isOpen={() => modalClick("ModalContent")} title="Bars" />
      <ScrollingMenu>
        {BarMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                menuImageUrl={item.image}
                headerImage={item.headerImage}
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
            <CommunityContainer key={index} style={{ background: item.color }}>
              <Image
                src={item.image}
                alt="right icon"
              />{" "}
              <p>{item.name}</p>
            </CommunityContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => modalClick("ModalContent")} title="Walks" />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image src={item.headerImage} alt="" />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => modalClick("ModalContent")} title="Heritage" />
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
              >
                <Image
                  style={{
                    width: "-webkit-fill-available",
                    height: "64px",
                    borderRadius: "6px",
                  }}
                  src={item.headerImage}
                  alt=""
                />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image src={yellowStar} alt="right icon" /> <p>4.7</p>
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
