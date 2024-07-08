"use client"

import React from "react";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import ShopBrachSkeleton from "@/components/skeleton Loader/ShopBrachSkeleton";
import { skeletonItems } from "@/app/utils/date";
import fallback from '../../../assets/images/fallbackimage.png'

interface DashboardProps {
  data?: any;
}

const BeachLife: React.FC<DashboardProps> = ({ data}) => {

  const {modalClick,menuClick } = useMyContext();

  return (
    <>
    <MenuDetails
      isOpen={() => menuClick(data?.listName, false, data?._id)}
      title="Beach life "
    />
    <ScrollingMenu>
      {!data
        ? skeletonItems.map((item, index) => (
            <div key={index}>
              <ShopBrachSkeleton />
            </div>
          ))
        : data?.GoogleHomeScreenList.slice(0, 10).map((item:any, index:any) => {
            return (
              <WalkContainer
                key={index}
                onClick={() =>
                  modalClick(
                    "ModalContent",
                    item,
                    item?.data_type === "google"
                      ? item?.photoUrl
                      : item.photoUrl ? item.photoUrl : fallback
                  )
                }
              >
                {item?.data_type === "google" ? (
                  <ImageTag src={item.photoUrl ? item.photoUrl : fallback} alt="Image" />
                ) : (
                  <Image
                    src={item.photoUrl ? item.photoUrl : fallback}
                    alt=""
                    width={500}
                    height={80}
                    style={{
                      borderRadius: "4px",
                      maxWidth: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                )}
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2FMask%20group.png?alt=media&token=6519fc68-65f1-4e2e-b4d5-dd90e9bf2380"
                  alt=""
                  width={120}
                  height={64}
                  style={{ position: "absolute", bottom: 0, height: 50 }}
                />
                <p>
                  {item?.data_type === "google"
                    ? item?.name
                    : item?.name}
                </p>
              </WalkContainer>
            );
          })}
    </ScrollingMenu>
  </>
  )
};

export default BeachLife;

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
  cursor: pointer;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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

const ImageTag = styled.img`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  height: 100%;
  cursor: "pointer";
`;
