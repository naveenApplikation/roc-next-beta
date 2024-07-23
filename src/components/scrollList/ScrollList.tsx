"use client";

import React from "react";
import styled from "styled-components";

interface ScrollListPage {
    data?: any;
    background?:any;
  }

const ScrollList: React.FC<ScrollListPage> = ({background,data}) => {

    const Test = ["Dine Guide","Italian","Lunch","Outdoor Dining","Arts & cultural","Active & Adrenaline","Beaches"]

  return (
    <>
    <Container>
        <MainWrapper>
        {Test.map((item)=>{
            return(
                <Wrapper style={{background:background}}>
                <p>{item}</p>
              </Wrapper>
            )
        })}
        </MainWrapper>
        <BlurContainer></BlurContainer>
    </Container>
    </>
  );
};

export default ScrollList;

const Container = styled.div`
  position: sticky;
  bottom: 0px;
  z-index: 1993;

  p {
    color: #fff;
    font-size: 14px;
    width: max-content;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BlurContainer = styled.div`
    height: 20px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
`;

const Wrapper = styled.div`
  border-radius: 24px;
  padding: 8px 12px;
  cursor: pointer;
`;
