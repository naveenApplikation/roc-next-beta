"use client"

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import RatingMenu from "@/components/dashboard/RatingMenu";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import {skeletonItems} from '@/app/utils/date'

interface DashboardProps {
  data?: any;
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

const Sustainability: React.FC<DashboardProps> = ({data}) => {


  const {modalClick,menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        title="Sustainability"
        isOpen={() => menuClick(data?.listName, false, data?._id)}
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : data?.GoogleHomeScreenList.slice(0, 10).map((item:any, index:any) => (
            <div key={index}>
              <RatingMenu
                headerImage={item?.photoUrl}
                containerImageUrl={true}
                MenutitleDetail={item?.name}
                isOpen={() => modalClick("ModalContent", item, item?.photoUrl,true)}
              />
            </div>
          ))}
      </ScrollingMenu>
    </>
  );
};

export default Sustainability;
