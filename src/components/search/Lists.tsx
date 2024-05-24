import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { PopularLists } from "./Data";
import { thumbsup } from "@/app/utils/ImagePath";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";

interface listSearchProps {
  searchItem?: any;
  searchQuery?: any;
}

const Container = styled.div`
  padding-bottom: 20px;
`;

const PopularListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0px;

  .view {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;
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
    @media screen and (max-width: 350px) {
      font-size: 1.3rem;
    }
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
    @media screen and (max-width: 350px) {
      font-size: 1.6rem;
    }
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

const Lists: React.FC<listSearchProps> = ({ searchItem,searchQuery }) => {
  const [listData, setListData] = useState<string[]>([]);
  const router = useRouter();

  const { closeModal } = useMyContext();

  const fetchDataAsync = async () => {
    try {
      const response = await Instance.get(`/category-item`);
      if (response.status === 200) {
        response.data.forEach((list: any) => {
          const matchedIcon = icons.find((icon) => icon.name === list.iconName);
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        });
        setListData(response?.data);
      } else {
        setListData([]);
      }
    } catch (error) {
      setListData([]);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
    }
  };

  const skeletonItems = new Array(10).fill(null);

  const ViewAllhandler = () => {
    menuClick("Trending Lists", true, "category-item");
    closeModal("search");
  };

  return (
    <Container>
      {searchQuery.length ? (
        <>
          {searchItem.length
            ? searchItem.map((item: any, index:any) => {
                return (
                  <ListContainer key={index}>
                    <ImageTitleContainer
                      onClick={() =>
                        menuClick(item?.listName, false, item?._id)
                      }
                    >
                        {item?.image}
                      <p>{item?.listName}</p>
                    </ImageTitleContainer>
                    <LikesContainer>
                      <Image
                        style={{ width: 16, height: "auto" }}
                        src={thumbsup}
                        alt="icon"
                      />
                      <p>{item.voting.length}</p>
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
        </>
      ) : (
        <>
          <PopularListContainer>
            <PopularlistTitle>Popular Lists</PopularlistTitle>
            <p className="view" onClick={ViewAllhandler}>
              View All
            </p>
          </PopularListContainer>
          {listData.length
            ? listData.slice(0, 10).map((item: any, index) => {
                return (
                  <ListContainer key={index}>
                    <ImageTitleContainer
                      onClick={() =>
                        menuClick(item?.listName, false, item?.categoryId)
                      }
                    >
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
        </>
      )}
    </Container>
  );
};

export default Lists;
