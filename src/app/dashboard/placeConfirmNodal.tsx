import CommonButton from "@/components/button/CommonButton";
import { styled } from "styled-components";

interface PlacesConfirmProps {

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 24px;
  border-radius:8px;
`;


const PlacesConfirmModal: React.FC<PlacesConfirmProps> = () => {
    return (
        <Container>
                <p>[CONFIRMATION SCREEN]</p>
                <CommonButton text="Done" />
        </Container>
    )
}

export default PlacesConfirmModal