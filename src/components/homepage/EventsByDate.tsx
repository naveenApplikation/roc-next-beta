"use client";

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { wellbeingImg } from "@/app/utils/ImagePath";
import { eventsByDate } from "@/app/utils/homeIcon";

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

const EventsByDate = () => {
  const { menuClick } = useMyContext();

  console.log(eventsByDate);
  return (
    <>
      <MenuDetails title="Events by date" hideShowAll={true} />
      <ScrollingMenu>
        {!eventsByDate
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : eventsByDate.length
          ? eventsByDate.map((item: any, index: any) => {
              return (
                <CommunityContainer
                  key={index}
                  style={{ background: item?.color, cursor: "pointer" }}
                  onClick={() => menuClick("EventsByDate", true, item?.name)}
                >
                  <p style={{ textAlign: "end" }}> {item?.icon}</p>
                  <p style={{ paddingBottom: "5px" }}>{item?.name}</p>
                </CommunityContainer>
              );
            })
          : ""}
      </ScrollingMenu>
    </>
  );
};

export default EventsByDate;
