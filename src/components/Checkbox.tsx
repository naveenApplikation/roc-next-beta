import { styled } from "styled-components"

interface CheckboxProps {
    label:string
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;


const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  margin-right:10px;
`
const CheckboxLabel = styled.span`
  font-size: 16px;
  color: black;
  
`;

const Checkbox: React.FC<CheckboxProps> = ({label}) => {
    return (
        <CheckboxContainer>
            <CheckBox type="checkbox" />
            <CheckboxLabel>{label}</CheckboxLabel>
        </CheckboxContainer>
    )
}
export default Checkbox
