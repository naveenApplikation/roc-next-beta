import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { search } from "@/app/utils/ImagePath";

interface SearchComponentProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  onchange?: any;
}

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
color:#000;
  &::placeholder {
    color: #000;
  }
`;

const SearchIcon = styled(Image)`
  cursor: pointer;
`;

const SearchComponent: React.FC<SearchComponentProps> = ({
  onFocus,
  value,
  onchange,
}) => {
  const handleSearch = () => {
    // console.log('Searching...');
  };

  return (
    <InputContainer>
      <SearchInput
        value={value}
        onChange={onchange}
        type="text"
        placeholder="Search..."
      />
      <SearchIcon src={search} alt="Search" onClick={handleSearch} />
    </InputContainer>
  );
};

export default SearchComponent;
