import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { thumbsup } from "@/app/utils/ImagePath";
import { Spin } from "antd";
import Instance from "@/app/utils/Instance";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
interface ListProps {
  listData?: any;
  loader?: any;
}

const Lists: React.FC<ListProps> = ({ listData, loader }) => {
  const skeletonItems = new Array(10).fill(null);
  const router = useRouter();
  const { menuClick } = useMyContext();

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
  const handleNavigate = (category: string, id: string) => {
    menuClick(category, false, id);
  };
  return (
    <Container>
      {loader ? (
        skeletonItems.map((item, index) => (
          <SearchedData key={index}>
            <MainWrraper>
              <MainInsideWrapper>
                <Skeleton
                  width={40}
                  height={40}
                  style={{ borderRadius: 100 }}
                />
                <div className="restroRating">
                  <Skeleton width={120} height={14} />
                </div>
              </MainInsideWrapper>
              <Skeleton width={56} height={24} />
            </MainWrraper>
          </SearchedData>
        ))
      ) : listData?.length == 0 ? (
        <p style={{ fontSize: "16px" }}> No Bookmarks</p>
      ) : (
        listData?.map((item: any, index: any) => {
          return (
            // item.image ?
            item ? (
              <ListContainer
                key={index}
                onClick={() => {
                  handleNavigate(item?.listName, item?._id);
                }}
              >
                <ImageTitleContainer>
                  <Imagecontainer style={{ background: item?.bgColor }}>
                    {item ? item.image : ""}
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
              </ListContainer>
            ) : (
              <p style={{ fontSize: "16px" }}> No data found</p>
            )
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
  cursor: pointer;
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

const MainWrraper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
`;
const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
