import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Image from "next/image";
import { blank, commentstar, thumbsup, utensils } from "@/app/utils/ImagePath";
import SearchInput from "../searchInput/SearchInput";
import Instance from "@/app/utils/Instance";
import { useMyContext } from "@/app/Context/MyContext";
import Skeleton from "react-loading-skeleton";
import ImageCom from "../addList/imageCom";
import fallback from "../../../assets/images/fallbackimage.png";
import FilterSection from "../filterSection";
import { RestroListData } from "@/app/utils/data";
import TabPanel from "../tabPanel";
import Ratings from "../ratings";
import Lists from "../search/Lists";
import { CategoryIcons } from "@/app/utils/iconList";
import { buildFilterUrl } from "@/app/utils/filter";

interface DashboardSearchContainerProps {
  tabChange: Function;
  options: any;
  tabValue: string;
  showMap?: boolean;
  modalClick?: any;
}

const DashboardSearchContainer: React.FC<DashboardSearchContainerProps> = ({
  tabChange,
  options,
  tabValue,
  showMap,
  modalClick,
}) => {
  const {
    modalType,
    filterValues,
    setSearchQuery,
    searchQuery,
    fetchDataAsync,
    placeloader,
    placeData,
    setPlaceData,
  } = useMyContext();
  const [data, setData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [skeletonData] = useState(new Array(10).fill(null));

  const handleChange = (value: string) => {
    setSearchQuery(value);
    if (searchQuery.length == 0) {
      setData([]);
      setPlaceData([]);
    }
  };

  const fetchDataListAsync = async (value: string) => {
    setLoader(true);
    try {
      const result = await Instance.get(`/filter/category?query=${value}`);
      console.log(result, "sdsds");
      if (result.status === 200) {
        result.data.list.forEach((list: any) => {
          const matchedIcon = CategoryIcons.find(
            (icon) => icon.name === list.iconName
          );
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        });
        setData(result?.data);
      }
    } catch (error: any) {
      console.log(error.message);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!modalType.search) {
      setSearchQuery("");
      setData([]);
    }
  }, [modalType.search]);

  const handleSearch = () => {
    if (tabValue == "Lists") {
      fetchDataListAsync(searchQuery);
    } else {
      fetchDataAsync(searchQuery, filterValues);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [tabValue]);

  return (
    <>
      <InputWrapper className="filterInput">
        <SearchInput
          value={searchQuery}
          onchange={(e: any) => handleChange(e.target.value)}
          handleSearch={handleSearch}
          id="myInput"
          homeSearch={true}
        />
      </InputWrapper>
      <>
        {/* <FilterSection /> */}
        {/* <SearchedListContainer>
          {loader
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
            : searchQuery && data.length
            ? data.map((item: any, index: any) => {
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
                    key={index}
                  >
                    <ListDataWrraper
                      onClick={() =>
                        modalClick(
                          "ModalContent",
                          item,
                          item?.photoUrl ? item?.photoUrl : fallback
                        )
                      }
                      selected={item?.data_type ? true : false}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          width: "85%",
                        }}
                      >
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
                          }}
                        >
                          <ListDataTittleText>{item?.name}</ListDataTittleText>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              alignItems: "center",
                            }}
                          >
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
                              }}
                            >
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
        </SearchedListContainer> */}
      </>

      <TabPanel defaultValue="Lists" tabChange={tabChange} options={options} />
      {tabValue == "Lists" ? (
        <>
          <Lists searchItem={data} searchQuery={searchQuery} />
        </>
      ) : (
        <>
          <FilterSection />
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
              : searchQuery && placeData.length
              ? placeData.map((item: any, index: any) => {
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
                          </div>
                        </div>
                      </ListDataWrraper>
                    </div>
                  );
                })
              : ""}
          </SearchedListContainer>
        </>
      )}
    </>
  );
};

export default DashboardSearchContainer;

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
