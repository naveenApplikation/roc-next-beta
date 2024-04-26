import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";
import TextArea from "@/components/button/textArea";
import Checkbox from "@/components/Checkbox";

interface ModalProps {
  isOpen?: any;
  previousModal: any;
}

const MenuModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 16px;
`;

const BackAccount = styled.p`
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
const CheckBoxContainer = styled.div`
  background-color: white;
  padding: 8px 16px;
  border-radius: 8px;
`;

const TextAreaContainer = styled.textarea`
  border: none;
  outline: none;
  background-color: white;
  height: 160px;
  border-radius: 8px;
  padding: 8px 16px;
  resize: none;
  &::placeholder {
    color: black; /* Change the color to your desired color */
    font-size: 16px;
    font-family: Inter;
  }
`;

const ContactUs: React.FC<ModalProps> = ({ isOpen, previousModal }) => {
  return (
    <MenuModalContent>
      <MenuAccountInput title="Name" />
      <MenuAccountInput title="Email" />
      <TextAreaContainer rows={4} cols={50} placeholder="Comments" />
      <CheckBoxContainer>
        <Checkbox label="I would like to receive offers and news from ROC." />
      </CheckBoxContainer>
      <div onClick={isOpen}>
        <CommonButton bcColor="#2F80ED" text="Submit" imageStyle={0} />
      </div>
    </MenuModalContent>
  );
};

export default ContactUs;
