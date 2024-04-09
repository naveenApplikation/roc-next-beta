import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { LocalCuisineMenuItem } from "@/app/dashboard/data";

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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const LocalCusine: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Local cuisine", true, 1)}
        title="Local cuisine"
      />
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => (
          // return (
          <div key={index}>
            <RatingMenu
              title={item.menuName}
              menuImageUrl={item.image}
              headerImage={item.headerImage}
              containerImageUrl={true}
              MenutitleDetail={item.resturantName}
              isOpen={() => modalClick("ModalContent", item)}
              // isOpen={() => modalClick("eventListing")}
            />
          </div>
          // );
        ))}
      </ScrollingMenu>
    </>
  );
};

export default LocalCusine;
