import Checkbox from "@/components/Checkbox";
import CommonInput from "@/components/CommonInput/CommonInput";
import CommonButton from "@/components/button/CommonButton";
import TextArea from "@/components/button/textArea";
import { styled } from "styled-components";

interface ModalProps {

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 24px;
  border-radius:8px;
`;
const CheckBoxContainer = styled.div`
    background-color:white;
    padding:8px 16px;
    `
const PlacesFormContainer = styled.div`
margin-top : 4px;
`



const PlacesFormModal: React.FC<ModalProps> = () => {
    return (
        <Container>
            <CommonInput title="First Name" />
            <CommonInput title="Last Name" />
            <CommonInput title="Mobile Number" />
            <CommonInput title="Email" />
            <TextArea placeholder="Comments" />
            <p>I would like to receive news and offers from The Watchmaker by:</p>
            <CheckBoxContainer>
                <Checkbox label="Email" />
            </CheckBoxContainer>
            <p>I would like to receive news and offers from BSC Hospitality Limited by:</p>
            <CheckBoxContainer>
                <Checkbox label="Email" />
            </CheckBoxContainer>
            {/* <CommonButton text="Next" /> */}
        </Container>
    )
}

export default PlacesFormModal