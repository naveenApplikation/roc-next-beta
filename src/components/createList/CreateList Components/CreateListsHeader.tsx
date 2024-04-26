"use client";

import React from "react";
import styled from "styled-components";

interface CreateListingsProps {homePage?:any}

const CreateListingHeader =  styled.div`
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--Line, rgba(0, 0, 0, 0.16));
    background-color: #f2f3f3;
    background-blend-mode: normal, luminosity;
    backdrop-filter: blur(22px);

    @media screen and (max-width: 400px) {
        padding: 24px 10px;
  }
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

const CreateListingsHeader: React.FC<CreateListingsProps> = ({homePage}) => {
    return(
        <CreateListingHeader>
            <CreateListTitle>Create List</CreateListTitle>
            <CancelText onClick={homePage}>CANCEL</CancelText>
        </CreateListingHeader>
    )
}

export default CreateListingsHeader;
