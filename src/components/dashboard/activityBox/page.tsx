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
import fallback from "../../../../assets/images/fallbackimage.png";
import { useRouter } from "next-nprogress-bar";

import { handleFilter } from "@/app/utils/mappingFun";

import { addAndRemoveBookmark } from "@/app/action";
import { Spin } from "antd";
import CustomBanner from "@/components/AdComponent/CustomBanner";

import { activities } from "@/app/utils/data";
import ScrollList from "@/components/scrollList/ScrollList";
import FilterSection from "@/components/AllModalScreen/FilterModalScreenForEvents/FilterSection";
import { filterEvents } from "@/components/AllModalScreen/FilterModalScreenForEvents/Filters";
interface ActivityBoxProps {
  isShare?: any;
  urlData?: any;
  bookmarkState: boolean;
  categoryId: string;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
  modal?: any;
}

const ActivityBox: React.FC<ActivityBoxProps> = ({
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

  const router = useRouter();

  useEffect(() => {
    setBookmark(bookmarkState);
  }, [bookmarkState]);
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
  const [isBookmark, setBookmark] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const handleBookMark = async () => {
    if (token) {
      setBookmarkLoader(true);
      const res = await addAndRemoveBookmark("activity-bookmark", categoryId);

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

  let filterData = handleFilter(urlData, selectFilter);
  let dataTraverse = filterData;
  const handlemodal = (id: any) => {
    let temp,
      index = 0;
    dataTraverse.forEach((element: any, position: any) => {
      if (element._id === id) {
        index = position;
        temp = element;
      }
    });
    modalClick(
      "activities",
      temp,
      filteredUrls[index] ? filteredUrls[index] : fallback
    );
  };
  useEffect(() => {
    if (modal) {
      handlemodal(modal);
    }
  }, [modal]);

  const handlemodalView = (item: any, pos: any) => {
    console.log(item._id);
    router.replace(
      `/categories/activity-list?search=${categoryId}&modal=${item._id}`
    );
  };

  const filteredData = activities.filter((item) => {
    return item.listName.toLowerCase() != urlTitle?.toLowerCase();
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
            }}
          >
            <ImageContainer
              selected={isBookmark}
              onClick={() => {
                handleBookMark();
              }}
            >
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
          }}
        >
          <FilterSection pageTitle="categoryEvent" />
        </div>
        {loader
          ? skeletonItems.map((item, index) => (
              <SearchedData key={index}>
                <MainInsideWrapper>
                  <Skeleton
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <div className="restroRating">
                    <Skeleton
                      width={160}
                      height={17}
                      style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                      width={100}
                      height={14}
                      style={{ borderRadius: 8 }}
                    />
                    <Skeleton
                      width={80}
                      height={13}
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                </MainInsideWrapper>
              </SearchedData>
            ))
          : filterData?.map((item: any, index: any) => {
              return (
                <SearchedData
                  key={index}
                  onClick={() => handlemodalView(item, index)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      flex: 1,
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      width={500}
                      height={80}
                      style={{
                        borderRadius: 4,
                        width: "80px",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                    <div className="restroRating">
                      <p className="shopName">{item.acf.title}</p>

                      <PriceAndLabelText>
                        {item.acf.parish.label} ⋅ Activity
                      </PriceAndLabelText>
                      <PriceAndLabelText>
                        {item.acf.price_to || item.acf.price_from ? "£" : ""}
                        {(item.acf.price_from ? item.acf.price_from : "") +
                          (item.acf.price_to && item.acf.price_from
                            ? "-"
                            : "") +
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
      <ScrollList
        data={filteredData}
        params={"activity-list"}
        background={"#F2994A"}
      ></ScrollList>
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

export default ActivityBox;

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
  padding-bottom: 130px;
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
