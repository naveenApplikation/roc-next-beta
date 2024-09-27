"use client";
import {
  CloseModal,
  locationMark,
  bookmark,
  share,
  bookmarkActive,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useEffect, useState, useRef, Suspense } from "react";
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

import ScrollList from "../scrollList/ScrollList";
import { events } from "@/app/utils/data";
import FilterSection from "../AllModalScreen/FilterModalScreenForEvents/FilterSection";
import { filterEvents } from "../AllModalScreen/FilterModalScreenForEvents/Filters";
import Link from "next/link";
import { useParams } from "next/navigation";
import { handleEventEncoding } from "@/app/utils/commanFun";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";

interface EventBoxProps {
  urlData?: any;
  urlTitle?: string;
  type: "upcoming" | "eventByDate" | "eventCategory";
  slug: string;
}

const EventPage: React.FC<EventBoxProps> = ({
  urlTitle,
  urlData,
  type,
  slug,
}) => {
  const {
    modalClick,
    handleSocialShare,
    socialShare,
    eventFilters,
    showMap,
    resetFilters,
    modalType,
    closeModal
  } = useMyContext();

  const router = useRouter();

  const [filteredUrls, setFilteredUrls] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(urlData); // Only show first 10 items initially
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(10); // Track the next batch of items
  const containerRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();

  const handleShare = () => {
    if (!socialShare) {
      handleSocialShare();
    }
  };

  useEffect(() => {
    const filEve = filterEvents(urlData, eventFilters);
    const ImageUrlData = filEve?.map(
      (item: any) => item?.acf?.header_image_data
    );
    setFilteredUrls(filterUrls(ImageUrlData));
    setDisplayedItems(filEve);
  }, [eventFilters]);

  function getFirstImageUrl(jsonString: string): string | boolean {
    try {
      // Parse the JSON string
      const parsedArray = JSON.parse(jsonString);

      // Check if the parsed array has at least one item and if it has a "url" property
      if (
        Array.isArray(parsedArray) &&
        parsedArray.length > 0 &&
        parsedArray[0].url
      ) {
        return parsedArray[0].url; // Return the URL of the first image
      } else {
        return false; // Return false if no valid URL found
      }
    } catch (error) {
      console.error("Invalid JSON string", error);
      return false; // Return false if JSON parsing fails
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const modalId = urlParams.get("modal");
      const date = urlParams.get("date");
      if (modalId && date) {
        let temp: any,
          index = 0;
        urlData.every((element: any, position: any) => {
          if (
            date &&
            element._id === modalId.replace("$", "") &&
            element.acf.event_date === date
          ) {
            index = position;
            temp = element;
            return false;
          } else if (element._id === modalId.replace("$", "")) {
            index = position;
            temp = element;
            return false;
          }
          return true;
        });
        if (temp) {
          const image = getFirstImageUrl(temp?.acf?.header_image_data);
          modalClick(
            "eventListing",
            temp,

            image ? image : fallback
          );
        }
      }
    }
  }, [urlData]);

  useEffect(() => {
    resetFilters();
  }, [params]);

  const returnEventItems = (item: any) => {
    if (type == "eventByDate") {
      return `/eventByDate/${slug}?modal=${item._id}&date=${item.acf?.event_date}`;
    } else if (type == "eventCategory") {
      return `/eventCategory/${slug}?modal=${item._id}&date=${item.acf?.event_date}`;
    } else {
      return "";
    }
  };

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
  // useEffect(() => {
  //   setDisplayedItems(urlData.slice(0, 10)); // Reset to the first 10 items
  //   setNext(10); // Reset the counter for the next batch
  // }, [urlData]);

  // useEffect(() => {
  //   const refCurrent = containerRef.current;
  //   if (refCurrent) {
  //     refCurrent.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (refCurrent) {
  //       refCurrent.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [loading, next, urlData]);
  // alert(slug);

  console.log("eventsevents", events)
  const filteredData = events.filter((item: any) => {
    return handleEventEncoding("encode", item.slug) !== slug;
  });


  const Event = (
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
            <ImageContainer selected={false} onClick={handleShare}>
              <Image src={share} alt="Logo Outline" />
            </ImageContainer>
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
            <Link key={index} href={returnEventItems(item)} prefetch={true}>
              <SearchedData>
                <MainInsideWrapper>
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
                      <p className="month">
                        {formatMonth(item.acf?.event_date)}
                      </p>
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
            </Link>
          );
        })}
        <div style={{ height: "100px", backgroundColor: "transparent" }}>
          {loading && <p>Loading more items...</p>}
        </div>
        <AddListButton onClick={() => modalClick("ContactUsModal")}>
          <CommonButton text="Suggest an Event" />
        </AddListButton>
      </SearchedListContainer>
      <ScrollList
        params={"event-category-list"}
        background={"#EB5757"}
        bottom= "90px"
        data={filteredData}></ScrollList>
    </>
  );
  return <>
  {Event}
  <AdsBanner  />
  </>;
};

// Existing styles remain unchanged...

export default EventPage;

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

const filterUrls: any = (ImageUrlData: any) => {
  const imageUrls: string[] = [];
  ImageUrlData?.forEach((item: any) => {
    if (item) {
      try {
        const jsonData = JSON.parse(item);
        const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

        if (
          (url && (url.endsWith(".jpg") || url.endsWith(".png"))) ||
          url.endsWith(".jpeg")
        ) {
          imageUrls.push(url);
        } else {
          imageUrls.push(
            "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
          ); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(
          "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
        ); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
      ); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};
