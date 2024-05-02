"use client";

import React, { useState } from "react";
import styled from "styled-components";
import CreateListingsHeader from "./CreateList Components/CreateListsHeader";
import CreateListingsFooter from "./CreateList Components/CreateListsFooter";
import CreateListItems from "./CreateList Components/CreateListItems";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import CurrencySign from "../../../assets/images/createListImages/currencySign.png";
import RatingStarImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import { utensils } from "@/app/utils/ImagePath";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DragInOrderProps {
    ScreenSwitch?: Function
    preScreen?: Function
    homePage: any
}

const DragInOrderScreen = styled.div`
    width: 580px;
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
// Dummy data for your list
const initialItems = [

    { id: 'item1', content: "Chocadyllic", placeName1: "St Helier", itemPlaceLogo: StHelierLogo, status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
    { id: 'item2', content: "Kalimukti Yoga", placeName1: "From £5", itemPlaceLogo: StHelierLogo, status1: "Outdoore", timing2: "11 pm", unSelectedBtn: false },
    { id: 'item3', content: "Radisson Blu Waterfront Hotel", placeName1: "From £265/night", itemPlaceLogo: StHelierLogo, status1: "St Helier", timing2: "11 pm", unSelectedBtn: false },
    { id: 'item4', content: "abrdn", placeName2: "Investment Managers", itemPlaceLogo: StHelierLogo, status1: "Open ⋅ Closes", timing2: "11 pm", unSelectedBtn: false },
];


const DragInOrder: React.FC<DragInOrderProps> = ({ ScreenSwitch, preScreen, homePage }) => {
    const [items, setItems] = useState(initialItems);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
        setItems(newItems);
        console.log("kllklksfsd", newItems, result)
    };
    return (
        <DragInOrderScreen>
            <ListItemScrollBox>
                <CreateListingsHeader homePage={homePage} />
                <DragInOrderContent>
                    <DragInOrderTitle>Drag in order</DragInOrderTitle>
                    {/*  DRAG AND DROP COMPONENTS  */}
                    {/* <DragInOrderListScrollBox>
                    <CreateListItems
                        dragBtn
                        listItemName="Kyomu"
                        secondLineDetails1
                        itemPlaceLogo={utensils}
                        placeName1="St Helier"
                        ratedStar
                        ratingStarImage={RatingStarImage}
                        starRating={4.7}
                        thirdLineDetails1
                        status1="Open ⋅ Closes"
                        timing2="11 pm"
                        newText
                        delivery
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="Chocadyllic"
                        secondLineDetails1
                        itemPlaceLogo={StHelierLogo}
                        placeName1="St Helier"
                        thirdLineDetails1
                        status1="Open ⋅ Closes"
                        timing2="11 pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="Kalimukti Yoga"
                        secondLineDetails1
                        itemPlaceLogo={CurrencySign}
                        placeName1="From £5"
                        thirdLineDetails2
                        status2="Outdoors"
                        timing3="11 pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="Radisson Blu Waterfront Hotel"
                        secondLineDetails1
                        itemPlaceLogo={CurrencySign}
                        placeName1="From £265/night"
                        ratedStar
                        ratingStarImage={RatingStarImage}
                        starRating={4.7}
                        thirdLineDetails2
                        status2="St Helier"
                        timing3="11 pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="abrdn"
                        marginTop="14px"
                        secondLineDetails2
                        itemPlaceLogo={false}
                        placeName2="Investment Managers"
                        timing1="11pm"
                    />
                    <CreateListItems
                        dragBtn
                        listItemName="C&M Scaffolding"
                        secondLineDetails3
                        ratingStarImage={RatingStarImage}
                        starRating={4.7}
                        thirdLineDetails2
                        status2="Competitive rates. Fast & efficient service. Scaffolding erected to CISRS standards"
                    />
                </DragInOrderListScrollBox> */}
                    <div style={{ padding: '20px' }}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{
                                            // background: 'lightgray',
                                            // padding: '20px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        {items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => {
                                                    console.log("item", item, item.id)
                                                    return (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                padding: '10px',
                                                                // margin: '10px 0',
                                                                background: snapshot.isDragging ? 'lightblue' : 'white',
                                                                boxShadow: snapshot.isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                                                                borderRadius: '5px',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            {/* {item.content} */}

                                                            <CreateListItems
                                                                dragBtn
                                                                dragUi = "drag"
                                                                listItemName={item?.content}
                                                                secondLineDetails1
                                                                itemPlaceLogo={item?.itemPlaceLogo}
                                                                placeName1="St Helier"
                                                                ratedStar
                                                                ratingStarImage={RatingStarImage}
                                                                starRating={4.7}
                                                                thirdLineDetails1
                                                                status1="Open ⋅ Closes"
                                                                timing2="11 pm"
                                                                newText
                                                                delivery
                                                            />

                                                        </div>
                                                    )
                                                }}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </DragInOrderContent>
            </ListItemScrollBox>
            <CreateListingsFooter footerBtns firstBtnText="Select more" ScreenSwitch={ScreenSwitch} preScreen={preScreen} secondText={"continue"} />
        </DragInOrderScreen>
    )
}

export default DragInOrder;
