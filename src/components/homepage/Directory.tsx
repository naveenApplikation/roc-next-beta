import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { DirectoryItem } from "@/app/utils/data";

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
}

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
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  flex: 1;
`;

const FirstMainWraaper = styled(MainWrapper)`
  /* flex: 2; */
  @media screen and (max-width: 420px) {
    /* flex: 1; */
  }
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

const DirectoryList: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  return (
    <>
      <MenuDetails
        title="Directory"
        isOpen={() => menuClick("directoryList")}
      />
      {DirectoryItem.map((item, index) => (
        <DirectoryWrapper key={index}>
          <FirstMainWraaper>
            <Image src={item.data[0].image} alt="right icon" />{" "}
            <DirectoryMenuTitle
              onClick={() => {
                if (
                  item &&
                  item.data &&
                  item.data.length > 0 &&
                  item.data[0].title
                ) {
                  menuClick(item.data[0].title, true, item.data[0].url);
                } else {
                  // Handle the case where item or item.data or item.data[0].title is null or undefined
                }
              }}
            >
              {item.data[0].title}
            </DirectoryMenuTitle>
          </FirstMainWraaper>
          <MainWrapper>
            <Image src={item.data[1].image} alt="right icon" />{" "}
            <DirectoryMenuTitle
              onClick={() => {
                if (
                  item &&
                  item.data &&
                  item.data.length > 0 &&
                  item.data[0].title
                ) {
                  menuClick(item.data[1].title, true, item.data[1].url);
                } else {
                  // Handle the case where item or item.data or item.data[0].title is null or undefined
                }
              }}
            >
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
