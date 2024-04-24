import React from "react";
import Image from "next/image";
import styled from "styled-components";
import DashBoardButton from "../../components/button/DashBoardButton";
import CommentRating from "../../components/dashboard/CommentRating";
import { LocalCuisineMenuItem } from "./data";
import RatingMenu from "../../components/dashboard/RatingMenu";
import CommonButton from "../../components/button/CommonButton";
import {
  bookOpen,
  comment,
  moped,
  plus,
  BlackStar,
  clientLogoImg,
  calenderWhiteImg,
  clock,
  globes,
  phoneBlack,
  locationDot,
} from "../utils/ImagePath";

interface ModalProps {
  onClose: () => void;
  reservationModal: Function;
  dataImage: any;
  data?: any;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ResturatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  gap: 10px;
`;

const ResturatWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const OpenRestText = styled.p`
  color: #2b902b;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const ResturantDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 24px;
`;

const ViewDirection = styled.div`
  color: #2f80ed;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-left: 24px;
  cursor: pointer;
`;

const ResturantDetailsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RestDetailTitle = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const ReviewContainer = styled.div`
  padding: 8px 16px;
  background-color: #fff;
  margin: 0px 24px;
`;

const ReviewWraaper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const RestDetailText = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  padding: 0px 24px;
`;

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemImageContainer = styled.div`
  padding: 0px 24px;

  .imageContainer {
    border-radius: 6px;
    width: -webkit-fill-available;

    @media screen and (max-width: 1130px) {
      height: auto;
    }
  }
`;

const MenuButtonContainer = styled.div`
  padding: 0px 24px;
  display: flex;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  padding: 0px 24px;
  gap: 8px;
  position: sticky;
  bottom: 0px;
`;

const DatesContainer = styled.div`
  padding: 16px 16px;
  margin: 0px 24px;
  border-radius: 8px;
  background: var(--White, #fff);
`;

const OpeningTitle = styled.p`
  color: var(--BODY, #000);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DatesWrapperText = styled.div`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  margin: 16px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

const WeekTimeArrange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    text-transform: capitalize;
  }
`;

const AlsoSeeText = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 24px;
`;

const ModalContent: React.FC<ModalProps> = ({
  onClose,
  reservationModal,
  dataImage,
  data,
}) => {

  const ResturantDetailData = [
    {
      name: "Open ⋅ Closes 11 pm",
      image: clock,
    },
    {
      name: data.link,
      image: globes,
    },
    {
      name: data.acf?.telephone_number.number,
      image: phoneBlack,
    },
    {
      name: data.acf?.map_location.address,
      image: locationDot,
    },
  ];

  const formattedValues = ()=>{
    if(Array.isArray(data.acf?.type)){
      return data.acf?.type.map((item: any) => item.label).join(" | ")
    }else{
     return data.acf?.type.label
    }
  }

  const strippedContent = data.acf?.short_description
    .replace(/<p[^>]*>/g, "")
    .replace(/<\/p>/g, "");

    const daysOfWeek = Object.keys(data.acf?.opening_hours ?? {});
    const daysOfWeekTiming = Object.values(data.acf?.opening_hours ?? {}) as { opens: string,closes:string  }[];

  return (
    <Container>
      <ResturatContainer>
        <ResturatWrapper>
          <p style={{ fontSize: "16px" }}>{formattedValues()}</p>
          <p style={{ fontSize: 16 }}>|</p>
          <OpenRestText>OPEN</OpenRestText>
        </ResturatWrapper>
        <Image
          style={{ cursor: "pointer" }}
          src={BlackStar}
          alt="Logo Outline"
        />
      </ResturatContainer>
      <ItemImageContainer>
        <Image
          src={dataImage}
          alt="Logo"
          width={342}
          height={192}
          className="imageContainer"
          // style={{ borderRadius: 6, width: "-webkit-fill-available" }}
        />
      </ItemImageContainer>
      <ResturantDetailsContainer>
        {ResturantDetailData.map((item, index) => {
          return (
            <ResturantDetailsWrapper key={index}>
              {" "}
              <Image
                style={{ cursor: "pointer" }}
                src={item.image}
                alt="Logo Outline"
              />{" "}
              <RestDetailTitle>{item.name}</RestDetailTitle>
              {index == 0 && (
                <Image
                  style={{ cursor: "pointer", height: "auto" }}
                  src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fcaret-down.png?alt=media&token=9107ac5a-d4d8-4ae8-b530-38db5abfa29d"
                  alt="Logo down"
                  width={10}
                  height={24}
                />
              )}
            </ResturantDetailsWrapper>
          );
        })}
        <ViewDirection onClick={() => reservationModal("DirectionModal")}>
          View Directions
        </ViewDirection>
      </ResturantDetailsContainer>
      <RestDetailText>{strippedContent}</RestDetailText>
      <MenuButtonContainer>
        <DashBoardButton
          text="Special menu"
          bcColor="#E8468F"
          image={clientLogoImg}
          imageStyle={91}
        />
        <DashBoardButton
          text="Normal Menu"
          bcColor="#2F80ED"
          image={bookOpen}
          imageStyle={27}
        />
      </MenuButtonContainer>
      <ReviewContainer>
        <ReviewWraaper>
          <Image src={comment} alt="icon" />
          <p>Reviews</p>
        </ReviewWraaper>
        <CommentRating
          Titletext="ELCIAS DE FREITAS"
          Maintext="Great French style restaurant right in the middle of town grab a drink and watch people go by or have a full blown meal. Try the 3 course set menu at just £18, it's the best bargain to be had in Jersey and tastes wonderful. Staff are also very friendly and attentive. More"
          starRating={4.7}
          like={24}
          disLike={7}
        />
        <CommentRating
          Titletext="Anonymous"
          Maintext="Excellent place to have a lunch or dinner. Service is at par. I have ordered sea food soup which was mind blowing and a sea bass grill. Excellent taste. Chef made sure that food is tasty. Worth the visit from UK. I’ll go again when I go to Jersey More"
          starRating={4.7}
          like={2}
          disLike={0}
        />
        <ReviewWraaper style={{ marginBottom: "8px" }}>
          <Image src={plus} alt="icon" />
          <p>Add Review</p>
        </ReviewWraaper>
      </ReviewContainer>
      <DatesContainer>
        <OpeningTitle>Opening</OpeningTitle>
        <DatesWrapperText>
          {data.acf?.seasonality && data.acf?.seasonality.map((item: any, index: any) => (
            <p key={index}>{item.label}{index !== data.acf?.seasonality.length - 1 && ','} </p>
          ))}
        </DatesWrapperText>
        {daysOfWeek.map((item, index) => (
          <WeekTimeArrange key={index}>
            <p>{item}:</p>
            <p>{(daysOfWeekTiming[index].opens)} - {(daysOfWeekTiming[index].closes)}</p>
          </WeekTimeArrange>
        ))}
      </DatesContainer>
      <AlsoSeeText>Also see</AlsoSeeText>
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                headerImage={item.headerImage}
                menuImageUrl={item.image}
                containerImageUrl={true}
                MenutitleDetail={item.resturantName}
              />
            </div>
          );
        })}
      </ScrollingMenu>
      <ButtonContainer>
        <CommonButton
          text="Reservation"
          image={calenderWhiteImg}
          imageStyle={14}
          isOpen={() => reservationModal("calenderModal")}
        />
        <CommonButton
          text="Order Online"
          image={moped}
          imageStyle={20}
          isOpen={() => reservationModal("orderOnlineModal")}
        />
      </ButtonContainer>
    </Container>
  );
};

export default ModalContent;
