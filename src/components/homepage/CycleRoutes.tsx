"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { cycleRouteData } from "@/app/utils/data";

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
  padding: 7px 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;
  cursor: pointer;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  }
`;
const CycleRoutes = () => {
  
  const {modalClick } = useMyContext();

  return (
    <>
      <MenuDetails title="Cycle Routes" hideShowAll={true} />
      <ScrollingMenu>
        {cycleRouteData.length
          ? cycleRouteData?.map((item: any, index: any) => {
              return (
                <CommunityContainer
                  key={index}
                  style={{ background: item?.color }}
                  onClick={() => modalClick("walksModal", item)}
                >
                  <Image
                    src={item?.icon}
                    alt=""
                    width={20}
                    height={20}
                    style={{ borderRadius: 4 }}
                  />
                  <p>{item?.name}</p>
                </CommunityContainer>
              );
            })
          : ""}
      </ScrollingMenu>
    </>
  );
};

export default CycleRoutes;
