import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import CloseModal from "../../../assets/images/CloseModal.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title: string;
  showMap: boolean;
}

const StyledModal = styled.div<{
  $isopen: boolean;
  $showMap: boolean;
  $screenwidthpercentage: number;
  $screenwidth: number;
}>`
  position: fixed;
  top: 0;
  left: ${({ $isopen, $screenwidthpercentage , $showMap }) =>
    $isopen ? `${190 - ($showMap ?  ($screenwidthpercentage + 10) : $screenwidthpercentage )}%` : "0%"};
  transform: translateX(
    -${({ $screenwidthpercentage ,$showMap }) => 230 - ($showMap ?  ($screenwidthpercentage + 10) : $screenwidthpercentage )}%
  );
  bottom: 0%;
  max-height: 95vh;
  width: 352px; /* Adjust this value as needed */
  border-radius: 40px;
  background: #f2f3f3;

  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 16px auto;
  transition: left 0.8s ease-in-out;
  z-index: 0;
  padding: 24px 0px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .modal-content {
    background: #f2f3f3;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    width: 100%;
  }

  .close-button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }

  @media screen and (min-width: 1500px) {
    left: ${({ $isopen }) => ($isopen ? "40%" : "0%")};
    transform: none;
  }

  @media screen and (max-width: 800px) {
    left: 0;
    top: auto;
    height: 100%;
    
    bottom: ${({ $isopen }) =>
    $isopen
      ? "0%"
      : "-100%"}; // Position at bottom if open, otherwise off-screen
    width: 100%;
    transition: bottom 0.8s ease-in-out;
  }

  @media screen and (max-width: 1130px) {
    width: ${({ $screenwidth }) => ($screenwidth < 800 ? "none" : "585px")};
    max-width: 100%;
    left: ${({ $isopen, $screenwidth }) =>
    $isopen ? "0%" : $screenwidth < 800 ? "0" : "-100%"};
    transform: none;
    z-index: 1;
    max-height:100vh;
    margin: 0px; /* Center the modal horizontally */
    border-radius: 0px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  margin-bottom: 24px;

  h4 {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, showMap }) => {
  const [screenWidthPercentage, setScreenWidthPercentage] = useState(117);
  const [screenWidth, setScreenWidth] = useState(100);

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
    <StyledModal
      $isopen={isOpen}
      $showMap={showMap}
      $screenwidthpercentage={screenWidthPercentage}
      $screenwidth={screenWidth}
    >
      <div className="modal-content">
        <HeaderContainer>
          <h4>{title}</h4>
          <Image
            style={{ width: 40, height: 40, cursor: "pointer" }}
            src={CloseModal}
            alt="Logo Outline"
            onClick={onClose}
          />
        </HeaderContainer>
        {children}
      </div>
    </StyledModal>
  );
};

export default Modal;
