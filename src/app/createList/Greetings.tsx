"use client";

import React from "react";
import styled from "styled-components";

interface GreetingsProps { }

const GreetingsScreen = styled.div`
    width: 390px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 40px;
    gap: 24px;
    background: rgba(30, 29, 28, 0.90);
    backdrop-filter: blur(10px);
`;

const GreetingTitle = styled.div`
    color: #FAFAF9;
    font-family: IvyJournal;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const GreetingQuotes = styled.div`
    width: 99%;
    color: #FAF9F8;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
    text-align: center;
`;

const GreetingBtnBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ViewListBtn = styled.div`
    width: 100%;
    padding: 12px 16px; 
    color: var(--BODY, #000);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 8px;
    background: #FAF9F9;
    cursor: pointer;
`;

const AnotherListBtn = styled.div`
    width: 100%;
    padding: 12px 16px; 
    color: #FAF9F9;
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 8px;
    border: 2px solid #FAF9F9;
    cursor: pointer;
`;

const BottomText = styled.div`
    color: #FAF9F9;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    text-align: center;
`;

const Greetings: React.FC<GreetingsProps> = () => {
    return (
        <GreetingsScreen>
            <GreetingTitle>Thank You!</GreetingTitle>
            <GreetingQuotes>
                Community is at the heart of what we do, and you’ve just helped fellow islanders and visitors 😊
            </GreetingQuotes>
            <GreetingBtnBox>
                <ViewListBtn>View My List</ViewListBtn>
                <AnotherListBtn>Create Another List...</AnotherListBtn>
                <BottomText>...become a #ROCgod</BottomText>
            </GreetingBtnBox>
        </GreetingsScreen>
    )
}

export default Greetings;