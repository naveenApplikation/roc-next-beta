import React from "react";
import CommonButton from "../../components/button/CommonButton";
import styled from "styled-components";

interface ModalProps {
  isOpen: () => void;
}

const Container = styled.div`
  padding: 0px 24px;
`;

const InfoText = styled.p`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 127.778% */
  margin-bottom: 16px;
`;

const HelpText = styled.p`
  color: #2f80ed;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  margin-top: 16px;
  cursor: pointer;
`;

const AddToDirectoryModal: React.FC<ModalProps> = ({ isOpen }) => {
  return (
    <Container>
      <InfoText>
        To add a business to our directory, simply create a Google Business
        Profile and we'll take care of the rest.
      </InfoText>
      <CommonButton text="Create a Google Business Profile" />
      <HelpText onClick={isOpen}>Need Help?</HelpText>
    </Container>
  );
};

export default AddToDirectoryModal;
