import React from "react";
import styled from "styled-components";
import Image from "next/image";
import OptionListImg from "../../../../assets/images/createListImages/caretdown.png";

interface ListOptionsProps {
    optionText: string;
}

const ListOption = styled.div`
    width: auto;
    height: 33px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.16);
    background: #FFF;
    gap: 8px;
    cursor: pointer;
`;

const OptionText = styled.div`
    width: max-content;
    color: var(--BODY, #000);
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.13px;
    opacity: 0.72;
`;

const ListOptions: React.FC<ListOptionsProps> = ({ optionText }) => {
    return (
        <ListOption>
            <OptionText>{optionText}</OptionText>
            <Image
                style={{ width: "12px", height: "9px", opacity: 0.72 }}
                src={OptionListImg}
                alt="OptionListIcon"
            />
        </ListOption>
    )
}

export default ListOptions;
