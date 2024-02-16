import React from "react";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";

interface ModalProps { }

const MenuModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
`;

const SelectReceiveOffers = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: var(--White, #FFF);
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

const ReceiveOffersText = styled.div`
    width: 282px;
    height: 38px;
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px; 
`;

const UpdateMyPreferencesContent: React.FC<ModalProps> = () => {
    return (
        <MenuModalContent>
            <SelectReceiveOffers>
                <OfferCheckbox>
                    <Checkbox color="white" type="checkbox" />
                </OfferCheckbox>
                <ReceiveOffersText>
                    I would like to receive offers and news from ROC.
                </ReceiveOffersText>
            </SelectReceiveOffers>
            <CommonButton bcColor="#2F80ED" text="Save new email address" imageStyle={0} />
        </MenuModalContent>
    );
};

export default UpdateMyPreferencesContent;
