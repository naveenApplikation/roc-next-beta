import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { thumbsup } from "@/app/utils/ImagePath";
import { Spin } from "antd";
import Instance from "@/app/utils/Instance";

interface ListProps {
  listData?: any;
  loader?: any;
}



const Lists: React.FC<ListProps> = ({ listData, loader }) => {

  // const getCreatedList = async()=>{
  //   try {
  //       const res = await Instance.get(`my-list`)
  //       console.log("response of created list", res)
  //   } catch (error) {

  //   }
  // }


  // useEffect(()=>{
  //   getCreatedList()
  // },[])

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
        listData?.map((item: any, index: any) => {
          return (
            item?.image ?
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
                  <p>{item?.voting?.length || 0}</p>
                </LikesContainer>
              </ListContainer> : <p style={{ fontSize: '16px' }}> No data found</p>
          );
        })
      )}
    </Container>
  );
};

export default Lists;


const Container = styled.div`
  padding-bottom: 20px;
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
