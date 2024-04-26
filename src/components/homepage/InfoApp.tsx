import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { topSideMenu } from "@/app/utils/data";
import Image from "next/image";
import Instance from "@/app/utils/Instance";

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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const NormalOption = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

const InfoApp: React.FC<DashboardProps> = ({modalClick,menuClick}) => {

const [linkData, setLinkData] = useState("")

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/nav-links");
      setLinkData(result.data.data[0])
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(()=>{
    fetchDataAsync()
  },[])

  return (
    <>
      <OptionMenu>
        {topSideMenu.map((item:any, index:any) => {
          return (
            <NormalOption key={index} href={linkData[item.name]} target="_blank" >
              <Image
                src={item.image}
                width={item.width}
                height={item.height}
                style={{ width: "auto" }}
                alt="right icon"
              />{" "}
              <p style={{ fontSize: "14px" }}>{item.name}</p>
            </NormalOption>
          );
        })}
      </OptionMenu>
    </>
  );
};

export default InfoApp;
