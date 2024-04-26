import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";

interface ModalProps { 
    previousModal?:any,
    nextModal?:any,

}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const ForgotPasswordText = styled.div`
    color: var(--MAIN, #2F80ED);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const CreateAccountText = styled.div`
    color: var(--MAIN, #2F80ED);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    cursor: pointer;
`;

const LoginContent: React.FC<ModalProps> = ({previousModal,nextModal}) => {
    return (
        <MenuModalContent>
            <MenuAccountInput title="Email" />
            <MenuAccountInput title="Password" />
            <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            <div onClick={nextModal}>
            <CommonButton bcColor="#2F80ED" text="Login" imageStyle={0} />
            </div>
            <CreateAccountText onClick={previousModal}>Create an account</CreateAccountText>
        </MenuModalContent>
    );
};

export default LoginContent;
