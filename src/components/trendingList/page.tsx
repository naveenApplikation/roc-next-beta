"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { PopularLists, SelectedLists } from "@/components/search/Data";
import { thumbsup } from "@/app/utils/ImagePath";
import { sideWidth } from "@/app/utils/date";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";



interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const Container = styled.div`
  padding: 40px;
  background-color: #f2f3f3;
  width: ${sideWidth};
  height: 100%;
  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 40px 15px;
  }
`;

const PopularListContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .view {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const PopularlistTitle = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 24px;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 0px;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Imagecontainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100%;
  background: #eb5757;
`;

const LikesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: rgba(0, 0, 0, 0.48);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const TrendingList: React.FC<TrendingListProps> = ({ urlTitle, urlData }) => {
  const [listData, setListData] = useState<string[]>([])


  const fetchDataAsync = async () => {
    try {
      const response = await Instance.get("/category?limit=false")
      if (response.status === 200) {
        response.data.forEach((list: any) => {
          const matchedIcon = icons.find(icon => icon.name === list.iconName);
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        })
        setListData(response?.data)
      } else {
        setListData([])

      }
    } catch (error) {
      setListData([])

    }
  }

  useEffect(() => {
    fetchDataAsync()
  }, [urlData])

  // const dataShow = () => {
  //   if (urlData == 1) {
  //     return PopularLists;
  //   }
  //   else {

  //     return SelectedLists;
  //   }
  // };



  return (
    <div>
      <Container>
        <PopularListContainer>
          <PopularlistTitle>{urlTitle}</PopularlistTitle>
        </PopularListContainer>
        {listData.length ? listData.map((item: any, index) => {
          return (
            <ListContainer key={index}>
              <ImageTitleContainer>
                <Imagecontainer style={{ background: item?.bgColor }}>
                  {item?.image}
                </Imagecontainer>
                <p>{item?.listName}</p>
              </ImageTitleContainer>
              <LikesContainer>
                <Image
                  style={{ width: 16, height: "auto" }}
                  src={thumbsup}
                  alt="icon"
                />
                <p>0</p>
              </LikesContainer>
            </ListContainer>
          );
        }) : ""}
      </Container>
    </div>
  );
};

export default TrendingList;
