import { styled } from "styled-components"

interface TextAreaProps {
    placeholder:string
}

const TextAreaContainer = styled.textarea`

border :none;
outline : none;
background-color: white;
border-radius:8px;
padding:8px 16px;
resize : none;
&::placeholder {
    color: black; /* Change the color to your desired color */
    font-size:16px;
    font-family: Inter;
  }
`

const TextArea: React.FC<TextAreaProps> = ({placeholder}) => {
    return (
        <TextAreaContainer rows={4} cols={50} placeholder={placeholder}/>
    )
}

export default TextArea