import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { topAttractionItem } from "@/app/dashboard/data";
import Image from "next/image";
import Directory from "@/components/dashboard/Directory";

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
  }

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const DirectoryList: React.FC<DashboardProps> = ({modalClick,menuClick}) => {
  return (
    <>
       <MenuDetails
        title="Directory"
        isOpen={() => menuClick("categorieList",true,1)}
      />
      <Directory isOpen={() => modalClick("AddDirectoryModal")} />
    </>
  );
};

export default DirectoryList;
