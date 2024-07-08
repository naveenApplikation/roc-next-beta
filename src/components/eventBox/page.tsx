"use client";
import { CloseModal, locationMark } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fallback from "../../../assets/images/fallbackimage.png";
import { useRouter } from "next/navigation";
import FilterSection from "../filterSection";
import { handleFilter } from "@/app/utils/mappingFun";

interface EventBoxProps {
  urlData?: any;
  urlTitle?: string;
  filteredUrls?: any;
  loader?: boolean;
}

const EventBox: React.FC<EventBoxProps> = ({
  urlTitle,
  urlData,
  filteredUrls,
  loader,
}) => {
  const { modalClick, selectFilter, modalType, closeModal, setSelectFilter } = useMyContext();

  const skeletonItems = new Array(10).fill(null);

  const router = useRouter();

  const handleBack = () => {
    router.back();
    if (modalType.modalFilterList) {
      closeModal("modalFilterList")
      setSelectFilter("Any")
    }
  };

  const filterDate = handleFilter(urlData, selectFilter)
  return (
    <SearchedListContainer>
      <Header className="">
        <TitleText>{urlTitle}</TitleText>
        <Image
          style={{ width: 40, height: 40, cursor: "pointer" }}
          src={CloseModal}
          alt="Logo Outline"
          onClick={() => handleBack()}
        />
      </Header>
      <div style={{padding:'10px 0px'}}>

      <FilterSection pageTitle="eventBox" />
      </div>
      {loader
        ? skeletonItems.map((item, index) => (
            <SearchedData key={index}>
              <MainInsideWrapper>
                <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
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
                  onClick={() =>
                    modalClick(
                      "eventListing",
                      item,
                      filteredUrls[index] ? filteredUrls[index] : fallback
                    )
                  }>
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
                        {formatDate(item.acf.event_dates[0].date)}
                      </p>
                      <p className="month">
                        {formatMonth(item.acf.event_dates[0].date)}
                      </p>
                    </FamilyEventWrapperInside>
                  </FamilyEventWrapper>
                  <div className="restroRating">
                    <p className="shopName">{item.acf.title}</p>
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
                        {item.acf.event_dates[0].start_time} -{" "}
                        {item.acf.event_dates[0].end_time}
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
  );
};

export default EventBox;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SearchedListContainer = styled.div`
  padding: 40px;
  background-color: #f2f3f3;
  min-height: 100vh;
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
