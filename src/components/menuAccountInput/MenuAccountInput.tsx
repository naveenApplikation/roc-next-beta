import React from "react";
import styled from "styled-components";

interface InputProps {
    title: string
}

const MenuInputField = styled.div`
    width: 100%;
    height: 48px;
    position: relative;
    border-radius: 8px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    background: var(--White, #FFF);
`;

const AccountInputText = styled.input`
    outline: none;
    width: 100%;
    color: black;
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    background: var(--White, #FFF);


  &::placeholder {
    color: black; /* Change the color to your desired color */
  }
`;

const MenuAccountInput: React.FC<InputProps> = ({ title }) => {
    return (
        <MenuInputField>
            <AccountInputText type="text" placeholder={title} />
        </MenuInputField>
    );
};

export default MenuAccountInput;
