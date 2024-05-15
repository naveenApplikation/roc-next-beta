"use client";

import { sideWidth } from "@/app/utils/date";
import React from "react";
import styled from "styled-components";

interface GreetingsProps {
  ScreenSwitch?: Function;
  preScreen?: any;
  homePage?: any;
}



const GreetingList: React.FC<GreetingsProps> = ({
  ScreenSwitch,
  preScreen,
  homePage,
}) => {
  return (
    <GreetingsScreen>
      <GreetingTitle>Thank You!</GreetingTitle>
      <GreetingQuotes>
      Community is at the heart of what we do, and you’ve just helped fellow islanders and visitors 😊
      </GreetingQuotes>
      <GreetingBtnBox>
        <ViewListBtn onClick={homePage}>View My List</ViewListBtn>
      </GreetingBtnBox>
    </GreetingsScreen>
  );
};

export default GreetingList;








const GreetingsScreen = styled.div`
  width: ${sideWidth};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px 40px;
  gap: 24px;
  background: rgba(30, 29, 28, 0.9);
  backdrop-filter: blur(10px);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const GreetingTitle = styled.div`
  color: #fafaf9;
  font-family: IvyJournal;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GreetingQuotes = styled.div`
  width: 99%;
  color: #faf9f8;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
`;

const GreetingBtnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ViewListBtn = styled.div`
  width: 100%;
  padding: 12px 16px;
  color: var(--BODY, #000);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 8px;
  background: #faf9f9;
  cursor: pointer;
`;

const AnotherListBtn = styled.div`
  width: 100%;
  padding: 12px 16px;
  color: #faf9f9;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 8px;
  border: 2px solid #faf9f9;
  cursor: pointer;
`;

const BottomText = styled.div`
  color: #faf9f9;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  text-align: center;
`;