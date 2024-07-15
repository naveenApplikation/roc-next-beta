"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import {search } from "@/app/utils/ImagePath";


const SearchNFilter = () => {
  const {modalClick} = useMyContext();

  return (
    <>
      <InputButtonWrapper>
        <button onClick={() => modalClick("search")}>
          <p>Search...</p>
          <SearchIcon src={search} alt="Search" />
        </button>
      </InputButtonWrapper>
    </>
  );
};

export default SearchNFilter;

const InputButtonWrapper = styled.div`
  padding: 0px 40px;
  button {
    padding: 19px 24px;
    box-shadow: 0px 0px 24px 0px rgba(82, 41, 0, 0.5);
    background: white;
    outline: none;
    border: none;
    width: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
  }
  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;
const SearchIcon = styled(Image)`
  cursor: pointer;
`;
