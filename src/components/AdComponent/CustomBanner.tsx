"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

const AdContainer = styled.div`
  width: 100%;

  position: sticky;
  bottom: -2px;

  cursor: pointer;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3f9;
  @media screen and (max-width: 800px) {
    position: fixed;
  }
  @media screen and (min-width: 390px) {
    padding-top: 5px;
  }
`;

const AdBody = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AdText = styled.p`
  line-height: 2.3;
  font-size: 14px;
  font-weight: 300;
`;

export default function CustomBanner() {
  const handleClick = () => {
    window.open("https://www.caringcooksofjersey.com/", "_blank");
  };
  return (
    <AdContainer onClick={handleClick}>
      <AdBody>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FAds%2Fcaring_cooks.gif?alt=media&token=f9499fbc-7f8d-46d1-847c-b7d7c7a1821e"
          alt="Ads"
          width={390}
          height={60}
          // layout="fill" // This makes the image cover the entire container
        />
        <AdText>Featured Charity</AdText>
      </AdBody>
    </AdContainer>
  );
}
