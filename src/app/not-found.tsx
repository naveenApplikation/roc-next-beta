"use client";
import React from "react";
import Image from "next/image";
import { ROCLogo } from "./utils/ImagePath";
import styled from "styled-components";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const router = useRouter();
  const navigate = () => {
    router.push("/");
  };

  return (
    <div style={{ height: "100vh", background: "white" }}>
      <Logo>
        <Image src={ROCLogo} width={117} height={48} alt="Logo Outline" />
      </Logo>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "80%",
        }}
      >
        <MainContainer>
          <ErrorText>404</ErrorText>
          <Text>Page not found</Text>
          <Button onClick={navigate}>Go Back</Button>
        </MainContainer>
      </div>
    </div>
  );
};

const Logo = styled.div`
  height: 154px;
  width: 100%;
  padding: 64px 8px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 342px;
  align-items: center;
  position: absolute;
  top: 355px;
  gap: 24px;
  @media screen and (max-width: 320px) {
    width: inherit;
    height: 100%;
    top: 0px;
    justify-content: center;
    padding: 0px 10px;
    overflow: hidden;
  }
  @media screen and (min-width: 321px) and (max-width: 800px) {
    width: 342px;
    height: 100%;
    top: 0px;
    justify-content: center;
    padding: 0px 10px;
    overflow: hidden;
  }
`;

const ErrorText = styled.p`
  font-weight: 700;
  font-size: 30px;
  line-height: 36.54px;
`;
const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 21.78px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 8px;
  padding: 18px 16px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 16.94px;
  background: rgba(47, 128, 237, 1);
`;

export default NotFound;
