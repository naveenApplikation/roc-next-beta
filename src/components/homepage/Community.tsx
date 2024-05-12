import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { community } from "@/app/utils/data";
import Image from "next/image";

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
  listData?: any;
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

const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
  }
`;

const Community: React.FC<DashboardProps> = ({ modalClick, menuClick, listData }) => {
  return (
    <>
      <MenuDetails isOpen={() => menuClick("Community", true, 1)} title="Community" />
      <ScrollingMenu>
        {listData.length ? listData.map((item: any, index: any) => {
          return (
            <CommunityContainer
              key={index}
              style={{ background: item?.bgColor, cursor:'pointer' }}
              onClick={() => menuClick(item?.listName, false, item?._id)}
            >
              <p>{item?.image}</p>
              <p>{item?.listName}</p>
            </CommunityContainer>
          );
        }) : ""}
      </ScrollingMenu>
    </>
  );
};

export default Community;
