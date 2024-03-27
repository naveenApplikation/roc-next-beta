import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { banjo } from "@/app/utils/ImagePath";

interface MenuProps {
  title?: string;
  MenutitleDetail?: string;
  isOpen?: () => void;
  containerImageUrl?: boolean;
  menuImageUrl?: any;
  headerImage?: any;
}

const ScrollingMenuDishes = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  flex-shrink: 0;
  cursor: pointer;
`;

const UtensilsDishesImage = styled.div`
  border-radius: 4px;
  background: #c4c4c4;
  height: 64px;
  align-self: stretch;
`;

const Title = styled.p`
  white-space: nowrap;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const Menutitle = styled.p`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MenuIconContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 16px;
`;

const MenuIcon = styled(Image)`
  /* width: 11px;
  height: 12px; */
`;

const RatingMenu: React.FC<MenuProps> = ({
  containerImageUrl,
  title,
  menuImageUrl,
  MenutitleDetail,
  headerImage,
  isOpen
}) => {
  return (
    <ScrollingMenuDishes onClick={isOpen}>
      {containerImageUrl && (
        <>
          <UtensilsDishesImage>
            <Image
              style={{ width: "-webkit-fill-available", height: "64px", borderRadius: "6px" }}
              src={headerImage} alt="" />
          </UtensilsDishesImage>
          {title && (
            <MenuIconContainer>
              {menuImageUrl && <MenuIcon src={menuImageUrl} alt="icon" />}
              <Title>{title}</Title>
            </MenuIconContainer>
          )}
          <Menutitle>{MenutitleDetail}</Menutitle>
        </>
      )}
    </ScrollingMenuDishes>
  );
};

export default RatingMenu;
