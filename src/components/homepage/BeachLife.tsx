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
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: end;
  flex-direction: column;
  position: relative;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;

const BeachLife: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  return (
    <>
      <MenuDetails title="Beach life " />
      <ScrollingMenu>
        {WalksData.map((item, index) => {
          return (
            <WalkContainer key={index}>
              <Image src={item.headerImage} alt="" width={120} height={64} />
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2FMask%20group.png?alt=media&token=6519fc68-65f1-4e2e-b4d5-dd90e9bf2380"
                alt=""
                width={120}
                height={64}
                style={{ position: "absolute", bottom: 0, height: 50 }}
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
