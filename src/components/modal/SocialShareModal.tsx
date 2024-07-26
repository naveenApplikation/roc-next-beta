import React, { ReactNode, useState, useEffect, useRef } from "react";
import styled from "styled-components";

import dynamic from "next/dynamic";
import { constants } from "fs/promises";
const ShareFeature = dynamic(() => import("../ShareFeature"), { ssr: false });
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showMap: boolean;
}

const StyledModal = styled.div<{
  $isopen: boolean;
  $showMap: boolean;
}>`
  position: fixed;
  top: 0;
  left: ${({ $isopen }) => ($isopen ? "480px" : "-520px")};
  transform: translateX(${({ $showMap }) => ($showMap ? 20 : -500)}px);
  bottom: 0%;
  max-height: 25%;
  width: 500px; /* Adjust this value as needed */
  border-radius: 10px;
  // background: #f2f3f3;

  background-blend-mode: normal, luminosity;
  box-shadow: ${({ $isopen }) =>
    $isopen ? "0px -8px 40px 0px rgba(0, 0, 0, 0.25)" : "none"};
  //  backdrop-filter: blur(22px);
  background-color: white;
  margin: 16px auto;
  transition: left 0.8s ease-in-out;
  z-index: 0;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .close-button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }

  /* @media screen and (min-width: 1500px) {
    // left: ${({ $isopen }) => ($isopen ? "65%" : "0%")};
    left: ${({ $isopen }) => ($isopen ? "480px" : "0%")};
    transform: translateX(
      ${({ $showMap }) => ($showMap ? 20 : -500)}px
    );
  } */

  @media screen and (max-width: 1130px) {
    width: ${({ $showMap }) => ($showMap ? "480px" : "580px")};
    max-width: 100%;
    left: ${({ $isopen }) => ($isopen ? "0%" : "-100%")};
    transform: none;
    background-color: "red";
    z-index: 1;
    max-height: 30vh;
    margin: 0px; /* Center the modal horizontally */
    border-radius: 0px;
  }

  @media screen and (max-width: 800px) {
    left: 0;
    top: auto;
    height: 30%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    bottom: ${({ $isopen }) =>
      $isopen
        ? "0%"
        : "-100%"}; // Position at bottom if open, otherwise off-screen
    width: 100%;
    transition: bottom 0.8s ease-in-out;
  }
`;

const SocialShareModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  showMap,
}) => {
  const [screenWidthPercentage, setScreenWidthPercentage] = useState(117);
  const [screenWidth, setScreenWidth] = useState(100);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto"; // Cleanup on component unmount
    };
  }, [isOpen]);
  useEffect(() => {
    const handleResize = () => {
      const referenceWidth = 1200; // You can set your own reference width here
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      const newScreenWidthPercentage = (newScreenWidth / referenceWidth) * 100;
      setScreenWidthPercentage(newScreenWidthPercentage);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <StyledModal $isopen={isOpen} $showMap={showMap}>
        <ShareFeature screenWidth={screenWidth}></ShareFeature>
      </StyledModal>
    </>
  );
};

export default SocialShareModal;
