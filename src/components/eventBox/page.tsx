"use client";
import {
  CloseModal,
  locationMark,
  bookmark,
  share,
  bookmarkActive,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next-nprogress-bar";

import { handleFilter } from "@/app/utils/mappingFun";
import CustomBanner from "../AdComponent/CustomBanner";
import { addAndRemoveBookmark } from "@/app/action";
import { Spin } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import ScrollList from "../scrollList/ScrollList";
import { events } from "@/app/utils/data";
import FilterSection from "../AllModalScreen/FilterModalScreenForEvents/FilterSection";
import { filterEvents } from "../AllModalScreen/FilterModalScreenForEvents/Filters";

interface EventBoxProps {
  isShare?: any;
  urlData?: any;
  bookmarkState: boolean;
  categoryId: string;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
  modal?: any;
}

const EventBox: React.FC<EventBoxProps> = ({
  isShare,
  urlTitle,
  urlData,
  categoryId,
  filteredUrls,
  bookmarkState,
  loader,
  modal,
}) => {
  const {
    modalClick,
    selectFilter,
    modalType,
    closeModal,
    setSelectFilter,
    handleSocialShare,
    socialShare,
    eventFilters,
  } = useMyContext();

  const skeletonItems = new Array(10).fill(null);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginToken")
      : null;

  const router = useRouter();
  const params = useParams();
  const date = useSearchParams()?.get("date");

  const [isBookmark, setBookmark] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(urlData.slice(0, 10)); // Only show first 10 items initially
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(10); // Track the next batch of items
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBookmark(bookmarkState);
  }, [bookmarkState]);

  const handleBookMark = async () => {
    if (token) {
      setBookmarkLoader(true);
      const res = await addAndRemoveBookmark("event-bookmark", categoryId);

      if (res) {
        setBookmark(!isBookmark);
        setBookmarkLoader(false);
      } else {
        setBookmarkLoader(false);
      }
    } else if (!token) {
      modalClick("LoginSignupModal");
    }
  };

  const handleShare = () => {
    if (!socialShare) {
      handleSocialShare();
    }
  };

  const handlemodal = (id: any) => {
    let temp: any,
      index = 0;
    urlData.forEach((element: any, position: any) => {
      if (
        date &&
        element._id === id.replace("$", "") &&
        element.acf.event_date === date
      ) {
        index = position;
        temp = element;
      } else if (!date && !temp && element._id === id.replace("$", "")) {
        index = position;
        temp = element;
      }
    });

    modalClick(
      "eventListing",
      temp,
      filteredUrls[index] ? filteredUrls[index] : fallback
    );
  };

  useEffect(() => {
    if (modal) {
      handlemodal(modal);
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      // Check if the user has scrolled 80% down
      if (
        scrollTop + clientHeight >= scrollHeight * 0.8 &&
        !loading &&
        next < urlData.length
      ) {
        setLoading(true);
        setTimeout(() => {
          setDisplayedItems((prev: any) => [
            ...prev,
            ...urlData.slice(next, next + 10),
          ]);
          setNext((prev) => prev + 10);
          setLoading(false);
        }, 500); // Simulate loading delay
      }
    }
  };

  // Reset displayed items when urlData changes (due to filters being applied)
  useEffect(() => {
    setDisplayedItems(urlData.slice(0, 10)); // Reset to the first 10 items
    setNext(10); // Reset the counter for the next batch
  }, [urlData]);

  useEffect(() => {
    const refCurrent = containerRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, next, urlData]);

  const handlemodalView = (item: any, pos: any) => {
    let id = item._id;
    if (modal && !modal.includes("$")) {
      id += "$";
    } else {
      id = id.replace("$", "");
    }
    router.replace(
      `/categories/${params?.eventName}?search=${categoryId}&modal=${id}&date=${item.acf?.event_date}`
    );
  };

  const filteredData = events.filter((item: any) => {
    if (item.listName.toLowerCase() !== urlTitle?.toLowerCase()) {
      if (
        urlTitle?.toLowerCase() == "upcoming events" &&
        item.listName.toLowerCase() == "all events"
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <SearchedListContainer ref={containerRef}>
        <Header className="">
          <TitleText>{urlTitle}</TitleText>
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}>
            {params?.eventName !== "EventsByDate" &&
              params?.eventName !== "Events" && (
                <ImageContainer
                  selected={isBookmark}
                  onClick={() => {
                    handleBookMark();
                  }}>
                  {bookmarkLoader ? (
                    <Spin tip="Loading" size="small" />
                  ) : isBookmark ? (
                    <Image
                      src={bookmarkActive}
                      style={{ color: "red" }}
                      alt="Logo Outline"
                    />
                  ) : (
                    <Image src={bookmark} alt="Logo Outline" />
                  )}
                </ImageContainer>
              )}

            {params?.eventName == "upcoming" && (
              <ImageContainer selected={false} onClick={handleShare}>
                <Image src={share} alt="Logo Outline" />
              </ImageContainer>
            )}
          </div>
        </Header>
        <div
          style={{
            padding: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <FilterSection pageTitle="categoryEvent" />
        </div>
        {displayedItems?.map((item: any, index: any) => {
          return (
            <SearchedData key={index}>
              <MainInsideWrapper
                onClick={() => {
                  modalClick(
                    "eventListing",
                    item,
                    filteredUrls[index] ? filteredUrls[index] : fallback
                  );
                }}>
                <FamilyEventWrapper>
                  <img
                    src={filteredUrls[index]}
                    alt="image"
                    width={80}
                    height={80}
                    style={{ objectFit: "cover" }}
                  />
                  <FamilyEventWrapperInside>
                    <p className="date">{formatDate(item.acf?.event_date)}</p>
                    <p className="month">{formatMonth(item.acf?.event_date)}</p>
                  </FamilyEventWrapperInside>
                </FamilyEventWrapper>
                <div className="restroRating">
                  <p className="shopName">{item.acf?.title}</p>
                  <DetailContainer>
                    {item?.acf?.parish?.label ? (
                      <Image
                        src={locationMark}
                        style={{
                          width: "13px",
                          height: "13px",
                          marginRight: 8,
                        }}
                        alt="utensils"
                      />
                    ) : (
                      ""
                    )}
                    <p>{item?.acf?.parish?.label}</p>
                  </DetailContainer>
                  <p>
                    <span>
                      {item.acf?.event_dates[0]?.start_time}{" "}
                      {item.acf?.event_dates[0]?.start_time ? "-" : " "}
                      {item.acf?.event_dates[0]?.end_time}
                    </span>
                  </p>
                </div>
              </MainInsideWrapper>
            </SearchedData>
          );
        })}
        <div style={{ height: "100px", backgroundColor: "transparent" }}>
          {loading && <p>Loading more items...</p>}
        </div>
        <AddListButton onClick={() => modalClick("ContactUsModal")}>
          <CommonButton text="Suggest an Event" />
        </AddListButton>
      </SearchedListContainer>

      {/* {urlTitle && (
        <ScrollList
          params={params.eventName}
          background={"#EB5757"}
          data={filteredData}></ScrollList>
      )} */}
    </>
  );
};

// Existing styles remain unchanged...

export default EventBox;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SearchedListContainer = styled.div`
  padding: 25px;
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 500px;
  overflow-y: scroll;
  height: 100vh;
  scrollbar-color: transparent transparent;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
    75% {
      opacity: 0;
    }
  100% {
    opacity: 1;
  }
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
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80px;

  .date {
    font-size: 17px;
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
    border-radius: 0px 0px 4px 4px;
  }
`;

const FamilyEventWrapperInside = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background: white;
  border-radius: 4px;
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const AddListButton = styled.div`
  padding-top: 20px;
`;

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  flex: 1;
  animation: ${fadeIn} linear;
  animation-timeline: view();
  animation-range-end: 100px;
  animation-range-start: 10px;
`;

const ImageContainer = styled.div<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  background: ${(props) =>
    props.selected ? "#3B86ED29" : " rgba(0, 0, 0, 0.08)"};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
