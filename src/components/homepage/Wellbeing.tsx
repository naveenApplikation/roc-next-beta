"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { wellbeingImg } from "@/app/utils/ImagePath";
import AdsBanner from "../adsBanner/page";

interface DashboardProps {
  data?: any;
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


const Wellbeing: React.FC<DashboardProps> = ({data}) => {

  const {menuClick } = useMyContext();

  return(
   <>
   <MenuDetails isOpen={() => menuClick("Wellbeing", true, "wellbeing-lists")} title="Wellbeing" />
   <ScrollingMenu>
   {!data
       ? skeletonItems.map((item, index) => (
           <div key={index}>
             <Skeleton width={80} height={80} style={{borderRadius:6}} />
           </div>
         ))
       :
       data.length ? data.map((item: any, index: any) => {
       return (
         <CommunityContainer
           key={index}
           style={{ background: item?.bgColor, cursor:'pointer' }}
           onClick={() => menuClick(item?.listName, false, item?.categoryId)}
         >
           {/* <p>{item?.image}</p> */}
           <p style={{textAlign:'right'}}>

            <Image src={wellbeingImg} alt="" />
           </p>
           <p>{item?.listName}</p>
         </CommunityContainer>
       );
     }) : ""}
   </ScrollingMenu>
   {/* <AdsBanner/> */}
 </>
  )
};

export default Wellbeing;
