import React from "react";
import styled from "styled-components";
import Image from "next/image";
import chevronRight from "../../../assets/images/modalImage/chevron-right.png";

interface ButtonProps {
  text: string;
  image?: any;
  bcColor: string;
  imageStyle?: number;
}

const Container = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.p`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

const DashBoardButton: React.FC<ButtonProps> = ({
  image,
  text,
  bcColor,
  imageStyle,
}) => {
  return (
    <Container style={{ backgroundColor: bcColor }}>
      {image ? 
      <Image
        style={{ width: imageStyle, height: "auto" }}
        src={image}
        alt="icon"
      />: ""}
      <TitleContainer>
        <TitleText>{text}</TitleText>
        <Image
          style={{ width: "8px", height: "13px" }}
          src={chevronRight}
          alt="icon"
        />
      </TitleContainer>
    </Container>
  );
};

export default DashBoardButton;
