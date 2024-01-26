import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import CloseModal from '../../../assets/images/CloseModal.png'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const StyledModal = styled.div<{
  isOpen: boolean;
  screenWidthPercentage: number;
  screenWidth: number;
}>`
  position: fixed;
  top: 0;
  left: ${({ isOpen, screenWidthPercentage }) =>
    isOpen ? `${190 - screenWidthPercentage}%` : "0%"};
  transform: translateX(
    -${({ screenWidthPercentage }) => 230 - screenWidthPercentage}%
  );
  bottom: 0%;
  width: 352px; /* Adjust this value as needed */
  border-radius: 40px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.8) 100%
    ),
    #ff0;

  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  display: flex;
  justify-content: space-between;
  align-items:flex-start;
  margin: 16px auto; 
  transition: left 0.8s ease-in-out;
  z-index: 0;
  padding:40px;

  .modal-content {
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.8) 100%
    ),
    #ff0;
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%
  }

  .close-button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }

  @media screen and (min-width: 1500px) {
    left: ${({ isOpen, screenWidthPercentage }) =>
    isOpen ? "40%" : "0%"};
  transform: none
  }

  @media screen and (max-width: 800px) {
    left: 0;
    top: auto;
    height: 100%;
    bottom: ${({ isOpen }) =>
      isOpen
        ? "0%"
        : "-100%"}; // Position at bottom if open, otherwise off-screen
    width: 100%;
    transition: bottom 0.8s ease-in-out;
  }

  @media screen and (max-width: 1130px) {
    width: ${({ screenWidth }) => (screenWidth < 800 ? "none" : "585px")};
    max-width: 100%;
    left: ${({ isOpen, screenWidth }) =>
      isOpen ? "0%" : screenWidth < 800 ? "0" : "-100%"};
    transform: none;
    z-index: 1;
    margin: 0px; /* Center the modal horizontally */
    border-radius: 0px;
  }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [screenWidthPercentage, setScreenWidthPercentage] = useState(100);
  const [screenWidth, setScreenWidth] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const referenceWidth = 1200; // You can set your own reference width here
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      console.log(newScreenWidth, "newScreenWidth");
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
    <StyledModal
      isOpen={isOpen}
      screenWidthPercentage={screenWidthPercentage}
      screenWidth={screenWidth}
    >
      <div className="modal-content">
        {children}
        <Image
            style={{ width:40, height:40,cursor: "pointer"  }}
            src={CloseModal}
            alt="Logo Outline"
            onClick={onClose}
          />
      </div>
    </StyledModal>
  );
};

export default Modal;
