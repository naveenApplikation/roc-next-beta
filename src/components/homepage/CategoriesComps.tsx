"use client";

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { handleEventEncoding } from "@/app/utils/commanFun";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

interface DashboardProps {
  data?: any;
  type: string;
  name: string;
  title: string;
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

const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: space-between;
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

const CategoriesComps: React.FC<DashboardProps> = ({
  data,
  name,
  type,
  title,
}) => {
  const router = useRouter();

  const getEventLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/eventCategory/${encodedName}`;
  };

  const getCategoryLink = (itemName: string) => {
    const encodedName = handleEventEncoding("encode", itemName);
    return `/activityCategory/${encodedName}`;
  };

  return (
    <>
      <MenuDetails
        isOpen={() => {
          if (type === "event-category-list") {
            router.push("eventCategory");
          } else {
            router.push("activityCategory");
          }
        }}
        title={title}
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <Skeleton width={80} height={80} style={{ borderRadius: 6 }} />
              </div>
            ))
          : data.length
          ? data.slice(0, 10).map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  href={
                    type === "event-category-list"
                      ? getEventLink(item.listName)
                      : getCategoryLink(item.listName)
                  }>
                  <CommunityContainer
                    style={{ background: item?.bgColor, cursor: "pointer" }}>
                    {item.image && (
                      <p style={{ textAlign: "end" }}> {item?.image}</p>
                    )}
                    <p style={{ paddingBottom: "5px" }}>{item?.listName}</p>
                  </CommunityContainer>
                </Link>
              );
            })
          : ""}
      </ScrollingMenu>
    </>
  );
};

export default CategoriesComps;
