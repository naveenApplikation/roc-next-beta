import React from "react";
import styled from "styled-components";


interface InputProps {
    title:string
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
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: black;

  &::placeholder {
    color: black; /* Change the color to your desired color */
  }
`;

const CommonInput: React.FC<InputProps> = ({title}) => {
  return (
    <InputContainer>
      <SearchInput type="text" placeholder={title} />
    </InputContainer>
  );
};

export default CommonInput;
