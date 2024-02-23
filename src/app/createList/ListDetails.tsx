"use client";

import React from "react";
import styled from "styled-components";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import { icons } from "../../app/dashboard/data";
import Image from "next/image";

interface ListDetailsProps { }

const ListDetailsScreen = styled.div`
    width: 390px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), #FF0;
    background-blend-mode: normal, luminosity;
    box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(22px);
`;

const ListDetailsContent = styled.div`
    width: 100%;
    height: auto;
    padding: 40px 0px 0px 24px;  
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow: hidden;
`;

const ListDetailsTitle = styled.div`
    color: var(--BODY, #000);
    // font-family: "Proxima Nova";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ListInputField = styled.div`
    width: 342px;
    height: 48px;
    position: relative;
    border-radius: 8px;
    border: 2px solid var(--BODY, #000);
    background: var(--White, #FFF);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    background: var(--White, #FFF);
    margin-right: 24px;
`;

const ListInputText = styled.input`
    outline: none;
    width: 100%;
    color: black;
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    background: var(--White, #FFF);


  &::placeholder {
    color: black;
    font-style: italic;
    opacity: 0.48; 
  }
`;

const IconsListScrollBox = styled.div`
    height: 253px;
    overflow-y: scroll;
    scrollbar-width: none;
    margin-bottom: 75px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 8px;
    gap: 8px;
`;

const IconImage = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ListDetails: React.FC<ListDetailsProps> = () => {
    const [selectedIcon, setSelectedIcon] = React.useState<number | null>(null);

    const handleIconClick = (iconId: number) => {
        setSelectedIcon(iconId);
    };

    return (
        <ListDetailsScreen>
            <CreateListingsHeader />
            <ListDetailsContent>
                <ListDetailsTitle>List Details</ListDetailsTitle>
                <ListInputField>
                    <ListInputText type="text" placeholder="List name..." />
                </ListInputField>
                <ListDetailsTitle>Choose an icon</ListDetailsTitle>
                <IconsListScrollBox>
                    {icons.map(icon => {
                        return (
                            <IconImage key={icon.id} onClick={() => handleIconClick(icon.id)}>
                                <Image
                                    style={{ width: 32, height: 32 }}
                                    src={icon.image}
                                    alt={`Icon ${icon.id}`}
                                />
                            </IconImage>
                        );
                    })}
                </IconsListScrollBox>
            </ListDetailsContent>
            <CreateListingsFooter footerBtns firstBtnText="Go Back" />
        </ListDetailsScreen>
    )
}

export default ListDetails;
