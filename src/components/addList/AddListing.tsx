"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { commentstar } from "@/app/utils/ImagePath";
// import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import UnselectedBtnImg from "../../../assets/images/createListImages/check.png";
import SelectedBtnImg from "../../../assets/images/createListImages/plus-circle.png";
import SearchComponent from "@/components/searchInput/SearchInput";
import Image from "next/image";
// import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import Skeleton from "react-loading-skeleton";
// import CreateListingsHeader from "../createList/CreateList Components/CreateListsHeader";
// import CreateListingsFooter from "../createList/CreateList Components/CreateListsFooter";
const CreateListingsHeader = dynamic(() => import("../createList/CreateList Components/CreateListsHeader"), { ssr: false })
const CreateListingsFooter = dynamic(() => import("../createList/CreateList Components/CreateListsFooter"), { ssr: false })
import ImageCom from "./imageCom";

import fallback from '../../../assets/images/fallbackimage.png'

interface AddListingsProps {
  ScreenSwitch?: Function;
  homePage: any;
  toggleSelected: any;
  selectedItemIds: any;
  searchQuery: string;
  handleSearch: (value: string) => void;
  handleChange?: any;
  data: any[];
  loader?: boolean;
  loading?: boolean;
  UI_Type?: string;
  setSearchQuery?: any;
}





interface Item {
  name: any;
  placeName1: any;
  itemPlaceLogo: any;
  status1: any;
  timing2: any;
  unSelectedBtn: any;
  placeName2?: any; // Make it optional
}

const AddListings: React.FC<AddListingsProps> = ({
  ScreenSwitch,
  homePage,
  selectedItemIds,
  toggleSelected,
  handleSearch,
  handleChange,
  searchQuery,
  data,
  loader,
  UI_Type,
  loading,
  setSearchQuery,
}) => {

  const [skeletonData] = useState(new Array(10).fill(null))
  const inputRef = useRef<HTMLInputElement>(null);


  const handleClearText = () => {
    setSearchQuery('')
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input
    }

  }

  return (
    <CreateListingsScreen>
      <CreateListItemScrollBox>
        <CreateListingsHeader homePage={homePage}{...{ UI_Type }} />
        <CreateListingsContent>
          <AddListingsTitle>Search for businesses you’d like to add to the list</AddListingsTitle>
          <SearchInputBox>
            <SearchComponent
              inputRef={inputRef}
              value={searchQuery}
              onchange={(e: any) => handleChange(e.target.value)}
              handleSearch={handleSearch}
              handleClearText={handleClearText}
              loader={loader}
            />
          </SearchInputBox>
          {loader ?
            skeletonData.map((item, index) => (
              <SearchedData key={index}>
                <MainWrraper>
                  <MainInsideWrapper>
                    <Skeleton width={80} height={80} style={{ borderRadius: 8 }} />
                    <div className="restroRating">
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                      <Skeleton width={120} height={15} style={{ borderRadius: 8 }} />
                    </div>
                  </MainInsideWrapper>
                  <div className="likes">
                    <Skeleton width={16} height={16} />
                  </div>
                </MainWrraper>
              </SearchedData>
            ))
            :
            data.map((item: any, index: any) => {
              return (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16, width: '100%' }}
                  key={index}>
                  <ListDataWrraper>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        width: '85%',
                      }}>
                      <div style={{ width: 80, height: 80 }}>
                        {/* <Image
                               src={""}
                               width={500}
                               height={80}
                               style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
                               alt="infoCirlce"
                             /> */}
                        <ImageCom imageArr={item?.photos == undefined ? fallback : item?.photos} />
                      </div>
                      <div style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
                        maxWidth: 'calc(100% - 30%)'
                      }}>
                        <ListDataTittleText>
                          {item?.name}
                        </ListDataTittleText>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <ListDataInfoText>
                            {item?.acf?.aa_rating
                              ? item?.acf?.aa_rating?.value == "No rating"
                                ? ""
                                : item?.acf?.aa_rating?.value
                              : item?.rating}
                          </ListDataInfoText>
                          <Image src={commentstar} alt="infoCirlce" />
                          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', width: '100%' }}>

                            {
                              item?.acf?.portal_post_owner_name ? (
                                <ListDataInfoText>
                                  . {item?.acf?.portal_post_owner_name}
                                </ListDataInfoText>
                              ) : null
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div onClick={() => toggleSelected(item.place_id, item)}>
                      {selectedItemIds.includes(item.place_id) ? (
                        <UnselectedBtn>
                          <Image
                            style={{ width: "15px", height: "10px" }}
                            src={UnselectedBtnImg}
                            alt="UnselectedBtnImg"
                          />
                        </UnselectedBtn>
                      ) : (
                        <SelectedBtn>
                          <Image
                            style={{ width: "16px", height: "16px" }}
                            src={SelectedBtnImg}
                            alt="SelectedBtnImg"
                          />
                        </SelectedBtn>
                      )}
                    </div>
                  </ListDataWrraper>
                </div>
              );
            })}
        </CreateListingsContent>
      </CreateListItemScrollBox>
      {
        selectedItemIds.length ?
          <CreateListingsFooter
            loader={loader}
            loading={loading}
            continueBtn={selectedItemIds.length ? true : false}
            ScreenSwitch={ScreenSwitch}
            selectedItem={selectedItemIds.length}
          /> : ""
      }
    </CreateListingsScreen>
  );
};

export default AddListings;


const CreateListingsScreen = styled.div`
  width: 480px;
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const CreateListingsContent = styled.div`
  width: 100%;
  height: auto;
  padding: 24px 0px 0px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
`;

const AddListingsTitle = styled.div`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width:95%;
  @media screen and (max-width: 400px) {
    padding-right: 10px;
  }
`;



const SearchInputBox = styled.div`
  /* margin-right: 24px; */
  padding-right: 24px;
  @media screen and (max-width: 400px) {
    padding-right: 10px;
  }
`;

const CreateListItemScrollBox = styled.div`
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  padding-bottom: 100px;
`;

const ListDataWrraper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px  25px 9px 0px;
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

const ListDataInfoText = styled.p.attrs(props => ({
  className: props.className,
}))`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
 text-transform: capitalize;
 &.type_style{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width:85%;
 }

`;

const UnselectedBtn = styled.div`
  width: 48px;
  height: 81px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: var(--MAIN, #2f80ed);
  background: #27ae60;
  border-style: none;
  cursor: pointer;
  // position: absolute;
  // right: 24px;
  // top: 10px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;

const SelectedBtn = styled.button`
  width: 48px;
  height: 81px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: #2f80ed;
  border-style: none;
  cursor: pointer;
  // position: absolute;
  // right: 24px;
  // top: 10px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;


const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  width:90%;
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
  cursor: pointer;
`;