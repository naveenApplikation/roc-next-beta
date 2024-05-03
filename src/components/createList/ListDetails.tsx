"use client";

import React from "react";
import styled from "styled-components";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import { icons } from "@/app/utils/data";
import Image from "next/image";
import { sideWidth } from "@/app/utils/date";

interface ListDetailsProps {
  ScreenSwitch?: Function;
  preScreen?: Function;
  homePage?: Function;
}

const ListDetailsScreen = styled.div`
  width: ${sideWidth};
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const ListDetailsContent = styled.div`
  width: 100%;
  height: auto;
  padding: 40px 24px 0px 24px;
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
  width: 100%;
  height: 48px;
  position: relative;
  border-radius: 8px;
  border: 2px solid var(--BODY, #000);
  background: var(--White, #fff);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background: var(--White, #fff);
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
  background: var(--White, #fff);

  &::placeholder {
    color: black;
    font-style: italic;
    opacity: 0.48;
  }
`;

const IconsListScrollBox = styled.div`
  /* height: 253px; */
  overflow-y: scroll;
  scrollbar-width: none;
  /* margin-bottom: 75px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  /* padding: 8px 8px; */
  gap: 8px;
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextAreaContainer = styled.textarea`
  border: 2px solid var(--BODY, #000);
  width: 100%;
  outline: none;
  background-color: white;
  border-radius: 8px;
  padding: 8px 16px;
  height: 163px;
  resize: none;
  &::placeholder {
    color: black; /* Change the color to your desired color */
    font-size: 14px;
    font-style: italic;
    opacity: 0.48;
  }
`;

const ListItemScrollBox = styled.div`
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  padding-bottom: 100px;
`;

const CheckBoxContainer = styled.div`
  background-color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  height: 46px;

  p {
    font-size: 13px;
  }
`;

const ListDetails: React.FC<ListDetailsProps> = ({
  ScreenSwitch,
  preScreen,
  homePage
}) => {
  const [selectedIcon, setSelectedIcon] = React.useState<number | null>(null);

  const handleIconClick = (iconId: number) => {
    setSelectedIcon(iconId);
  };

  return (
    <ListDetailsScreen>
      <ListItemScrollBox>
        <CreateListingsHeader homePage={homePage} />
        <ListDetailsContent>
          <ListDetailsTitle>List Details</ListDetailsTitle>
          <ListInputField>
            <ListInputText type="text" placeholder="List name..." />
          </ListInputField>
          <TextAreaContainer
            rows={4}
            cols={50}
            placeholder="List description..."
          />
          <CheckBoxContainer>
            <input type="radio" />
            <p>public List</p>
          </CheckBoxContainer>
          <CheckBoxContainer>
            <input type="radio" />
            <p>Private List</p>
          </CheckBoxContainer>
          <ListDetailsTitle>Choose an icon</ListDetailsTitle>
          <IconsListScrollBox>
            {icons.map((icon) => {
              return (
                <IconImage
                  key={icon.id}
                  onClick={() => handleIconClick(icon.id)}
                >
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
      </ListItemScrollBox>
      <CreateListingsFooter
        footerBtns
        firstBtnText="Go Back"
        ScreenSwitch={ScreenSwitch}
        preScreen={preScreen}
        secondText={"continue"}
      />
    </ListDetailsScreen>
  );
};

export default ListDetails;
