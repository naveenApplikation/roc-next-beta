import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import chevronRight from "../../../assets/images/chevron-right.png";
import CommonButton from "../../components/button/CommonButton";

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
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: ${(props) => (props.$isSelected ? "2px solid" : "none")};
  background:${(props) => (props.$isSelected ? "#2F80ED" : "rgba(47, 128, 237, 0.08)")};
  cursor: pointer;
  border-color: ${(props) => (props.$isSelected ? "#2F80ED" : "black")};

  p {
    color: ${(props) => (props.$isSelected ? "#fff" : "black")};
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
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
  padding: 16px 0px;
  margin: 0px 24px;
`;

const AdventureOption = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0px;
  margin: 0px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  p {
    color: var(--BODY, #000);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const DirectionModal: React.FC = () => {
  const [selectedBox, setSelectedBox] = useState<number | null>(0);
  const [selectedButtonBox, setSelectedButtonBox] = useState<number | null>(
    null
  );
  const [selectedRatingBox, setSelectedRatingBox] = useState<number | null>(
    null
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

  const data = ["17min", "1hr53", "38min", "33min"];

  const buttonData = ["Taxis", "Buses","Bike Hire","Cycling routes","Car hire"];

  const RatingData = ["Any", "3.5", "4.0", "4.5"];

  return (
    <Container>
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
      <div style={{ height: "291px" }}></div>
      <div style={{ padding: "0px 24px" }}>
        <CommonButton text="View in maps" />
      </div>
      <div>

      {buttonData.map((item,index) => (
        <AdventureOption key={index}>
            <p>{item}</p>
            <Image
              src={chevronRight}
              style={{ height: "14px", width: "9px" }}
              alt="icon"
              />
          </AdventureOption>
      ))}
      </div>
    </Container>
  );
};

export default DirectionModal;
