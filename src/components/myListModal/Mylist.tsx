import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { PopularLists } from "../search/Data";
import { thumbsup } from "@/app/utils/ImagePath";
import { Spin } from "antd";

interface ListProps {
  listData?: any;
  loader?: any;
}

const Container = styled.div`
  padding-bottom: 20px;
`;

const PopularListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;

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

const Lists: React.FC<ListProps> = ({ listData, loader }) => {
  return (
    <Container>
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "500px",
          }}>
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        listData.map((item: any, index: any) => {
          console.log("hiiiiii", item);
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
        })
      )}
    </Container>
  );
};

export default Lists;
