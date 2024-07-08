"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import { skeletonItems } from '@/app/utils/date'
import { walkData } from "@/app/utils/data";
import { walkMask } from "@/app/utils/ImagePath";
import fallback from '../../../assets/images/fallbackimage.png'

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

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: end;
  flex-direction: column;
  position: relative;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;


const Walks: React.FC<DashboardProps> = ({data}) => {

  const {modalClick} = useMyContext();

  return (
    <>
      <MenuDetails title="Walks" hideShowAll={true} />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <ShopBrachSkeleton />
            </div>
          ))
          :
          walkData?.map((item, index) => {
            return (
              <WalkContainer key={index}
                onClick={() =>
                  modalClick("walksModal", item)
                }
              >
                <Image
                  src={item.icon ? item.icon : fallback}
                  alt=""
                  width={500}
                  height={80}
                  style={{ borderRadius: "8px", maxWidth: "100%", objectFit: 'cover' }}
                />
                <Image
                  src={walkMask}
                  alt=""
                  width={120}
                  height={64}
                  style={{ position: "absolute", bottom: 0, height: 50 }}
                />
                <p>{item?.name}</p>
              </WalkContainer>
            );
          })}
      </ScrollingMenu>
    </>
  );
};

export default Walks;
