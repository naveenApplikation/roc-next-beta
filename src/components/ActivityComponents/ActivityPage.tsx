"use client";
import {
  CloseModal,
  locationMark,
  bookmark,
  share,
  bookmarkActive,
} from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next-nprogress-bar";

import { handleFilter } from "@/app/utils/mappingFun";

import { addAndRemoveBookmark } from "@/app/action";
import { Spin } from "antd";
import CustomBanner from "@/components/AdComponent/CustomBanner";

import { activities } from "@/app/utils/data";
import ScrollList from "@/components/scrollList/ScrollList";
import FilterSection from "@/components/AllModalScreen/FilterModalScreenForEvents/FilterSection";
import { filterEvents } from "@/components/AllModalScreen/FilterModalScreenForEvents/Filters";
import ActivityFilterSection from "../AllModalScreen/FilterModalScreenForEvents/ActivityFIlterSection";
import { useParams } from "next/navigation";
import AdsBanner from "../adsBanner/page";
interface ActivityBoxProps {
  isShare?: any;
  urlData?: any;
  bookmarkState: boolean;

  urlTitle?: string;

  loader?: boolean;
  modal?: any;
  type: "activityCategory";
  slug: string;
}

const ActivityPage: React.FC<ActivityBoxProps> = ({
  isShare,
  urlTitle,
  urlData,

  bookmarkState,
  loader,
  modal,
  type,
  slug,
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
    resetFilters,
  } = useMyContext();

  const router = useRouter();
  const params = useParams();

  // const handleBack = () => {
  //   router.back();
  //   if (modalType.modalFilterList) {
  //     closeModal("modalFilterList");
  //     setSelectFilter("Any");
  //   }
  // };
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginToken")
      : null;

  const [filteredUrls, setFilteredUrls] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(urlData);
  const [isBookmark, setBookmark] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  //   const handleBookMark = async () => {
  //     if (token) {
  //       setBookmarkLoader(true);
  //       const res = await addAndRemoveBookmark("activity-bookmark", categoryId);

  //       if (res) {
  //         setBookmark(!isBookmark);
  //         setBookmarkLoader(false);
  //       } else {
  //         setBookmarkLoader(false);
  //       }
  //     } else if (!token) {
  //       modalClick("LoginSignupModal");
  //     }
  //   };

  const handleShare = () => {
    if (!socialShare) {
      handleSocialShare();
    }
  };

  // let filterData = handleFilter(urlData, selectFilter);
  // let dataTraverse = filterData;
  const handlemodal = (id: any) => {
    let temp,
      index = 0;
    urlData.forEach((element: any, position: any) => {
      if (element._id === id) {
        index = position;
        temp = element;
      }
    });
    console.log("");
    modalClick(
      "activities",
      temp,
      filteredUrls[index] ? filteredUrls[index] : fallback
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const modalId = urlParams.get("modal");

      if (modalId) {
        handlemodal(modalId);
      }
    }
  }, [urlData]);

  useEffect(() => {
    resetFilters();
  }, [params]);

  useEffect(() => {
    const filEve = filterEvents(urlData, eventFilters);
    const ImageUrlData = filEve?.map(
      (item: any) => item?.acf?.header_image_data
    );

    setFilteredUrls(filterUrlsForActivity(ImageUrlData));
    setDisplayedItems(filEve);
  }, [eventFilters]);

  const handlemodalView = (item: any) => {
    router.replace(`/activityCategory/${slug}?modal=${item._id}`);
  };

  const filteredData = activities.filter((item) => {
    return !item.listName
      .toLowerCase()
      .includes(urlTitle ? urlTitle.toLowerCase() : "");
  });

  // filterData = filterEvents(filterData, eventFilters);
  // console.log(filterData, "filtered data");

  return (
    <>
      {/* {isShare && <Backdrop></Backdrop>} */}
      <SearchedListContainer>
        <Header className="">
          <TitleText>{urlTitle}</TitleText>
          {/* <Image
            style={{ width: 40, height: 40, cursor: "pointer" }}
            src={CloseModal}
            alt="Logo Outline"
            onClick={() => handleBack()}
          /> */}
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}>
            {/* <ImageContainer
              selected={isBookmark}
              onClick={() => {
                // handleBookMark();
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
            </ImageContainer> */}
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
          <ActivityFilterSection pageTitle="categoryEvent" />
        </div>
        {displayedItems?.map((item: any, index: any) => {
          return (
            <SearchedData
              key={index}
              onClick={() => {
                handlemodalView(item);
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  flex: 1,
                  cursor: "pointer",
                }}>
                <Image
                  src={filteredUrls[index] ? filteredUrls[index] : fallback}
                  width={500}
                  height={80}
                  unoptimized
                  style={{
                    borderRadius: 4,
                    width: "80px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
                <div className="restroRating">
                  <p className="shopName">{item.acf?.title}</p>

                  <PriceAndLabelText>
                    {item.acf?.parish.label} ⋅ Activity
                  </PriceAndLabelText>
                  <PriceAndLabelText>
                    {item.acf.price_to || item.acf.price_from ? "£" : ""}
                    {(item.acf.price_from ? item.acf.price_from : "") +
                      (item.acf.price_to && item.acf.price_from ? "-" : "") +
                      (item.acf.price_to ? item.acf.price_to : "")}
                  </PriceAndLabelText>
                </div>
              </div>
            </SearchedData>
          );
        })}

        <AddListButton onClick={() => modalClick("ContactUsModal")}>
          <CommonButton text="Suggest an Event" />
        </AddListButton>
      </SearchedListContainer>
      {/* <AdsBanner className="75px" /> */}
      <ScrollList
        data={filteredData}
        params={"activity-list"}
        background={"#F2994A"}>

        </ScrollList>
      {/* <CustomBanner /> */}
    </>
  );
};

const Backdrop = styled.div`
  @media screen and (max-width: 800px) {
    background-color: gray;
    position: fixed;
    bottom: 100%;
    inset: 0px;
    opacity: 0.5;
  }
`;

export default ActivityPage;

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

const PriceAndLabelText = styled.p`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.12px;
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

const filterUrlsForActivity: any = (ImageUrlData: any) => {
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
