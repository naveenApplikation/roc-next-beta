import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { community } from "@/app/dashboard/data";
import Image from "next/image";
import CommonButton from "@/components/button/CommonButton";

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
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

const TrendingList: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
       <MenuDetails
        isOpen={() => menuClick("TrendingList")}
        title="Trending Lists"
      />
      <ScrollingMenu>
        {community.map((item, index) => {
          return (
            <CommunityContainer key={index} style={{ background: item.color }}>
              <Image src={item.image} alt="right icon" /> <p>{item.name}</p>
            </CommunityContainer>
          );
        })}
      </ScrollingMenu>
      <div
        style={{ padding: "0px 40px" }}
        onClick={() => menuClick("AddToCreate")}
      >
        <CommonButton text="Create a List" />
      </div>
    </>
  );
};

export default TrendingList;
