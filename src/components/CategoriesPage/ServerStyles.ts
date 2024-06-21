'use client'
import styled from "styled-components";

export const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: 480px;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
