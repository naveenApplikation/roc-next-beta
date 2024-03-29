"use client";

import Image from "next/image";
import React, { useState } from "react";
import CommonButton from "../button/CommonButton";

import styled from "styled-components";
// import logoBlack from '../../../assets/images/logoBlack.svg';
import {
  headerHome,
  home,
  logoBlack,
  MobileRocLogo,
  mapIcon,
  mapIconDark,
  profileIcon,
  profileIconDark,
  search,
  user,
} from "@/app/utils/ImagePath";

interface ShadowWrapperProps {
  children: React.ReactNode;
}

const StyledShadowWrapper = styled.div`
  position: relative;
  /* display: inline-block; */

  .shadow-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Black with 50% opacity */
    z-index: 10;
  }

  .content-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    padding: 0px 40px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: 600px) {
      width: 100%;
  }
  }

  .content-wrapper input {
    margin-right: 10px;
  }

  .content-wrapper button {
    padding: 5px 10px;
    cursor: pointer;
  }
`;


const ContentInfo = styled.div`
  color: var(--White, #fff);
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const MenuInputField = styled.div`
  width: 100%;
  height: 48px;
  position: relative;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background: var(--White, #fff);
`;

const AccountInputText = styled.input`
  outline: none;
  width: 100%;
  color: black;
  border: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  background: var(--White, #fff);
  text-align: center;

  &::placeholder {
    color: black; /* Change the color to your desired color */
  }
`;

const JoinText = styled.p`
  color: var(--White, #fff);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px; /* 118.75% */
  text-decoration-line: underline;
`;

const ShadowWrapper: React.FC<ShadowWrapperProps> = ({ children }) => {
  const [showContent, setShowContent] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleOKClick = () => {
    // Assuming inputValue contains the entered number
    if (inputValue.trim() !== "") {
      setShowContent(false);
    }
  };

  return (
    <StyledShadowWrapper>
      {showContent && (
        <>
          <div className="shadow-background"></div>
          <div className="content-wrapper">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image src={MobileRocLogo} alt="right icon" />
            </div>
            <ContentInfo>
              Enter the private invite code or sign up to the waiting list
            </ContentInfo>
            <div>
              <MenuInputField>
                <AccountInputText
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter code"
                />
              </MenuInputField>
              <div onClick={handleOKClick} style={{ marginTop: 8 }}>
                <CommonButton text="submit" />
              </div>
            </div>
            <div>
              <JoinText>Join the waiting list</JoinText>
              <JoinText style={{marginTop:24}}>Read more about ROC</JoinText>
            </div>
          </div>
        </>
      )}
      {children}
    </StyledShadowWrapper>
  );
};

export default ShadowWrapper;
