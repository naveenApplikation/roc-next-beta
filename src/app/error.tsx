"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ROCLogo } from "./utils/ImagePath";
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Function to navigate or reload based on the current route
  const navigate = () => {
    if (pathname === "/") {
      window.location.reload(); // Reload the page if it's the home page
    } else {
      router.push("/"); // Navigate to home page if not already on it
    }
  };

  // Reload the page if the path is the home page and an error occurs
  useEffect(() => {
    if (error && pathname === "/") {
      console.error("Error occurred on the home page, reloading...");
      window.location.reload();
    }
  }, [error, pathname]);

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
          top: "0px",
        }}>
        <MainContainer>
          <ErrorText>Ah bah crie!</ErrorText>
          <Text>The app has encountered a problem.</Text>
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
  cursor: pointer;
  font-size: 16px;
  line-height: 16.94px;
  background: rgba(47, 128, 237, 1);
  color: white;
`;

export default Error;
