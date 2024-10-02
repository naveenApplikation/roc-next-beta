"use client";
import {
  CloseModal,
  locationMark,
  bookmark,
  share,
  bookmarkActive,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
  useMemo,
} from "react";
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
import {
  filterEvents,
  parseDate,
  parseDateRange,
  parseStateDateRange,
} from "../AllModalScreen/FilterModalScreenForEvents/Filters";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { convertGCSUrl, handleEventEncoding } from "@/app/utils/commanFun";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";
import Instance from "@/app/utils/Instance";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
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
    closeModal,
    handleFilterOption,
  } = useMyContext();

  const [filteredUrls, setFilteredUrls] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(urlData); // Only show first 10 items initially
  const [currentData, setCurrentData] = useState(urlData); // for upcoming events only
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(10); // Track the next batch of items
  const containerRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const pathName = usePathname();

  const handleShare = () => {
    if (!socialShare) {
      handleSocialShare();
    }
  };
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (event) {
        event.preventDefault();
      },
      { passive: true }
    );
    if (params?.event) {
      resetFilters();
    }
  }, [params?.event]);
  console.log(eventFilters);
  const [isDate, setDate] = useState(false);
  const dateWiseUpdate = async (range: string) => {
    try {
      setLoading(true);

      const result = await Instance.get(
        `/upcomming-events?type=range&date=${range}`
      );
      console.log(result.data);
      //  const filEve = filterEvents(result.data.data, eventFilters);
      //     const ImageUrlData = result.data.data?.map(
      //   (item: any) => item?.acf?.header_image_data
      // );
      //    setFilteredUrls(filterUrls(ImageUrlData));
      setCurrentData(result.data.data);
      setDate(true);
    } catch (error) {
      setLoading(false);
      setCurrentData(urlData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //only this initiate whenever the date change

    if (eventFilters.date && pathName?.includes("upcoming")) {
      // only if in upcoming events
      const { startDate, endDate } = parseStateDateRange(eventFilters.date);
      const lastDate = urlData[urlData.length - 1].acf?.event_date;
      console.log(
        startDate > parseDate(lastDate) || endDate > parseDate(lastDate)
      );
      if (startDate > parseDate(lastDate) || endDate > parseDate(lastDate)) {
        const format = parseDateRange(eventFilters.date);
        dateWiseUpdate(format);
      } else {
        setDate(false);
      }
    } else {
      setDate(false);
    }
  }, [eventFilters.date]);

  useEffect(() => {
    const filEve = filterEvents(isDate ? currentData : urlData, eventFilters);
    const ImageUrlData = filEve?.map(
      (item: any) => item?.acf?.header_image_data
    );
    setFilteredUrls(filterUrls(ImageUrlData));
    setDisplayedItems(filEve);
  }, [eventFilters, isDate, currentData]);

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
        displayedItems.every((element: any, position: any) => {
          if (
            date &&
            element._id === modalId.replace("$", "") &&
            element.acf.event_date === date
          ) {
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

  const returnEventItems = (item: any) => {
    if (type == "eventByDate") {
      return `/eventByDate/${slug}?modal=${item._id}&date=${item.acf?.event_date}`;
    } else if (type == "eventCategory") {
      return `/eventCategory/${slug}?modal=${item._id}&date=${item.acf?.event_date}`;
    } else {
      return "";
    }
  };

  const filteredData = events.filter((item: any) => {
    return handleEventEncoding("encode", item.slug) !== slug;
  });

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = displayedItems[index];
    return (
      <Link key={index} href={returnEventItems(item)} prefetch={true}>
        <SearchedData style={style}>
          <MainInsideWrapper>
            <FamilyEventWrapper>
              <Image
                src={filteredUrls[index]}
                alt="image"
                width={500}
                height={80}
                style={{
                  objectFit: "cover",
                  width: "80px",
                  height: "80px",
                }}
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
                ) : null}
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
  };

  const Event = (
    <>
      <AutoSizer style={{ height: "inherit", width: "inherit" }}>
        {({ height, width }) => (
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

              <List
                height={600}
                itemCount={displayedItems.length + 1}
                itemSize={100}
                width={width}>
                {({ index, style }) => (
                  <>
                    {index < displayedItems.length ? (
                      <Row index={index} style={{ ...style, width: "95%" }} />
                    ) : (
                      <div
                        style={{
                          ...style,
                          width: "80%",
                          height: "80px",
                          //  display: 'flex',
                          //  justifyContent:"center",
                          //  alignItems:"center",
                        }}>
                        {!loading && (
                          <AddListButton
                            onClick={() => {
                              modalClick("filterOption");
                              handleFilterOption("dates");
                            }}>
                            <CommonButton text="For more Events" />
                          </AddListButton>
                        )}
                      </div>
                    )}
                  </>
                )}
              </List>

              {loading && (
                <Loader
                  style={{
                    position: "absolute",
                    background: "black",
                    inset: "0",
                    opacity: "0.7",
                  }}>
                  <Loader
                    style={{
                      position: "absolute",
                      inset: "0",
                      display: "flex",
                      justifyContent: "center",
                      top: "30%",
                    }}>
                    {" "}
                    <CustomSpin tip="Loading" size="large"></CustomSpin>
                  </Loader>
                </Loader>
              )}
            </SearchedListContainer>
            <AdsBanner className="75px" />
            <ScrollList
              params={"event-category-list"}
              background={"#EB5757"}
              bottom="30px"
              data={filteredData}></ScrollList>
          </>
        )}
      </AutoSizer>
    </>
  );
  return <>{Event}</>;
};

// Existing styles remain unchanged...

export default EventPage;

const Loader = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;
const CustomSpin = styled(Spin)`
  .ant-spin-dot i {
    background-color: white !important; /* Change the color of the dots */
    font-size: 100px;
  }
`;
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
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  height: 110vh;
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
  padding-top: 40px;
  padding-left: 30px;
  height: 500px;
  width: 100%;
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
          imageUrls.push(convertGCSUrl(url));
        } else {
          imageUrls.push(fallback.src); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(fallback.src); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(fallback.src); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};
