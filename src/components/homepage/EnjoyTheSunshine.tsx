import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { EnjoyShineMenuItem } from "@/app/dashboard/data";

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

const EnjoyTheSunshine: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
    <MenuDetails
        isOpen={() => menuClick("Events")}
        title="Enjoy the sunshine"
      />
      <ScrollingMenu>
        {EnjoyShineMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                menuImageUrl={item.image}
                headerImage={item.headerImage}
                containerImageUrl={true}
                MenutitleDetail={item.resturantName}
                isOpen={() => modalClick("activities", item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default EnjoyTheSunshine;
