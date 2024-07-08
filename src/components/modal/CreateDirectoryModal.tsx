import React from "react";
import styled from "styled-components";
import CommonInput from "@/components/CommonInput/CommonInput";
import CommonButton from "@/components/button/CommonButton";
import TextArea from "@/components/button/textArea";
import Checkbox from "@/components/Checkbox";
import Dropdowns from "@/components/dropdowns";
import { SoryByItem } from '@/app/utils/data';

interface ModalProps {
  isOpen: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 24px;
  border-radius:8px;
`;
 

const InfoText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 127.778% */
  /* margin-bottom: 16px; */
`;

const CheckBoxContainer = styled.div`
    background-color:white;
    padding:8px 16px;
    border-radius: 8px;
    `;

 
const CreateDirectoryModal: React.FC<ModalProps> = ({ isOpen }) => {
  return (
    <Container>
      <InfoText>Fill out the form below and we’ll be in touch as soon as we can.</InfoText>
      <CommonInput title="Your name" />
      <CommonInput title="Business name" />
      <CommonInput title="Your email" />
      <Dropdowns items={SoryByItem} name="Category" stylePass={true} />
      <CommonInput title="Website address" />
      <CommonInput title="Business contact email" />
      <CommonInput title="Business contact phone no." />
      <CommonInput title="Address line 1" />
      <CommonInput title="Address line 2" />
      <CommonInput title="Parish" />
      <CommonInput title="Postcode" />
      <TextArea placeholder="Comments" />
      <CheckBoxContainer>
        <Checkbox label="I would like to receive offers and news from ROC." />
      </CheckBoxContainer>
      <div onClick={isOpen}>
        <CommonButton text="Submit" />
      </div>
      <InfoText>By continuing, I agree to the <span style={{ borderBottom: "1px solid black" }}>User Terms</span></InfoText>
    </Container>
  );
};

export default CreateDirectoryModal;
