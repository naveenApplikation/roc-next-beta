import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface ButtonProps {
  text: string;
  image?: any;
  bcColor?: string;
  imageStyle?: number;
  isOpen?:()=>void;
}

const Container = styled.div`
  display: flex;
  padding: 18px 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 8px;
  background-color: #2f80ed;
  cursor: pointer;
`;

const TitleText = styled.p`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media screen and (max-width: 340px) {
    font-size: 13px;
  }
`;

const CommonButton: React.FC<ButtonProps> = ({
  bcColor,
  image,
  text,
  imageStyle,
  isOpen,}) => {
  return (
    <Container style={{ backgroundColor: bcColor }} onClick={isOpen}>
      {image && (
        <Image
          style={{ width: imageStyle, height: "auto" }}
          src={image}
          alt="icon"
        />
      )}

      <TitleText>{text}</TitleText>
    </Container>
  );
};

export default CommonButton;
