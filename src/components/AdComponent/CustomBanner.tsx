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

  @media (min-width: 800px) {
    max-width: 480px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
  }
  @media screen and (min-width: 390px) {
    padding-top: 5px;
    padding-bottom: 5px;
    position: fixed;
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
    window.open("https://amzn.to/3Xjl874", "_blank");
  };
  return (
    <AdContainer onClick={handleClick}>
      <AdBody>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/roc-web-app-8a6e8.appspot.com/o/ADS%2FAmazon%20Banner%20Draft%201.png?alt=media&token=adec7612-054e-446a-a01b-45e72319c87b"
          alt="Ads"
          width={390}
          height={60}
          // layout="fill" // This makes the image cover the entire container
        />
      </AdBody>
    </AdContainer>
  );
}
