"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import DragIcon from "../../../assets/images/createListImages/dragIcon.png";
import { commentstar } from "@/app/utils/ImagePath";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import CreateListItems from "./CreateList Components/CreateListItems";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import CurrencySign from "../../../assets/images/createListImages/currencySign.png";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { sideWidth } from "@/app/utils/date";

interface DragInOrderProps {
  ScreenSwitch?: Function;
  preScreen?: Function;
  homePage: any;
  selectedItemIds: any;
  setDragData?: any;
  selectedData?: any;
  setSelectedData?: any;
}

const DragInOrderScreen = styled.div`
  width: ${sideWidth};
  background-color: #f2f3f3;
  background-blend-mode: normal, luminosity;
  box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const DragInOrderContent = styled.div`
  width: 100%;
  height: auto;
  padding: 40px 0px 0px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
`;

const DragInOrderTitle = styled.div`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DragInOrderListScrollBox = styled.div`
  /* height: 450px; */
  overflow-y: scroll;
  scrollbar-width: none;
`;

const ListItemScrollBox = styled.div`
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
  padding: 9px 0px;
  position: relative;
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
const ListDataInfoText = styled.p`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`;
const DragBtnBox = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  cursor: pointer;
`;

// Dummy data for your list
// const newFilter  = [
//     { id: 'item 1', name: "Chocadyllic", placeName1: "St Helier", itemPlaceLogo: "StHelierLogo", status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
//     { id: 'item 2', name: "Kalimukti Yoga", placeName1: "From £5", itemPlaceLogo: "StHelierLogo", status1: "Outdoore", timing2: "11 pm", unSelectedBtn: false },
//     { id: 'item 3', name: "Radisson Blu Waterfront Hotel", placeName1: "From £265/night", itemPlaceLogo: "StHelierLogo", status1: "St Helier", timing2: "11 pm", unSelectedBtn: false },
//     { id: 'item 4', name: "abrdn", placeName1: "Investment Managers", itemPlaceLogo: "StHelierLogo", status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
//   ];

const DragInOrder: React.FC<DragInOrderProps> = ({
  ScreenSwitch,
  preScreen,
  homePage,
  setDragData,
  selectedData,
  setSelectedData,
}) => {
  const [items, setItems] = useState(selectedData);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    setSelectedData(newItems);
  };

  console.log("drag list", items);
  return (
    <DragInOrderScreen>
      <ListItemScrollBox>
        <CreateListingsHeader homePage={homePage} />
        <DragInOrderContent>
          <DragInOrderTitle>Drag in order</DragInOrderTitle>
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      // background: 'lightgray',
                      // padding: '20px',
                      borderRadius: "5px",
                    }}
                  >
                    {items.length
                      ? items.map((item: any, index: any) => {
                          const image = item.photoUrl ? item.photoUrl : "";
                          console.log("item drag", image);
                          return (
                            <Draggable
                              key={item.place_id}
                              draggableId={item.place_id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      padding: "10px",
                                      // margin: '10px 0',
                                      background: snapshot.isDragging
                                        ? "lightblue"
                                        : "none",
                                      boxShadow: snapshot.isDragging
                                        ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                                        : "none",
                                      borderRadius: "5px",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {/* {item.content} */}

                                    {/* <CreateListItems
                                                                dragBtn
                                                                dragUi = "drag"
                                                                listItemName={item?.acf?.title}
                                                                secondLineDetails1
                                                                itemPlaceLogo={item?.itemPlaceLogo}
                                                                placeName1={item?.acf?.portal_post_owner_name}
                                                                ratedStar
                                                                ratingStarImage={RatingStarImage}
                                                                starRating={item.acf.aa_rating
                                                                    ? item.acf.aa_rating.value == "No rating"
                                                                      ? ""
                                                                      : item.acf.aa_rating.value
                                                                    : ""}
                                                                thirdLineDetails1
                                                                newText
                                                                delivery
                                                                image={image}
                                                            /> */}

                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 16,
                                        width: "100%",
                                      }}
                                      key={index}
                                    >
                                      <ListDataWrraper>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 16,
                                            width: "85%",
                                          }}
                                        >
                                          <DragBtnBox>
                                            <Image
                                              style={{
                                                width: "8px",
                                                height: "16px",
                                              }}
                                              src={DragIcon}
                                              alt="dragIcon"
                                            />
                                          </DragBtnBox>
                                          <div
                                            style={{
                                              width: 80,
                                              height: 80,
                                            }}
                                          >
                                            <Image
                                              src={image}
                                              width={500}
                                              height={80}
                                              style={{
                                                borderRadius: 4,
                                                maxWidth: "100%",
                                                objectFit: "cover",
                                                minWidth: "80px",
                                              }}
                                              alt="infoCirlce"
                                            />
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              gap: 10,
                                              flexDirection: "column",
                                              maxWidth: "calc(100% - 30%)",
                                            }}
                                          >
                                            <ListDataTittleText>
                                              {item.name}
                                            </ListDataTittleText>
                                            <div
                                              style={{
                                                display: "flex",
                                                gap: 10,
                                                alignItems: "center",
                                              }}
                                            >
                                              <ListDataInfoText>
                                                {item.rating}
                                              </ListDataInfoText>
                                              <Image
                                                src={commentstar}
                                                alt="infoCirlce"
                                              />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  gap: "5px",
                                                  flexWrap: "wrap",
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </ListDataWrraper>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })
                      : ""}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </DragInOrderContent>
      </ListItemScrollBox>
      <CreateListingsFooter
        footerBtns
        firstBtnText="Select more"
        ScreenSwitch={ScreenSwitch}
        preScreen={preScreen}
        secondText={"Continue"}
      />
    </DragInOrderScreen>
  );
};

export default DragInOrder;
