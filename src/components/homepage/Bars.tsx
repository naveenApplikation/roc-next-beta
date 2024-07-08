"use client";

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import RatingMenu from "@/components/dashboard/RatingMenu";
import { skeletonItems } from "@/app/utils/date";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardProps {
  dataPubs?: any;
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

const Bars: React.FC<DashboardProps> = ({ dataPubs }) => {

  const {modalClick, menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        title="Pubs"
        isOpen={() => menuClick(dataPubs?.listName, false, dataPubs?._id)}
      />
      <ScrollingMenu>
        {!dataPubs
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : dataPubs?.categoryList
              ?.slice(0, 10)
              .map((item: any, index: any) => (
                <div key={index}>
                  <RatingMenu
                    headerImage={item.photoUrl}
                    containerImageUrl={true}
                    MenutitleDetail={item.name}
                    isOpen={() =>
                      modalClick("ModalContent", item, item.photoUrl, true)
                    }
                  />
                </div>
              ))}
      </ScrollingMenu>
    </>
  );
};

export default Bars;
