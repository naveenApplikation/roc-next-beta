import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { topAttractionItem } from "@/app/dashboard/data";
import Image from "next/image";

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

const TopAttractionContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  p {
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const TopAttractionprofile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-size: contain;
`;

const TopAttractions: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
     <MenuDetails isOpen={() => menuClick("Top Attractions", true,2)} title="Top Attractions" />
      <ScrollingMenu>
        {topAttractionItem.map((item, index) => {
          return (
            <TopAttractionContainer
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => modalClick("ModalContent", item)}
            >
              <TopAttractionprofile>
                <Image
                  src={item.headerImage}
                  alt=""
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                  // alt=""
                />
              </TopAttractionprofile>
              <p>{item.resturantName}</p>
            </TopAttractionContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default TopAttractions;
