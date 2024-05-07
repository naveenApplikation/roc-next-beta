import React from 'react';
import CommonButton from '../../components/button/CommonButton';
import styled from 'styled-components';

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

const ThankYouDiresctoryModal: React.FC<ModalProps> = ({ isOpen }) => {
  return (
    <Container>
        <InfoText>We’ll be in touch as soon as possible.</InfoText>
        <div onClick={isOpen}>
        <CommonButton text='Back to Home' />
        </div>
    </Container>
  )
}

export default ThankYouDiresctoryModal