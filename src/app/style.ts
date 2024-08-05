"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: #ffffff;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
  .left_container {
    position: relative;
    z-index: 1;
  }
  .left_container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: -1; /* Place the shadow behind the content */
  }
`;

export const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: 580px;
`;

export const MainContainer = styled.div`
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    border-radius: 24px 24px 0px 0px !important;
    height: auto;
    overflow: hidden;
    margin-top: 470px;
    z-index: 1;
    background-color: white !important;
  }
`;

export const DashboardMenu = styled.div`
  width: 480px;
  background: #fff;
  transition: width 0.6s ease; /* Adjust transition timing function and duration */
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  .shoadow_wrapper_container {
    opacity: 0;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    min-height: calc(100vh - 500px);
  }
`;

export const DashboardMenuIn = styled.div`
  width: 480px;
  padding-bottom: 0px;
  background: #f2f3f3;
  transition: width 0.6s ease; /* Adjust transition timing function and duration */
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  transform: translateZ(0); /* Force GPU rendering */
  backface-visibility: hidden; /* Improve rendering performance */
  will-change: transform; /* Hint for browser optimizations */
  .shoadow_wrapper_container {
    opacity: 0;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    min-height: calc(100vh - 500px);
  }
`;

// Pagelayout style //

export const PagelayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

export const PagelayoutMainContainer = styled.div`
  height: 100vh;
  overflow: auto;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    /* border-radius: 24px 24px 0px 0px; */
    height: auto;
    overflow: hidden;
    z-index: 1;
  }
`;

export const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

export const LeaveFeedbackButtonContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
`;
