import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { BarMenuItem } from "@/app/dashboard/data";
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

const Sustainability: React.FC<DashboardProps> = ({
  modalClick,
  menuClick,
}) => {
  return (
    <>
      <MenuDetails title="Sustainability" isOpen={() => menuClick("Sustainability", true, 3)} />
      <ScrollingMenu>
        {BarMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                menuImageUrl={item.image}
                headerImage={item.headerImage}
                containerImageUrl={true}
                MenutitleDetail={item.resturantName}
                isOpen={() => modalClick("ModalContent", item)}
              />
            </div>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default Sustainability;
