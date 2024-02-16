import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";

interface ModalProps {}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const UpdateMyEmailContent: React.FC<ModalProps> = () => {
    return (
        <MenuModalContent>
            <MenuAccountInput title="New email address" />
            <CommonButton bcColor="#2F80ED"  text="Save new email address" imageStyle={0}/>
        </MenuModalContent>
    );
};

export default UpdateMyEmailContent;
