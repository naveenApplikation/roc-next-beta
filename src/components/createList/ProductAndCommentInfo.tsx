"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  infoCircle,
  utensils,
  AuthorcommentIcon,
  commentstar,
} from "@/app/utils/ImagePath";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import Image from "next/image";
import CreateListItems from "./CreateList Components/CreateListItems";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import { categoryCreationDate, sideWidth } from "../..//app/utils/date";

interface ListDetailsProps {
  ScreenSwitch?: Function;
  preScreen?: Function;
  homePage?: any;
  selectedData?: any;
  categoryType?: any;
  selectedIcon?: any;
  listName?: string;
  loader?: boolean;
  screenName?: string;
}

const ListDetailsScreen = styled.div`
  width: ${sideWidth};
  height: 100vh;
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  padding-bottom: 100px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const CreateListingHeader = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--Line, rgba(0, 0, 0, 0.16));
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(22px);

  @media screen and (max-width: 400px) {
    padding: 24px 10px;
  }
`;

const CreateListTitle = styled.div`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CancelText = styled.div`
  color: var(--BODY, #000);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const PreviewList = styled.div`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  background: var(--Yellow, #ffae00);
  margin-bottom: 40px;

  p {
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const TittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const LocationInfoText = styled.p`
  color: var(--BODY, #000);
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px; /* 184.615% */
  letter-spacing: 0.13px;
`;

const CommentReviewText = styled.p`
  color: var(--BODY, #000);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.13px;
`;

const CommentBoxWrapper = styled.div`
  position: relative;
  width: 100%; /* Adjust width as needed */
  background: #efebe7;
  border: none;
  border-radius: 5px;
  padding: 10px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  left: 4px;
  width: 21px;
  height: 18px;
  background: #efebe7;
  clip-path: polygon(32% 0%, 0% 0%, 0% 38%);
  transform: rotate(45deg);
  border: none;
  border-right: none;
  border-bottom: none;
`;

const ListAuthorComment = styled.p`
  color: var(--BODY, #000);
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 240% */
  letter-spacing: 0.1px;
`;

const ListCommentText = styled.p`
  color: var(--BODY, #000);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 123.077% */
`;

const ListDataWrraper = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px 0px;
`;

const ListDataTittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ListDataInfoText = styled.p`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`;

const ListDataTime = styled.p`
  color: #2b902b;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`;

const CreateListItemScrollBox = styled.div`
  height: 100vh;
  overflow: auto;
  scrollbar-width: none;
  padding-bottom: 100px;
`;

const ProductAndCommentInfo: React.FC<ListDetailsProps> = ({
  homePage,
  ScreenSwitch,
  preScreen,
  selectedData,
  listName,
  loader,
  categoryType,
  selectedIcon,
  screenName,
}) => {
  return (
    <ListDetailsScreen>
      <CreateListItemScrollBox>
        <CreateListingHeader>
          <CreateListTitle>Create List</CreateListTitle>
          <CancelText onClick={homePage}>CANCEL</CancelText>
        </CreateListingHeader>
        <PreviewList>
          <p>Preview your list:</p>
          <Image src={infoCircle} alt="infoCirlce" />
        </PreviewList>
        <div style={{ padding: "0px 24px" }}>
          <TittleText>{listName}</TittleText>
          <LocationInfoText>Tester / {categoryCreationDate()}</LocationInfoText>
          {/* <CommentReviewText>
          Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam
          porta sem malesuada magna mollis euismod.{" "}
          <span style={{ color: "#2F80ED", cursor: "pointer" }}>
            Read More.
          </span>
        </CommentReviewText> */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* <ListDataWrraper>
            <div style={{ width: 80, height: 80 }}>
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FAppImage%2Fbanjo.jpg?alt=media&token=e20e5e98-87f9-4a6c-8dda-7f2372d5f7dc"
                }
                width={80}
                height={80}
                style={{ borderRadius: 4 }}
                alt="infoCirlce"
              />
            </div>
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <ListDataTittleText>Kyomu</ListDataTittleText>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <ListDataInfoText>4.7</ListDataInfoText>
                <Image src={commentstar} alt="infoCirlce" />
                <ListDataInfoText>⋅ St Helier</ListDataInfoText>
                <ListDataInfoText>⋅ Restaurant</ListDataInfoText>
              </div>
              <ListDataTime>Open ⋅ Closes 11 pm</ListDataTime>
            </div>
          </ListDataWrraper> */}

            {selectedData.length &&
              selectedData.map((item: any, index: any) => {
                const image = item.photoUrl ? item.photoUrl : "";
                return (
                  <ListDataWrraper key={item.place_id}>
                    <div style={{ width: 80, height: 80 }}>
                      <Image
                        src={image}
                        width={80}
                        height={80}
                        style={{ borderRadius: 4 }}
                        alt="infoCirlce"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: "column",
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
                        <ListDataInfoText>{item?.rating}</ListDataInfoText>
                        <Image src={commentstar} alt="infoCirlce" />
                        {/* <ListDataInfoText>⋅ {item?.acf?.portal_post_owner_name}</ListDataInfoText> */}
                      </div>
                      {/* <ListDataTime>Open ⋅ Closes 11 pm</ListDataTime> */}
                    </div>
                  </ListDataWrraper>
                );
              })}

            {/* <CommentBoxWrapper>
            <Arrow />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Image src={AuthorcommentIcon} alt="infoCirlce" />
              <ListAuthorComment>LIST AUTHOR COMMENT</ListAuthorComment>
            </div>
            <ListCommentText>
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam
              porta sem malesuada mag...{" "}
              <span style={{ color: "#2F80ED", cursor: "pointer" }}>
                Read More.
              </span>
            </ListCommentText>
          </CommentBoxWrapper> */}
          </div>
        </div>
      </CreateListItemScrollBox>
      <CreateListingsFooter
        footerBtns
        firstBtnText="Go Back"
        ScreenSwitch={ScreenSwitch}
        preScreen={preScreen}
        secondText={screenName === "Update" ? "Update" : "Post"}
        loader={loader}
      />
    </ListDetailsScreen>
  );
};

export default ProductAndCommentInfo;
