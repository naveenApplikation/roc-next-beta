import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ClearText, search } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { Spin } from "antd";

interface SearchComponentProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  onchange?: any;
  handleSearch?: any;
  handleClearText?: any;
  autofocus?: any;
  id?: any;
  homeSearch?: boolean;
  loader?: boolean;
  inputRef?: any;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onFocus,
  value,
  onchange,
  handleSearch,
  handleClearText,
  id,
  loader,
  inputRef,
}) => {
  const { modalType } = useMyContext();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // You can customize the key condition if needed
      inputRef.current.blur(); // This will remove focus and close the keyboard
    }
  };

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
        type="search"
        placeholder="Search..."
        enterKeyHint="search"
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        id={id}
        ref={inputRef}
      />
      {loader ? (
        <Spin size="small" />
      ) : (
        <>
          {value ? (
            <SearchIcon
              src={ClearText}
              alt="Search"
              onClick={handleClearText}
            />
          ) : (
            <SearchIcon src={search} alt="Search" onClick={handleSearch} />
          )}
        </>
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
    
  &[type="search"]::-webkit-search-cancel-button {
  display: none;
`;

const SearchIcon = styled(Image)`
  cursor: pointer;
  width:25px;
  height: 25px;

}
`;
