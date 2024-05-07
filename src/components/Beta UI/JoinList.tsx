import React from "react";
import styled from "styled-components";
import MenuAccountInput from "@/components/menuAccountInput/MenuAccountInput";
import CommonButton from "@/components/button/CommonButton";

interface ModalProps { 
    isOpen?:any;
    nextModal?:any
}

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const SelectReceiveOffers = styled.div`
    display: flex;
    /* justify-content: space-between; */
    border-radius: 8px;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: var(--White, #FFF);
`;

const ReceiveOffersText = styled.div`
    /* width: 282px; */
    /* height: 38px; */
    color: var(--BODY, #000);
    // font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px; 
`;

const UserTermsText1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2px;
    color: var(--BODY, #000);
    text-align: center;
    // font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;   
    line-height: 19px; 
`;

const UserTermsText2 = styled.div`
    display: flex;
    height: 19px;
    align-items: center;
    color: var(--BODY, #000);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500; 
    line-height: 19px; 
    padding-top: 3px;
    border-bottom: 2px solid #000000;
`;

const UserLoginText = styled.div`
    color: #2F80ED;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;   
    line-height: normal;
    cursor: pointer; 
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--MAIN, #2F80ED);
    background-color: #FFF;
    appearance: none; 
    -webkit-appearance: none; 
    cursor: pointer; 

    &:checked {
        border-radius: 4px !important;
        webkit-appearance: button;
        appearance: auto;
    }
`;

const OfferCheckbox = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const JoinList: React.FC<ModalProps> = ({nextModal}) => {
    return (
        <MenuModalContent>
            <MenuAccountInput title="Email" />
            <MenuAccountInput title="Password" />
            <SelectReceiveOffers>
                <OfferCheckbox>
                    <Checkbox color="white" type="checkbox" />
                </OfferCheckbox>
                <ReceiveOffersText>
                    I would like to receive offers and news from ROC.
                </ReceiveOffersText>
            </SelectReceiveOffers>
            <div onClick={nextModal}>
            <CommonButton bcColor="#2F80ED" text="Join" />
            </div>
            <UserTermsText1>By continuing, I agree to the <UserTermsText2>User Terms</UserTermsText2></UserTermsText1>
            <UserLoginText>Already a user? Login</UserLoginText>
        </MenuModalContent>
    );
};

export default JoinList;
