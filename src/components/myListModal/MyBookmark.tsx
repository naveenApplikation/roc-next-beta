import React from "react";
import styled from "styled-components";
import TabPanel from "../tabPanel";
import Lists from "./Mylist";
import { RestroListData } from "@/app/utils/data";
import Image from "next/image";
import { blank, thumbsup } from "@/app/utils/ImagePath";
import Ratings from "../ratings";
import Skeleton from "react-loading-skeleton";
import { icons } from "@/app/utils/iconList";

interface DashboardSearchContainerProps {
  myBookmarktabChange: Function;
  myBookmarkoptions: any;
  myBookMarkState: string;
  listData?: any;
  contributionData?: any;
  loader?: boolean;
}

const skeletonItems = new Array(10).fill(null);

const MyBookmark: React.FC<DashboardSearchContainerProps> = ({
  myBookmarktabChange,
  myBookmarkoptions,
  myBookMarkState,
  listData,
  contributionData,
  loader,
}) => {

  return (
    <>
      <TabPanel
        defaultValue="Lists"
        tabChange={myBookmarktabChange}
        options={myBookmarkoptions}
      />
      {myBookMarkState == "Lists" ? (
        <>
          <Lists {...{ listData, loader }} />
          {/* <h1>lists</h1> */}
          {/* <Lists {...{ listData, loader }} /> */}
          {/* <div>
            <Container>
              {listData.length
                ? listData.map((item: any, index: any) => {
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
                          <p>{item.votes}</p>
                        </LikesContainer>
                      </ListContainer>
                    );
                  })
                : skeletonItems.map((item, index) => (
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
                  ))}
            </Container>
          </div> */}
        </>
      ) : (
        <>
        {/* <Lists {...{ loader }} listData={contributionData}/> */}
        {/* <h1>events</h1> */}
          {/* <Lists {...{ loader }} listData={contributionData}/> */}
        
          {/* <FilterSection /> */}
          {/* <SearchedListContainer>
            {contributionData.map((item: any, index: any) => {
              return (
                <SearchedData key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}>
                    <Image style={{ background: "white" }} src={blank} alt="" />
                    <div className="restroRating">
                      <p className="shopName">{item?.name}</p>
                      <div style={{ display: "flex", alignItems: "center" }}>

                        <Ratings defaultValue={item?.rating} />
                      </div>
                      <p>
                        <span>Open - Close</span>
                      </p>
                      <p>Indoors</p>
                    </div>
                  </div>
                  <div className="likes">
                    <Image
                      src={thumbsup}
                      alt="like"
                      style={{ width: "16px", height: "16px" }}
                    />
                    <p>{item?.likeCount}</p>
                  </div>
                </SearchedData>
              );
            })}
          </SearchedListContainer> */}
        </>
      )}
    </>
  );
};

export default MyBookmark;

const SearchedListContainer = styled.div`
  padding-bottom: 40px;
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

const Container = styled.div`
  background-color: #fff;
  height: 100%;
  min-height: 83vh;
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
  cursor: pointer;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;

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
