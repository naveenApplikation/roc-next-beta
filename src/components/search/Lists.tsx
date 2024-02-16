import React from "react";
import Image from "next/image";
import ThumbsUp from "../../../assets/images/searchListPlaces/thumbs-up.png";
import styled from "styled-components";
import {PopularLists} from './Data'


const Container = styled.div`
padding-bottom: 20px;
`

const PopularListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0px;

  .view {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const PopularlistTitle = styled.div`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 0px;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Imagecontainer = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100%;
  background: #eb5757;
`;

const LikesContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: rgba(0, 0, 0, 0.48);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const Lists = () => {
  return (
    <Container>
      <PopularListContainer>
        <PopularlistTitle>Popular Lists</PopularlistTitle>
        <p className="view">View All</p>
      </PopularListContainer>
      {PopularLists.map((item,index)=>{
        return(
            <ListContainer key={index}>
            <ImageTitleContainer>
              <Imagecontainer style={{background:item.color}}>
                <Image  style={{ width: 24, height: "auto" }} src={item.image} alt="icon" />
              </Imagecontainer>
              <p>{item.name}</p>
            </ImageTitleContainer>
            <LikesContainer>
              <Image
                style={{ width: 16, height: "auto" }}
                src={ThumbsUp}
                alt="icon"
              />
              <p>{item.likes}</p>
            </LikesContainer>
          </ListContainer>
        )
      })}
     
    </Container>
  );
};

export default Lists;
