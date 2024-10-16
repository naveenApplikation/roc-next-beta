import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { thumbsDown, thumbsUp, yellowStar } from "@/app/utils/ImagePath";
import Ratings from "@/components/rating/ShowRating";

interface RatingProps {
  id: any;
  index: any;
  Titletext: string;
  Maintext: string;
  starRating: number;
  like: number;
  disLike: number;
  handleEdit: any;
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
  align-items: center;
  gap: 8px;
`;

const RatingValue = styled.div`
  color: var(--MAIN, #2F80ED);
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
`

const CommentRating: React.FC<RatingProps> = ({
  id,
  index,
  Titletext,
  Maintext,
  starRating,
  like,
  disLike,
  handleEdit,
}) => {
  return (
    <Container>
      <TitleContainer>
        <RatingContainer>
          <Ratings defaultValue={starRating} />
          <p>{starRating}</p>
        </RatingContainer>
        <TitleText>{Titletext}</TitleText>
      </TitleContainer>
      <MainText>{Maintext}</MainText>
      <LikeDislikeContainer>
        <LikeDislikeWrapper>
          <Image src={thumbsUp} alt="icon" />
          <RatingValue>{like}</RatingValue>
        </LikeDislikeWrapper>
        <LikeDislikeWrapper>
          <Image src={thumbsDown} alt="icon" />
          <RatingValue>{disLike}</RatingValue>
          <RatingValue onClick={()=>handleEdit(index, starRating, Maintext, id)}>{"edit"}</RatingValue>
        </LikeDislikeWrapper>
      </LikeDislikeContainer>
    </Container>
  );
};

export default CommentRating;
