import DashBoardButton from '@/components/button/DashBoardButton';
import React from 'react';
import { styled } from 'styled-components';
import { globe, phone } from '@/app/utils/ImagePath';

interface OrderOnlineModalProps {
    previousModal?:Function
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 24px;
  border-radius:8px;
`;
const MenuButtonContainer = styled.div`
//   padding: 0px 24px;
  display: flex;
  gap: 16px;
`;

const OrderOnlineModal: React.FC<OrderOnlineModalProps> = ({previousModal}) => {
    return (
        <Container>
            <MenuButtonContainer>
                <DashBoardButton
                    text="Order Online"
                    bcColor="#2F80ED"
                    image={globe}
                />
                <DashBoardButton
                    text="Phone Order"
                    bcColor="#2F80ED"
                    image={phone}
                />
            </MenuButtonContainer>
            <MenuButtonContainer>
                <DashBoardButton
                    text="Order on food.je"
                    bcColor="#2F80ED"
                />
                
            </MenuButtonContainer>
        </Container>
    );
};

export default OrderOnlineModal;