import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";

interface ModalProps { isOpen?: any; previousModal:any}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const BackAccount = styled.p`
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const UpdateMyEmailContent: React.FC<ModalProps> = ({isOpen,previousModal}) => {
    return (
        <MenuModalContent>
            <MenuAccountInput title="New email address" />
            <div onClick={isOpen}>
            <CommonButton bcColor="#2F80ED"  text="Save new email address" imageStyle={0}/>
            </div>
            <BackAccount onClick={previousModal}>Back to my account</BackAccount>
        </MenuModalContent>
    );
};

export default UpdateMyEmailContent;
