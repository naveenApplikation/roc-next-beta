import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import star from "../../../assets/images/star.svg";
import CommonButton from '../../components/button/CommonButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.p`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0px 24px;
`;

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 24px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const Box = styled.div<{ $isSelected: boolean }>`
  display: flex;
  height: 48px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: ${(props) => (props.$isSelected ? "2px solid" : "none")};
  background: rgba(47, 128, 237, 0.08);
  cursor: pointer;
  border-color: ${(props) => (props.$isSelected ? "#2F80ED" : "black")};

  p {
    color: ${(props) => (props.$isSelected ? "#2F80ED" : "black")};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  img {
    margin-left: 3px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  padding: 0px 24px;
`;

const FilterModal: React.FC = () => {
  const [selectedBox, setSelectedBox] = useState<number | null>(0);
  const [selectedButtonBox, setSelectedButtonBox] = useState<number | null>(
    0
  );
  const [selectedRatingBox, setSelectedRatingBox] = useState<number | null>(
    0
  );

  const handleBoxClick = (boxIndex: number) => {
    setSelectedBox(boxIndex);
  };

  const handleButtonBoxClick = (boxIndex: number) => {
    setSelectedButtonBox(boxIndex);
  };

  const handleBoxRatingClick = (boxIndex: number) => {
    setSelectedRatingBox(boxIndex);
  };

  const data = ["Any", "1KM", "2KM", "4KM", "8KM"];

  const buttonData = ["Any", "Open now"];

  const RatingData = ["Any", "3.5", "4.0", "4.5"];

  return (
    <Container>
      <Title>Distance to me</Title>
      <ScrollingMenu>
        {data.map((item, index) => (
          <Box
            key={index}
            $isSelected={selectedBox === index}
            onClick={() => handleBoxClick(index)}
          >
            <p>{item}</p>
          </Box>
        ))}
      </ScrollingMenu>
      <Title>Opening hours</Title>
      <ButtonBox>
        {buttonData.map((item, index) => (
          <Box
            key={index}
            $isSelected={selectedButtonBox === index}
            onClick={() => handleButtonBoxClick(index)}
            style={{ flex: 1 }}
          >
            <p>{item}</p>
          </Box>
        ))}
      </ButtonBox>
      <Title>Rating</Title>
      <ScrollingMenu>
        {RatingData.map((item, index) => (
          <Box
            key={index}
            $isSelected={selectedRatingBox === index}
            onClick={() => handleBoxRatingClick(index)}
          >
            <p>{item}</p>
            {index >= 1 && <Image src={star} alt="icon" />}
          </Box>
        ))}
      </ScrollingMenu>
      <div style={{padding:"0px 24px"}}>
      <CommonButton text="Filter" />
      </div>
    </Container>
  );
};

export default FilterModal;
