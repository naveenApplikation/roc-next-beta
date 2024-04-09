// import { RestroListData } from "@/app/dashboard/data";
import { blank, thumbsup, utensils } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Ratings from "../ratings";
import {
  EnjoyShineMenuItem,
  familyEventMenuItem,
  LocalCuisineMenuItem,
  topAttractionItem,
  topSideMenu,
  community,
  RestroListData,
  WalksData,
  BarMenuItem,
} from "@/app/dashboard/data";

interface AttractionBoxProps {
  // Define your props here
  urlData?: any;
  urlTitle?: string;
}

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const SearchedListContainer = styled.div`
  /* padding-bottom: 40px; */
  padding: 40px;
  background-color: #f2f3f3;
  width: 580px;
  height: 100%;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 40px 15px;
  }
`;

const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  p {
    font-size: 13px;
    font-weight: 400;
  }
  .likes {
    background-color: #00000014;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;

    @media screen and (max-width: 350px) {
      padding: 6px 12px;
    }
  }
  .shopName {
    font-size: 16px;
    font-weight: 600;
  }
  p span {
    color: #2b902b;
  }
`;

type MenuItemArray = typeof LocalCuisineMenuItem[];

const AttractionBox: React.FC<AttractionBoxProps> = ({ urlTitle, urlData }) => {



  const dataShow = ()=>{
    if(urlData == 1){
      return LocalCuisineMenuItem
    }
    else if(urlData == 2){
      return topAttractionItem
    }
    else if(urlData == 3){
      return BarMenuItem
    }
    else if(urlData == 4){
      return BarMenuItem
    }
    else if(urlData == 5){
      return LocalCuisineMenuItem
    }
    else if(urlData == 6){
      return WalksData
    }
    else if(urlData == 7){
      return LocalCuisineMenuItem
    }
    else{
      return RestroListData
    }
  }

  // console.log(dataShow(),"dsdsd")

  return (
    <SearchedListContainer>
      <TitleText>{urlTitle}</TitleText>
      {dataShow().map((item: any, index: any) => {
        return (
          <SearchedData key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Image
                  // style={{ background: "white" }}
                  src={item.headerImage}
                  width={80}
                  height={80}
                  style={{borderRadius:8}}
                  alt=""
                />
                <div className="restroRating">
                  <p className="shopName">{item.resturantName}</p>
                  <div style={{ alignItems: "center", display: "flex" }}>
                    <Image
                      src={utensils}
                      style={{
                        width: "13px",
                        height: "13px",
                        marginRight: 8,
                      }}
                      alt="utensils"
                    />
                    <Ratings defaultValue={item.rating} />
                  </div>
                  <p>
                    <span>Open - Closes {item.time}</span>
                  </p>
                </div>
              </div>
              <div className="likes">
                <Image
                  src={thumbsup}
                  alt="like"
                  style={{ width: "16px", height: "16px" }}
                />
                <p>{item.likeCount}</p>
              </div>
            </div>
          </SearchedData>
        );
      })}
    </SearchedListContainer>
  );
};

export default AttractionBox;
