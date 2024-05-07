import { Rate } from "antd";
import React from "react";
import styled from "styled-components";

interface RatingsProps {
  // Define your props here
  defaultValue: number;
  giveRating?:any
  ratingvalue?:any
}

const Container = styled.div`
  :where(.css-dev-only-do-not-override-1k979oh).ant-rate {
    font-size: 16px;
    @media screen and (max-width: 350px) {
    font-size: 1.6rem;
    }
  }

  :where(.css-dev-only-do-not-override-1k979oh).ant-rate .ant-rate-star:not(:last-child) {
    margin-inline-end: 5px;
}
`;

const RatingValue = styled.span`
  color: var(--Grey1, #707579);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.13px;
  margin-left: 10px;

  @media screen and (max-width: 350px) {
    font-size: 1.3rem;
    }
`;

const Ratings: React.FC<RatingsProps> = ({ defaultValue,giveRating,ratingvalue }) => {

  return (
    <Container>
      <Rate
        allowHalf
        disabled
        defaultValue={defaultValue}
        value={defaultValue}
        onChange={(value) => giveRating(value)}
      />
      <RatingValue>{ratingvalue}</RatingValue>
    </Container>
  );
};

export default Ratings;
