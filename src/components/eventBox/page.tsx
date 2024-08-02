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
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next-nprogress-bar";

import FilterSection from "../filterSection";
import { handleFilter } from "@/app/utils/mappingFun";
import CustomBanner from "../AdComponent/CustomBanner";
import { addAndRemoveBookmark } from "@/app/action";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import ScrollList from "../scrollList/ScrollList";
import { events } from "@/app/utils/data";
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
  } = useMyContext();

  const skeletonItems = new Array(10).fill(null);
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loginToken")
      : null;

  const router = useRouter();
  const params = useParams();
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

  const [isBookmark, setBookmark] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
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

  const filterDate = handleFilter(urlData, selectFilter);

  let dataTraverse = filterDate;
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
      "eventListing",
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
      `/categories/${params.eventName}?search=${categoryId}&modal=${item._id}`
    );
  };
  const filteredData = events.filter((item) => {
    return item.listName.toLowerCase() != urlTitle?.toLowerCase();
  });
  console.log(urlTitle);
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
          : filterDate?.map((item: any, index: any) => {
              return (
                <SearchedData key={index}>
                  <MainInsideWrapper
                    onClick={() => {
                      handlemodalView(item, index);
                    }}
                  >
                    <FamilyEventWrapper>
                      <img
                        src={filteredUrls[index]}
                        alt="image"
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                      <FamilyEventWrapperInside>
                        <p className="date">
                          {/* {formatDate(
                            item.acf.event_dates[0]
                              ? item.acf.event_dates[0].date
                              : ""
                          )} */}
                        </p>
                        <p className="month">
                          {/* {formatMonth(item.acf?.event_dates[0]?.date)} */}
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
                          {/* {item.acf?.event_dates[0]?.start_time} -{" "}
                          {item.acf?.event_dates[0]?.end_time} */}
                        </span>
                      </p>
                    </div>
                  </MainInsideWrapper>
                </SearchedData>
              );
            })}

        <AddListButton onClick={() => modalClick("ContactUsModal")}>
          <CommonButton text="Suggest an Event" />
        </AddListButton>
      </SearchedListContainer>

      {urlTitle && (
        <ScrollList background={"#EB5757"} data={filteredData}></ScrollList>
      )}
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
