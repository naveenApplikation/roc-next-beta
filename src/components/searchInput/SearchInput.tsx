import React from 'react';
import styled from 'styled-components';
import search from '../../../assets/images/search.png';
import Image from "next/image";

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

const SearchComponent = () => {
  const handleSearch = () => {
    console.log('Searching...');
  };

  return (
    <InputContainer>
      <SearchInput type="text" placeholder="Search..." />
      <SearchIcon src={search} alt="Search" onClick={handleSearch} />
    </InputContainer>
  );
};

export default SearchComponent;
