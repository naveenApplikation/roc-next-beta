import React from 'react';
import styled from 'styled-components';
import search from '../../../assets/images/search.png';
import Image from "next/image";


interface SearchComponentProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}


const InputContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
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
`;

const SearchIcon = styled(Image)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SearchComponent: React.FC<SearchComponentProps> = ({onFocus}) => {
  const handleSearch = () => {
    console.log('Searching...');
  };

  return (
    <InputContainer>
      <SearchInput onFocus={onFocus}  type="text" placeholder="Search..." />
      <SearchIcon src={search} alt="Search" onClick={handleSearch} />
    </InputContainer>
  );
};

export default SearchComponent;
