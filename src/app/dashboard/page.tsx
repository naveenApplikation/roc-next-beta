"use client";

import React, { useState } from "react";
import DashBoardModal from "../../components/modal/Modal";
import styled from "styled-components";
import Image from "next/image";
import logoOutline from "../../../assets/images/logo-outline.png";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const DashboardMenu = styled.div`
  height: 100vh;
  width: 580px;
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
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 800px) {
    height: 100vh;
    width: 100%;
  }
`;
const RightSideMenu = styled.div`
  padding: 40px;

  @media screen and (max-width: 800px) {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;

const RightSideInsideMenuBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 129px;
  padding: 16px 24px;
`;

const DashBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MainContainer>
        <DashboardMenu>
          <Image
            style={{ width: "116.615px", height: "48px" }}
            src={logoOutline}
            alt="Logo Outline"
          />
          <h5 style={{ cursor: "pointer" }} onClick={openModal}>
            View All
          </h5>
        </DashboardMenu>
        <RightSideMenu>
          <RightSideInsideMenuBox>
            <p>To do</p>
          </RightSideInsideMenuBox>
        </RightSideMenu>
      </MainContainer>
      <DashBoardModal isOpen={isModalOpen} onClose={closeModal}>
        <h4>Brasserie Colmar</h4>
      </DashBoardModal>
    </>
  );
};

export default DashBoard;
