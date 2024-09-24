"use client"

import React from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from "@/app/utils/date";
import Image from "next/image";
import fallback from '../../../assets/images/fallbackimage.png'

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

const ScrollingMenuDishes = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  flex-shrink: 0;
  cursor: pointer;
`;

const UtensilsDishesImage = styled.div`
  border-radius: 4px;
  background: #c4c4c4;
  height: 64px;
  align-self: stretch;
`;

const Menutitle = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
  display: block;
  width: 100%; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
`;

const MainImage = styled(Image)`
  width: 120px !important;
  height: 64px !important;
  border-radius: 6px;
`;

const PriceText = styled.p`
  overflow: hidden;
  color: rgba(0, 0, 0, 0.48);
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;

const EnjoyTheSunshine: React.FC<DashboardProps> = ({ data }) => {

  const { filterUrls, modalClick, menuClick } = useMyContext();

  const ImageUrlData = data.map((item: any) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Enjoy the sunshine", true, "sun-shine")}
        title="Enjoy the sunshine"
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <CommonSkeletonLoader />
            </div>
          ))
          : data?.slice(0, 10).map((item: any, index: any) => {
            return (
              <div key={index}>
                <ScrollingMenuDishes
                  onClick={() =>
                    modalClick("activities", item, filteredUrls[index] ? filteredUrls[index] : fallback)
                  }
                >
                  <UtensilsDishesImage>
                    <MainImage
                      src={filteredUrls[index] ? filteredUrls[index] : fallback}
                      alt=""
                      width={500}
                      height={80}
                      style={{
                        borderRadius: 4,
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </UtensilsDishesImage>
                  <Menutitle>
                    {item.acf.title}
                  </Menutitle>
                  <PriceText>
                    £ {item.acf.price_from}
                  </PriceText>
                </ScrollingMenuDishes>
              </div>
            );
          })}
      </ScrollingMenu>
    </>
  );
};

export default EnjoyTheSunshine;
