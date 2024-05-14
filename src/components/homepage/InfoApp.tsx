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
  cursor: pointer;
  gap: 8px;
  justify-content: space-between;
  img{
    height:18px;
    width:18px;
  }
`;

const Tittle = styled.p`
  color: var(--BODY, #000);
text-align: center;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const InfoApp: React.FC<DashboardProps> = ({
  modalClick,
  menuClick,
  showMap,
}) => {


  const formatNameWithSpaces = (name:any) => {
    // Use a regular expression to split the string into words
    // and then join them with spaces
    return name.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <>
      <OptionMenu>
        {topSideMenu.map((item: any, index: any) => {
          return (
            <NormalOption
              className=""
              key={index}
              onClick={() => modalClick("infoApp", item.name)}
            >
              <Image src={item.image} alt="right icon" />
              <Tittle style={{textTransform : item.name==="sos" ? "uppercase":"capitalize" , whiteSpace:"nowrap"}}>{formatNameWithSpaces(item.name)}</Tittle>
            </NormalOption>
          );
        })}
      </OptionMenu>
    </>
  );
};

export default InfoApp;
