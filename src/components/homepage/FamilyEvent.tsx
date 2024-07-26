"use client";

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import { formatMonth, formatDate } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { skeletonItems } from "@/app/utils/date";
import fallback from "../../../assets/images/fallbackimage.png";

interface DashboardProps {
  data?: any;
}

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

const FamilEventContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;

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
    background-color: #ba2b2b;
    width: fit-content;
    color: #fff;
    width: 30px;
    border-radius: 0px 0px 4px 4px;
  }
`;

const FamilEventText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  border-radius: 4px;
`;

const MainImage = styled(Image)`
  border-radius: 6px;
`;

const FamilyEvent: React.FC<DashboardProps> = ({ data }) => {
  const { filterUrls, modalClick, menuClick } = useMyContext();

  const ImageUrlData = data.map((item: any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("event-list", true, "669ecfbf9a4bf462b63f3840")}
        title="Upcoming Events"
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
                <Skeleton
                  width={80}
                  height={15}
                  style={{ marginTop: 8, borderRadius: 6 }}
                />
              </div>
            ))
          : data.slice(0, 10).map((item: any, index: any) => {
              return (
                <FamilEventContainer
                  key={index}
                  onClick={() =>
                    modalClick(
                      "eventListing",
                      item,
                      filteredUrls[index] ? filteredUrls[index] : fallback
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <FamilyEventWrapper>
                    <MainImage
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      alt=""
                      width={500}
                      height={80}
                      style={{
                        borderRadius: 4,
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
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
                  <FamilEventText>{item.acf.title}</FamilEventText>
                </FamilEventContainer>
              );
            })}
      </ScrollingMenu>
    </>
  );
};

export default FamilyEvent;
