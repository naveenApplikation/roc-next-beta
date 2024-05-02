import React from "react";
import styled from "styled-components";
import { topSideMenu } from "@/app/utils/data";
import Image from "next/image";

interface DashboardProps {
  modalClick?: any;
  menuClick?: any;
  showMap?: any;
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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const NormalOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

const InfoApp: React.FC<DashboardProps> = ({ modalClick, menuClick, showMap }) => {



  return (
    <>
      <OptionMenu>
        {topSideMenu.map((item: any, index: any) => {
          return (
            <NormalOption className="" key={index} onClick={() => modalClick("infoApp", item.name)}>

              {/* <NormalOption key={index} href={linkData[item.name]} target="_blank" > */}
              <Image
                src={item.image}
                alt="right icon"
              />{""}
              {/* {
                console.log("linkData[item.name]", linkData[item.name])
              } */}
              <p style={{ fontSize: "14px" }}>{item.name}</p>
              {/* </NormalOption> */}
            </NormalOption>
          );
        })}
      </OptionMenu>
      
    </>
  );
};

export default InfoApp;
