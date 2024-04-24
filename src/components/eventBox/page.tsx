import { familyEventMenuItem } from "@/app/dashboard/data";
import { blank, locationMark, utensils } from "@/app/utils/ImagePath";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterSection from "@/components/filterSection";
import CommonButton from "@/components/button/CommonButton";
import { useMyContext } from "@/app/Context/MyContext";
import {fetchDatAll } from "@/app/API/Baseurl";
import {formatMonth,formatDate} from '@/app/utils/date'
import {ApiResponse} from '@/app/utils/types'

interface EventBoxProps {
  urlData?: any;
  urlTitle?: string;
  filteredUrls?:any
}

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
const MonthText = styled.p`
  background: crimson;
  font-size: 10px;
  color: white;
  width: max-content;
  padding: 3px 8px;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

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

const EventBox: React.FC<EventBoxProps> = ({ urlTitle, urlData,filteredUrls }) => {

  const {modalClick} = useMyContext();

  return (
    <SearchedListContainer>
      <TitleText>{urlTitle}</TitleText>
      {urlData != 77 && (
        <div style={{ margin: "24px 0px" }}>
          <FilterSection />
        </div>
      )}
      {urlData?.map((item: any, index: any) => {
        return (
          <SearchedData key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <FamilyEventWrapper>
                <Image
                  src={filteredUrls[index]}
                  alt=""
                  width={80}
                  height={80}
                  style={{ borderRadius: 4, cursor: "pointer" }}
                  onClick={() => modalClick("eventListing", item,filteredUrls[index])}
                />
                <FamilyEventWrapperInside>
                  <p className="date">{formatDate(item.acf.event_dates[0].date)}</p>
                  <p className="month">{formatMonth(item.acf.event_dates[0].date)}</p>
                </FamilyEventWrapperInside>
              </FamilyEventWrapper>
              <div className="restroRating">
                <p className="shopName">{item.acf.title}</p>
                <DetailContainer>
                  <Image
                    src={locationMark}
                    style={{
                      width: "13px",
                      height: "13px",
                      marginRight: 8,
                    }}
                    alt="utensils"
                  />
                  <p>{item.acf.parish.label}</p>
                </DetailContainer>
                <p>
                  <span>{item.acf.event_dates[0].start_time} - {item.acf.event_dates[0].end_time}</span>
                </p>
              </div>
            </div>
          </SearchedData>
        );
      })}
      <AddListButton>
        <CommonButton text="Suggest an Event" />
      </AddListButton>
    </SearchedListContainer>
  );
};

export default EventBox;
