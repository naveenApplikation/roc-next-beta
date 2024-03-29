import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import { search } from '@/app/utils/ImagePath';


interface SearchComponentProps {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}


const InputContainer = styled.div`
  position: relative;
  box-shadow: 0px 0px 24px 0px rgba(82, 41, 0, 0.10);
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
  
 &::placeholder{
  color: #000;
 }
`;

const SearchIcon = styled(Image)`
  cursor: pointer;
`;

const SearchComponent: React.FC<SearchComponentProps> = ({onFocus}) => {
  const handleSearch = () => {
    // console.log('Searching...');
  };

  return (
    <InputContainer>
      <SearchInput onFocus={onFocus}  type="text" placeholder="Search..." />
      <SearchIcon src={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fsearch%20(1).png?alt=media&token=9d503043-8cc0-4145-9024-eb3ddd2991d2"} width={24} height={24} alt="Search" onClick={handleSearch} />
    </InputContainer>
  );
};

export default SearchComponent;
