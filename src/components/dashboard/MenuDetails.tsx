import React from "react";
import styled from "styled-components";
import {ProximaNovaRegular,interBold} from '../../../assets/styles/Font'

interface MenuProps {
  title: string;
  isOpen?: () => void;
  hideShowAll?: boolean
}

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const MenuTitle = styled.p`
  /* font-family: "ProximaNova"; */
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ViewAllText = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const MenuDetails: React.FC<MenuProps> = ({ isOpen, title, hideShowAll }) => {
  return (
    <div>
      <HeadMenu>
        <MenuTitle>{title}</MenuTitle>
        {!hideShowAll &&
          <ViewAllText onClick={isOpen}>
            View All
          </ViewAllText>}
      </HeadMenu>
    </div>
  );
};

export default MenuDetails;
