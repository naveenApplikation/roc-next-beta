"use client"

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { DirectoryHomepage } from "@/app/utils/homeIcon";
import { useMyContext } from "@/app/Context/MyContext";

const DirectoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0px 40px;
  padding-bottom: 17px;

  img {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 800px) {
    margin: 0px 16px;
  }
`;

const DirectoryMenuTitle = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  text-transform: capitalize;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  flex: 1;
  cursor: pointer;
`;

const FirstMainWraaper = styled(MainWrapper)`
`;

const AddButton = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: #fff;
  border: none;
  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.08);
  margin: 0px 40px;
  color: #2f80ed;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    margin: 0px 16px;
  }
`;

const DirectoryList = () => {

  const { modalClick, menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        title="Directory"
        isOpen={() => menuClick("directoryList")}
      />
      {DirectoryHomepage.slice(0, 5).map((item: any, index: any) => (
        <DirectoryWrapper key={index}>
          <FirstMainWraaper onClick={() => menuClick(item.data[0].title, true, "Directory")}>
            {item.data[0].image}
            <DirectoryMenuTitle>
              {item.data[0].title}
            </DirectoryMenuTitle>
          </FirstMainWraaper>
          <MainWrapper onClick={() => menuClick(item.data[1].title, true, "Directory")}>
            {item.data[1].image}
            <DirectoryMenuTitle>
              {item.data[1].title}
            </DirectoryMenuTitle>
          </MainWrapper>
        </DirectoryWrapper>
      ))}
      <AddButton onClick={() => modalClick("AddDirectoryModal")}>
        Add to Directory
      </AddButton>
    </>
  );
};

export default DirectoryList;
