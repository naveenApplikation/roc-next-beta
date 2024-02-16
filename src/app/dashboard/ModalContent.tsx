import React from "react";
import Image from "next/image";
import CloseModal from "../../../assets/images/CloseModal.png";
import styled from "styled-components";
import ratingStar from "../../../assets/images/modalImage/ratingStar.png";
import DashBoardButton from "../../components/button/DashBoardButton";
import bookImage from "../../../assets/images/modalImage/book-open.png";
import resButtonImage from "../../../assets/images/modalImage/resButtonImage.png";
import CommentRating from "../../components/dashboard/CommentRating";
import comment from "../../../assets/images/modalImage/comment.png";
import addReview from "../../../assets/images/modalImage/plus-circle.png";
import { ResturantDetailData, LocalCuisineMenuItem } from "./data";
import RatingMenu from "../../components/dashboard/RatingMenu";
import CommonButton from "../../components/button/CommonButton";
import moped from "../../../assets/images/modalImage/moped.png";
import calendar from "../../../assets/images/modalImage/calendar.png";
import CommonInput from '../../components/CommonInput/CommonInput'

interface ModalProps {
  onClose: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ResturatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 24px;
`;

const ResturatWrapper = styled.div`
  display: flex;
  gap: 8px;
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

const AlsoSeeText = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 24px;
`;

const ModalContent: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Container>
      <ResturatContainer>
        <ResturatWrapper>
          <p>Restaurant</p>
          <p>|</p>
          <OpenRestText>OPEN</OpenRestText>
        </ResturatWrapper>
        <Image
          style={{ width: 70, height: 24, cursor: "pointer" }}
          src={ratingStar}
          alt="Logo Outline"
        />
      </ResturatContainer>
      <div style={{ height: "192px" }}></div>
      <ResturantDetailsContainer>
        {ResturantDetailData.map((item, index) => {
          return (
            <ResturantDetailsWrapper key={index}>
              {" "}
              <Image
                style={{ width: 16, height: "auto", cursor: "pointer" }}
                src={item.image}
                alt="Logo Outline"
              />{" "}
              <RestDetailTitle>{item.name}</RestDetailTitle>
            </ResturantDetailsWrapper>
          );
        })}
        <ViewDirection>View Directionss</ViewDirection>
      </ResturantDetailsContainer>
      <RestDetailText>
        Traditional french Brasserie serving breakfast, lunch and dinner in a
        stunning lively town centre setting. Al fresco seating available for
        drinks and snacks.
      </RestDetailText>
      <MenuButtonContainer>
        <DashBoardButton
          text="Special menu"
          bcColor="#E8468F"
          image={resButtonImage}
          imageStyle={91}
        />
        <DashBoardButton
          text="Normal Menu"
          bcColor="#2F80ED"
          image={bookImage}
          imageStyle={27}
        />
      </MenuButtonContainer>
      <ReviewContainer>
        <ReviewWraaper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={comment}
            alt="icon"
          />
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
          <Image
            style={{ width: "16px", height: "16px" }}
            src={addReview}
            alt="icon"
          />
          <p>Add Review</p>
        </ReviewWraaper>
      </ReviewContainer>
      <AlsoSeeText>Also see</AlsoSeeText>
      <ScrollingMenu>
        {LocalCuisineMenuItem.map((item) => {
          return (
            <RatingMenu
              title={item.menuName}
              menuImageUrl={item.image}
              containerImageUrl={true}
              MenutitleDetail={item.resturantName}
            />
          );
        })}
      </ScrollingMenu>
      <ButtonContainer>
        <CommonButton text="Reservation" image={calendar} imageStyle={14} />
        <CommonButton text="Order Online" image={moped} imageStyle={20} />
      </ButtonContainer>
    </Container>
  );
};

export default ModalContent;
