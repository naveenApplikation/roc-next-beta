"use client"

import React from 'react';
import RatingMenu from "@/components/dashboard/RatingMenu";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from '@/app/utils/date';
import {ScrollingMenu} from '@/app/style';
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";

type YourPageProps = {
    data?: any;
  };

const DineOut: React.FC<YourPageProps> = ({data}) => {

    const { showMap, modalClick,menuClick } = useMyContext();

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick(data?.listName, false, data?._id)}
        title="Dine out"
      />
      <ScrollingMenu>
        {data ? (
          data.GoogleHomeScreenList.slice(0, 10).map((item: any, index: any) => (
            <div key={index}>
              <RatingMenu
                headerImage={item.photoUrl}
                containerImageUrl={true}
                MenutitleDetail={item.name}
                isOpen={() => modalClick("ModalContent", item, item.photoUrl,true)}
              />
            </div>
          ))
        ) : (
          skeletonItems.map((item, index) => (
            <div key={index}>
              <CommonSkeletonLoader />
            </div>
          ))
        )}
      </ScrollingMenu>
    </>
  )
}

export default DineOut