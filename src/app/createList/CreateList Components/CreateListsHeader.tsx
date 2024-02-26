"use client";

import React from "react";
import styled from "styled-components";

interface CreateListingsProps {}

const CreateListingHeader =  styled.div`
    width: 390px;
    height: 88px;
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--Line, rgba(0, 0, 0, 0.16));
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), #FF0;
    background-blend-mode: normal, luminosity;
    backdrop-filter: blur(22px);
`;

const CreateListTitle = styled.div`
    color: var(--BODY, #000);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const CancelText = styled.div`
    color: var(--BODY, #000);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

const SaveText = styled.div`
    color: #008000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
`;

const CreateListingsHeader: React.FC<CreateListingsProps> = () => {
    return(
        <CreateListingHeader>
            <CreateListTitle>Create List</CreateListTitle>
            <CancelText>CANCEL</CancelText>
            <SaveText>SAVE</SaveText>
        </CreateListingHeader>
    )
}

export default CreateListingsHeader;
