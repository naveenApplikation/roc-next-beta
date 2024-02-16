import React from "react";
import styled from "styled-components";
import Image from "next/image";

interface InputProps {
    title1?: string;
    title2?: string;
    menuOptionImg: any;
    forwardNavigateImg?: any;
    navigaetImg?: any;
    comingSoon?: any;
    change?: any;
    optionListText?: any;
    unoptionListText?: any;
}

const OptionList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 24px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const OptionListText = styled.div`
    width: -webkit-fill-available;
    color: var(--BODY, #000);
    leading-trim: ;
    text-edge: cap;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
`;

const UnoptionListText = styled.div`
    width: -webkit-fill-available;
    color: #000000;
    opacity: 0.5;
    leading-trim: ;
    text-edge: cap;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
`;

const NavigaetImage = styled.div`
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    align-self: flex-end;
`;

const ComingSoonText = styled.div`
    width: -webkit-fill-available;
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: right;
`;

const ChangeText = styled.div`
    color: #2F80ED;
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    align-slef: flex-end;
`;

const MenuOptionList: React.FC<InputProps> = ({
    title1,
    title2,
    menuOptionImg,
    navigaetImg,
    forwardNavigateImg,
    comingSoon,
    change,
    optionListText,
    unoptionListText
}) => {
    return (
        <OptionList>
            <Image
                style={{ width: "16px", height: "16px" }}
                src={menuOptionImg}
                alt="MenuOptionListIcon"
            />
            {optionListText &&
                (<OptionListText>{title1}</OptionListText>
            )}
            {unoptionListText &&
                (<UnoptionListText>{title2}</UnoptionListText>
            )}
            {navigaetImg && (
                <NavigaetImage>
                    <Image
                        style={{ width: "8px", height: "14px" }}
                        src={forwardNavigateImg}
                        alt="ForwardNavigateIcon"
                    />
                </NavigaetImage>
            )}
            {comingSoon && (
                <ComingSoonText>Coming soon</ComingSoonText>
            )}
            {change && (
                <ChangeText>Change</ChangeText>
            )}
        </OptionList>
    );
};

export default MenuOptionList;