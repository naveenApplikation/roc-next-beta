import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { search } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { Spin } from "antd";

interface SearchComponentProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  onchange?: any;
  handleSearch?: any;
  autofocus?: any;
  id?: any;
  homeSearch?: boolean;
  loader?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onFocus,
  value,
  onchange,
  handleSearch,
  id,
  loader,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { modalType } = useMyContext();

  useEffect(() => {
    if (modalType.search) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [modalType]);

  return (
    <InputContainer>
      <SearchInput
        value={value}
        onChange={onchange}
        type="text"
        placeholder="Search..."
        onFocus={onFocus}
        id={id}
        ref={inputRef}
      />
      {loader ? (
        <Spin size="small" />
      ) : (
        <SearchIcon src={search} alt="Search" onClick={handleSearch} />
      )}
    </InputContainer>
  );
};

export default SearchComponent;

const InputContainer = styled.div`
  position: relative;
  box-shadow: 0px 0px 24px 0px rgba(82, 41, 0, 0.1);
  border-radius: 8px;
  padding: 19px 24px;
  width: 100%;
  display: flex;
  background-color: #fff;
`;

const SearchInput = styled.input`
  outline: none;
  width: 100%;
  border: none; /* Remove border */
  background-color: transparent; /* Remove background color */
  font-size: 18px;
  color: #000;
  &::placeholder {
    color: #000;
  }
`;

const SearchIcon = styled(Image)`
  cursor: pointer;
`;
