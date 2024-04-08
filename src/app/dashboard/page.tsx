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
import CommonButton from "../../components/button/CommonButton";
import Layout from "../layout/page";
import { useRouter } from "next/navigation";

interface DashboardProps {
  modalClick: Function;
  CreateListHandle: Function;
}

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 8px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;

const FilterInput = styled.div`
  position: relative;
  box-shadow: 0px 0px 24px 0px rgba(82, 41, 0, 0.1);
  border-radius: 8px;
  padding: 0px 16px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const NormalOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
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

  background-size: contain;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FamilyEventWrapperInside = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background: white;
  border-radius: 0px 0px 8px 8px;
`;

const FamilEventContainer = styled.div`
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
    border-radius: 0px 0px 8px 8px;
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

const StarContainer = styled.div`
  width: 120px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const StarWrapper = styled.div`
  height: 64px;
  width: 100%;
  background: linear-gradient(45deg, black, transparent);
  position: relative;

  p {
    position: absolute;
    top: 4px;
    right: 5px;
    background: #fff;
    width: 30px;
    text-align: center;
    border-radius: 10px;
    font-size: 8px;
  }

  .StarImageStyle {
    /* width: -webkit-fill-available; */
    height: 64px;
    border-radius: 6px;
  }
`;

const options = ["Lists", "Places"];

type tabs = "Lists" | "Places";

