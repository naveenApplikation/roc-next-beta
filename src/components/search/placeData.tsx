import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { commentstar } from "@/app/utils/ImagePath";
import Instance from "@/app/utils/Instance";
import Skeleton from "react-loading-skeleton";
import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../assets/images/fallbackimage.png";
import ImageCom from "../addList/imageCom";
import useSWR from "swr";

interface listSearchProps {
  filterData?: any;
}

const PlacePage: React.FC<listSearchProps> = ({ filterData }) => {
  const [skeletonData] = useState(new Array(10).fill(null));
  const [topPlace, setTopPlace] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState(true);
  const {
    placeloader,
    placeData,
    searchQuery,
    selectFilter,
    setPlaceData,
    modalClick,
  } = useMyContext();

  const fetcher = (url: string) => fetch(`https://beta-dot-roc-app-425011.nw.r.appspot.com${url}`).then((res) => res.json());

  const { data: topPlaceData, error: topPlaceError } = useSWR(
    searchQuery === "" && selectFilter === "Any" ? '/google/top-attraction' : null,
    fetcher
  );

  useEffect(() => {
    if (topPlaceData) {
      setTopPlace(topPlaceData[0]?.GoogleHomeScreenList || []);
      setPlaceData([]);
      setLoader(false);
    }
  }, [topPlaceData]);

  useEffect(() => {
    const Timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(Timer);
  }, [searchQuery, selectFilter]);

  return (
    <>
      {placeloader ? (
        skeletonData.map((item, index) => (
          <SearchedData key={index}>
            <MainInsideWrapper>
              <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
              <div className="restroRating">
                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
              </div>
            </MainInsideWrapper>
          </SearchedData>
        ))
      ) : (
        <>
          {placeData.length ? (
            <>
              {searchQuery ? (
                <SearchedListContainer>
                  {placeloader
                    ? skeletonData.map((item, index) => (
                      <SearchedData key={index}>
                        <MainInsideWrapper>
                          <Skeleton
                            width={80}
                            height={80}
                            style={{ borderRadius: 8 }}
                          />
                          <div className="restroRating">
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                          </div>
                        </MainInsideWrapper>
                      </SearchedData>
                    ))
                    : placeData.length
                      ? filterData.map((item: any, index: any) => {
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
                            title={item?.data_type ? "" : "No data available"}
                            key={index}>
                            <ListDataWrraper
                              onClick={() =>
                                modalClick(
                                  "ModalContent",
                                  item,
                                  item?.photoUrl ? item?.photoUrl : fallback
                                )
                              }
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
                                        ? item?.acf?.aa_rating?.value ==
                                          "No rating"
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
                                    <span style={{ color: item?.opening_hours?.open_now ? "#2B902B" : "#FF0000", fontSize: '14px', fontWeight: '500' }}>
                                      {item?.opening_hours?.open_now ? "Open" : "Closed"}
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
              ) : (
                <SearchedListContainer>
                  {placeloader
                    ? skeletonData.map((item, index) => (
                      <SearchedData key={index}>
                        <MainInsideWrapper>
                          <Skeleton
                            width={80}
                            height={80}
                            style={{ borderRadius: 8 }}
                          />
                          <div className="restroRating">
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                            <Skeleton
                              width={120}
                              height={15}
                              style={{ borderRadius: 8 }}
                            />
                          </div>
                        </MainInsideWrapper>
                      </SearchedData>
                    ))
                    : placeData.length
                      ? filterData.map((item: any, index: any) => {
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
                            title={item?.data_type ? "" : "No data available"}
                            key={index}>
                            <ListDataWrraper
                              onClick={() =>
                                modalClick(
                                  "ModalContent",
                                  item,
                                  item?.photoUrl ? item?.photoUrl : fallback
                                )
                              }
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
                                        ? item?.acf?.aa_rating?.value ==
                                          "No rating"
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

                                </div>
                              </div>
                            </ListDataWrraper>
                          </div>
                        );
                      })
                      : ""}
                </SearchedListContainer>
              )}
            </>
          ) : (
            <ScrollingMenu>
              {loader
                ? skeletonData.map((item, index) => (
                  <div key={index} style={{ display: "flex", gap: "15px" }}>
                    <Skeleton
                      width={80}
                      height={80}
                      style={{ borderRadius: "5px" }}
                    />
                    <Skeleton
                      width={80}
                      height={15}
                      style={{ marginTop: 8, borderRadius: 6 }}
                    />
                  </div>
                ))
                : 
                topPlace?.slice(0, 10).map((item: any, index: any) => {
                  return (
                    <TopAttractionContainer
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.data_type === "google"
                            ? item?.photoUrl
                            : item?.photoUrl
                              ? item?.photoUrl
                              : fallback
                        )
                      }>
                      <TopAttractionprofile>
                        {item?.data_type === "google" ? (
                          item.photoUrl == undefined ? (
                            <Image
                              src={fallback}
                              alt=""
                              width={500}
                              height={80}
                              style={{
                                borderRadius: "100%",
                                maxWidth: "100%",
                                objectFit: "cover",
                              }}
                            // alt=""
                            />
                          ) : (
                            <ImageTag src={item.photoUrl} alt="Image" />
                          )
                        ) : (
                          <Image
                            src={fallback}
                            alt=""
                            width={500}
                            height={80}
                            style={{
                              borderRadius: "100%",
                              maxWidth: "100%",
                              objectFit: "cover",
                            }}
                          // alt=""
                          />
                        )}
                      </TopAttractionprofile>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          flexDirection: "column",
                          maxWidth: "calc(100% - 30%)",
                        }}>
                        <ListDataTittleText>{item?.name}</ListDataTittleText>
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                          }}>
                          <ListDataInfoText style={{ width: "20px" }}>
                            {item?.rating}
                          </ListDataInfoText>
                          <Image src={commentstar} alt="infoCirlce" />
                        </div>
                      </div>
                    </TopAttractionContainer>
                  );
                })}
            </ScrollingMenu>
          )}
        </>
      )}
    </>
  );
};

export default PlacePage;

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
    width: 95%;
  }
`;

const SearchedListContainer = styled.div`
  padding-bottom: 40px;
  padding-top: 20px;
    max-height: calc(100dvh - 250px);
  overflow: auto;
    &::-webkit-scrollbar {
    display: none;
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

const MainInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const ScrollingMenu = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  max-height: calc(100dvh - 285px);
  overflow: auto;
    &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const TopAttractionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const TopAttractionprofile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-size: contain;
`;

const ImageTag = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
  height: 100%;
`;
