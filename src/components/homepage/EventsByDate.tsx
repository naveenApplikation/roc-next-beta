"use client";

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { eventsByDate } from "@/app/utils/homeIcon";
import { useRouter } from "next/navigation";
import { handleEventEncoding } from "@/app/utils/commanFun";
import Link from "next/link";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";

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
  const EventMenuClick = (item: any) => {
    return `/eventByDate/${handleEventEncoding("encode", item.name)}`;
  };
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
                <Link key={index} href={EventMenuClick(item)}>
                  <CommunityContainer
                    style={{ background: item?.color, cursor: "pointer" }}>
                    <p style={{ textAlign: "end" }}> {item?.icon} </p>
                    <p style={{ paddingBottom: "5px" }}>{item?.name} </p>
                  </CommunityContainer>
                </Link>
              );
            })
            : ""}
        {/* <BannerModal /> */}
      </ScrollingMenu>
    </>
  );
};

export default EventsByDate;
