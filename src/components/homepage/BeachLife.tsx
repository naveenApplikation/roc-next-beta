import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { WalksData } from "@/app/dashboard/data";
import { boxOverlay, yellowStar } from "@/app/utils/ImagePath";
import Image from "next/image";
import RatingMenu from "@/components/dashboard/RatingMenu";

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

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #ffffffcc;
  display: flex;
  align-items: end;
  flex-direction: column;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 10px;
  }
  img {
    height: 85px;
    width: 100%;
    /* border-radius: 10px; */
  }
`;

const BeachLife: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  return (
    <>
     <MenuDetails isOpen={() => menuClick("Events")} title="Beach life " />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer
              onClick={() => menuClick("Events")}
              key={index}
              style={{
                backgroundImage: `url(${boxOverlay.src}) !important`,
              }}
            >
              <Image
                src={item.headerImage}
                alt=""
                width={120}
                height={64}
                // alt=""
              />
              <p>{item.name}</p>
            </WalkContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default BeachLife;
