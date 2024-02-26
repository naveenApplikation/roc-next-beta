import React from "react";
import styled from "styled-components";

interface CreateListingsFooterProps {
    continueBtn?: any;
    footerBtns?: any;
    firstBtnText?: string;
    ChooseIconFooterBtn?: any;
}

const CreateListingFooter = styled.div`
    width: 100%;
    height: 85px;
    padding: 12px 24px 32px 24px;
    display: flex;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), #FF0;
    background-blend-mode: normal, luminosity;
    box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(22px);
`;

const ContinueBtn = styled.div`
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center; 
    border-radius: 8px;
    background: var(--MAIN, #2F80ED);
    color: var(--White, #FFF);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-style: none;
    cursor: pointer;
`;

const FooterBtnBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const FooterBtn1 = styled.div`
    width: 169px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center; 
    border-radius: 8px;
    border: 2px solid var(--MAIN, #2F80ED);
    color: var(--MAIN, #2F80ED);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

const FooterBtn2 = styled.div`
    width: 169px;
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center; 
    border-radius: 8px;
    background: var(--MAIN, #2F80ED);
    color: var(--White, #FFF);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

const CreateListingsFooter: React.FC<CreateListingsFooterProps> = ({ continueBtn, footerBtns, firstBtnText, ChooseIconFooterBtn }) => {
    return (
        <CreateListingFooter>
            {continueBtn && (
                <ContinueBtn>Continue with (1) Selected Listing</ContinueBtn>
            )}
            {footerBtns && (
                <FooterBtnBox>
                    <FooterBtn1>{firstBtnText}</FooterBtn1>
                    <FooterBtn2>Continue</FooterBtn2>
                </FooterBtnBox>
            )}
            {/* {ChooseIconFooterBtn && (
                <FooterBtnBox>
                <FooterBtn1>Go Back</FooterBtn1>
                <FooterBtn2>Continue</FooterBtn2>
            </FooterBtnBox>
            )} */}
        </CreateListingFooter>
    )
}

export default CreateListingsFooter;