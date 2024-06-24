import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { PopularLists } from "./Data";
import { thumbsup, commentstar } from "@/app/utils/ImagePath";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../assets/images/fallbackimage.png";
import ImageCom from "../addList/imageCom";

interface listSearchProps {
  searchItem?: any;
  searchQuery?: any;
}

const Container = styled.div`
  padding-bottom: 20px;
  max-height: calc(100dvh - 250px);
  overflow: auto;
    &::-webkit-scrollbar {
    display: none;
  }

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
  flex: 1;

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

const NoResults = styled.p`
  color: var(--BODY, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 10px;
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

const Lists: React.FC<listSearchProps> = ({ searchItem, searchQuery }) => {
  const [listData, setListData] = useState<string[]>([]);
  const router = useRouter();

  const { closeModal, modalClick } = useMyContext();

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
    <>
      {searchItem?.list?.length == 0 ? (
        <Container>
          {/* <PopularlistTitle>Lists</PopularlistTitle>
          <NoResults>No results</NoResults> */}
          {searchItem.places && (
            <SearchedListContainer>
              <PopularlistTitle style={{ marginTop: 10 }}>
                Places
              </PopularlistTitle>
              {searchQuery && searchItem.places.length
                ? searchItem.places.map((item: any, index: any) => {
                  if (!item.place_id) {
                    return null;
                  }
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        width: "100%",
                        opacity: item?.data_type ? "1" : ".25",
                        
                      }}
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.photoUrl ? item?.photoUrl : fallback
                        )
                      }
                      title={item?.data_type ? "" : "No data available"}
                      key={index}>
                      <ListDataWrraper
                        // onClick={() =>
                        //   modalClick(
                        //     "ModalContent",
                        //     item,
                        //     item?.photoUrl ? item?.photoUrl : fallback
                        //   )
                        // }
                        selected={item?.data_type ? true : false}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            width: "85%",
                          }}>
                          <div style={{ width: 80, height: 80 }}>
                            {item?.photos ? (
                              <ImageCom imageArr={item?.photos} />
                            ) : (
                              <Image
                                src={fallback}
                                width={500}
                                height={80}
                                style={{
                                  borderRadius: 4,
                                  maxWidth: "100%",
                                  objectFit: "cover",
                                }}
                                alt="infoCirlce"
                              />
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              flexDirection: "column",
                              maxWidth: "calc(100% - 30%)",
                            }}>
                            <ListDataTittleText>
                              {item?.name}
                            </ListDataTittleText>
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                              }}>
                              <ListDataInfoText>
                                {item?.acf?.aa_rating
                                  ? item?.acf?.aa_rating?.value == "No rating"
                                    ? ""
                                    : item?.acf?.aa_rating?.value
                                  : item?.rating}
                              </ListDataInfoText>
                              <Image src={commentstar} alt="infoCirlce" />
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  flexWrap: "wrap",
                                  width: "100%",
                                }}>
                                {item?.acf?.portal_post_owner_name ? (
                                  <ListDataInfoText>
                                    . {item?.acf?.portal_post_owner_name}
                                  </ListDataInfoText>
                                ) : null}
                              </div>
                            </div>
                            <p>
                              <span
                                style={{
                                  color: item?.opening_hours?.open_now
                                    ? "#2B902B"
                                    : "#FF0000",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                }}>
                                {item?.opening_hours?.open_now
                                  ? "Open"
                                  : "Closed"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </ListDataWrraper>
                    </div>
                  );
                })
                : ""}
            </SearchedListContainer>
          )}
        </Container>
      ) : (
        <Container>
          {searchQuery && searchItem?.list?.length ? (
            <>
              {searchItem?.list?.length
                ? searchItem?.list.map((item: any, index: any) => {
                  return (
                    <ListContainer key={index}>
                      <ImageTitleContainer
                        onClick={() =>
                          menuClick(item?.listName, false, item?._id)
                        }>
                        {item?.image}
                        <p>{item?.listName}</p>
                      </ImageTitleContainer>
                      <LikesContainer>
                        <Image
                          style={{ width: 16, height: "auto" }}
                          src={thumbsup}
                          alt="icon"
                        />
                        <p>{item?.voting?.length}</p>
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
                        }>
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
      )}
    </>
  );
};

export default Lists;

const ListDataWrraper = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px 0px;
  position: relative;
  cursor: ${(props) => (props.selected ? "pointer" : "not-allowed")};
`;

const ListDataTittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ListDataInfoText = styled.p.attrs((props) => ({
  className: props.className,
}))`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
  &.type_style {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 95%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;
const SearchedListContainer = styled.div`
  padding-bottom: 40px;
`;
