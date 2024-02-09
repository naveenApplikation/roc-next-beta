import React from "react";
import styled from "styled-components";
import Image from "next/image";
import CommentRatingImage from "../../../assets/images/modalImage/CommentRatingImage.png";
import thumbsUp from "../../../assets/images/modalImage/thumbs-up.png";
import thumbsDown from "../../../assets/images/modalImage/thumbs-down.png";

interface RatingProps {
  Titletext: string;
  Maintext: string;
  starRating: number;
  like: number;
  disLike: number;
}

const Container = styled.div`
  padding: 24px 0px;
  border-bottom: 0.5px solid #707579;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.p`
  color: #000;
  text-transform: uppercase;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.13px;
`;

const MainText = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: #707579;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.13px;
  }
`;

const LikeDislikeContainer = styled.div`
  display: flex;
  gap: 16px;
`;
const LikeDislikeWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentRating: React.FC<RatingProps> = ({
  Titletext,
  Maintext,
  starRating,
  like,
  disLike,
}) => {
  return (
    <Container>
      <TitleContainer>
        <RatingContainer>
          <Image
            style={{ width: "68px", height: "12px" }}
            src={CommentRatingImage}
            alt="icon"
          />
          <p>{starRating}</p>
        </RatingContainer>
        <TitleText>{Titletext}</TitleText>
      </TitleContainer>
      <MainText>{Maintext}</MainText>
      <LikeDislikeContainer>
        <LikeDislikeWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={thumbsUp}
            alt="icon"
          />
          <p>{like}</p>
        </LikeDislikeWrapper>
        <LikeDislikeWrapper>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={thumbsDown}
            alt="icon"
          />
          <p>{disLike}</p>
        </LikeDislikeWrapper>
      </LikeDislikeContainer>
    </Container>
  );
};

export default CommentRating;