const DashBoard: React.FC<DashboardProps> = ({
  modalClick,
  CreateListHandle,
}) => {
  const specificSectionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const menuClick = (item: any) => {
    if (item === "To do") {
      // router.push("/screens/resturants");
      router.push("/categories/aniruddh");
    } else if (item === "Dine") {
      router.push("/screens/ecoDining");
    } else if (item === "Shop") {
      router.push("/screens/wellbeing");
    } else if (item === "Events") {
      router.push("/screens/events");
    } else if (item === "Tours") {
      router.push("/screens/stays");
    } else if (item === "Hotels") {
      router.push("/screens/scaffolding");
    } else if (item === "Activities") {
      router.push("/screens/experiences");
    } else if (item === "Travel") {
      router.push("/screens/attractions");
    } else if (item === "Nightlife") {
      router.push("/screens/financial");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    }
  };

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
        <FilterInput onClick={() => modalClick("modalFilter")}>
          <Image style={{ marginTop: "10px" }} src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Ffilter.png?alt=media&token=39f6b801-3af0-4187-adff-4ba787ceea23"} width={16} height={16} alt="Filter icon" />
          Filter
        </FilterInput>
      </InputWrapper>
      <OptionMenu>
        {topSideMenu.map((item, index) => {
          return (
            <NormalOption key={index}>
              <Image src={item.image} width={item.width} height={item.height} style={{width:"auto"}} alt="right icon" />{" "}
              <p style={{ fontSize: "14px" }}>{item.name}</p>
            </NormalOption>
          );
        })}
      </OptionMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Local cuisine" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => (
          // return (
          <div key={index}>
            <RatingMenu
              title={item.menuName}
              menuImageUrl={item.image}
              headerImage={item.headerImage}
              containerImageUrl={true}
              MenutitleDetail={item.resturantName}
              isOpen={() => modalClick("ModalContent",item)}
              // isOpen={() => modalClick("eventListing")}
            />
          </div>
          // );
        ))}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Family Events" />
      <ScrollingMenu>
        {familyEventMenuItem.map((item, index) => {
          return (
            <FamilEventContainer
              key={index}
              onClick={() => modalClick("eventListing",item)}
              style={{cursor:"pointer"}}
            >
              <FamilyEventWrapper>
                <Image
                  src={item.headerImage}
                  alt=""
                  width={80}
                  height={80}
                  // alt=""
                />
                <FamilyEventWrapperInside>
                  <p className="date">{item.date}</p>
                  <p className="month">{item.month}</p>
                </FamilyEventWrapperInside>
              </FamilyEventWrapper>
              <FamilEventText>{item.eventName}</FamilEventText>
            </FamilEventContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails
        isOpen={() => menuClick("Events")}
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
                isOpen={() => modalClick("activities",item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
      <MenuDetails
        isOpen={() => menuClick("TrendingList")}
        title="Trending Lists"
      />
      <ScrollingMenu>
        {community.map((item, index) => {
          return (
            <CommunityContainer key={index} style={{ background: item.color }}>
              <Image src={item.image} alt="right icon" /> <p>{item.name}</p>
            </CommunityContainer>
          );
        })}
      </ScrollingMenu>
      <div
        style={{ padding: "0px 40px" }}
        onClick={() => menuClick("AddToCreate")}
      >
        <CommonButton text="Create a List" />
      </div>
      <MenuDetails isOpen={() => menuClick("Events")} title="Top Attractions" />
      <ScrollingMenu>
        {topAttractionItem.map((item, index) => {
          return (
            <TopAttractionContainer
              key={index}
              // onClick={() => menuClick("Events")}
              style={{cursor:"pointer"}}
              onClick={() => modalClick("ModalContent",item)}
            >
              <TopAttractionprofile>
                <Image
                  src={item.headerImage}
                  alt=""
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                  // alt=""
                />
              </TopAttractionprofile>
              <p>{item.resturantName}</p>
            </TopAttractionContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails
        title="Directory"
        isOpen={() => menuClick("CategorieList")}
      />
      {/* <DirectoryContainer>
        <DirectoryTitle>Directory</DirectoryTitle>
        <Image src={chevronRight} alt="right icon" />{" "}
      </DirectoryContainer> */}
      <Directory isOpen={() => modalClick("AddDirectoryModal")} />
      <MenuDetails title="Bars" isOpen={() => menuClick("Events")} />
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
                // isOpen={() => menuClick("Events")}
                isOpen={() => modalClick("ModalContent",item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Shopping" />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              onClick={() => menuClick("Events")}
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image
                src={item.headerImage}
                alt=""
                width={120}
                height={64}
                // alt=""
              />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Community" />
      <ScrollingMenu>
        {community.map((item, index) => {
          return (
            <CommunityContainer
              key={index}
              style={{ background: item.color }}
              onClick={() => menuClick("Events")}
            >
              <Image src={item.image} alt="right icon" /> <p>{item.name}</p>
            </CommunityContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Beach life " />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              onClick={() => menuClick("Events")}
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image
                src={item.headerImage}
                alt=""
                width={120}
                height={64}
                // alt=""
              />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails title="Sustainability" isOpen={() => menuClick("Events")} />
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
                isOpen={() => modalClick("ModalContent",item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
      <MenuDetails
        isOpen={() => modalClick("ModalContent")}
        title="Jerseyisms"
      />
      <ScrollingMenu>
        {community.map((item, index) => {
          return (
            <CommunityContainer key={index} style={{ background: item.color }}>
              <Image src={item.image} alt="right icon" /> <p>{item.name}</p>
            </CommunityContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Heritage" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer key={index} style={{cursor:"pointer"}} onClick={() => modalClick("ModalContent",item)}>
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"} width={69} height={12} alt="right icon" /> <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Walks" />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              onClick={() => menuClick("Events")}
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image
                src={item.headerImage}
                alt=""
                width={120}
                height={64}
                // alt=""
              />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Wellbeing" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer key={index} style={{cursor:"pointer"}} onClick={() => modalClick("ModalContent",item)}>
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
                {index == 0 && <p>New</p>}
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                 <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"} width={69} height={12} alt="right icon" /> <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="WW2" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer key={index} style={{cursor:"pointer"}} onClick={() => modalClick("ModalContent",item)}>
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"} width={69} height={12} alt="right icon" /> <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Cycle Routes" />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              onClick={() => menuClick("Events")}
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image src={item.headerImage} alt="" width={120} height={64} />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails
        title="Delicious Dine Out"
        isOpen={() => menuClick("Events")}
      />
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
                isOpen={() => modalClick("ModalContent",item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Out out" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer key={index} style={{cursor:"pointer"}} onClick={() => modalClick("ModalContent",item)}>
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"} width={69} height={12} alt="right icon" /> <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
      <MenuDetails isOpen={() => menuClick("Events")} title="Surfing" />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <StarContainer key={index} style={{cursor:"pointer"}} onClick={() => modalClick("ModalContent",item)}>
              <StarWrapper>
                <Image
                  className="StarImageStyle"
                  src={item.headerImage}
                  alt=""
                  width={120}
                  height={64}
                />
              </StarWrapper>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Image src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"} width={69} height={12} alt="right icon" /> <p>4.7</p>
                </div>
                <p style={{ fontSize: 14 }}>{item.resturantName}</p>
              </div>
            </StarContainer>
          );
        })}
      </ScrollingMenu>
      <div
        style={{ padding: "0px 40px", paddingBottom: "20px" }}
        onClick={() => menuClick("AddToCreate")}
      >
        <CommonButton text="Leave feedback" />
      </div>
    </>
  );
};
export default Layout(DashBoard);
// export default DashBoard;
