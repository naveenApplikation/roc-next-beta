import React from "react";
import Image from "next/image";
import styled from "styled-components";
import DashBoardButton from "../../components/button/DashBoardButton";
import CommentRating from "../../components/dashboard/CommentRating";
import {
  EventListData,
  LocalCuisineMenuItem,
} from "@/app/dashboard/data";
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
} from "@/app/utils/ImagePath";

interface ModalProps {
  //   onClose: () => void;
  //   reservationModal: Function;
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

const MoreInfo = styled.div`
  padding: 0px 24px;
  p {
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const DatesContainer = styled.div`
  padding: 8px 16px;
  margin: 0px 24px;
  border-radius: 8px;
  background: var(--White, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
`;

const DatesWrapperText = styled.div`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const BulletPointWrapper = styled.ul`
  list-style-type: disc;
  color: black;
  padding: 0px 24px 0px 40px;

  li {
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const ModalContent: React.FC<ModalProps> = () => {
  return (
    <Container>
      <ResturatContainer>
        <ResturatWrapper>
          <p style={{ fontSize: "14px" }}>
            Family friendly | Sports | Outdoor | Spect...
          </p>
          {/* <p>|</p> */}
          {/* <OpenRestText>OPEN</OpenRestText> */}
        </ResturatWrapper>
      </ResturatContainer>
      <div style={{ height: "192px" }}></div>
      <ResturantDetailsContainer>
        {EventListData.map((item, index) => {
          return (
            <ResturantDetailsWrapper key={index}>
              {" "}
              <div style={{width:20}}>
              <Image
                style={{ cursor: "pointer",height:"auto" }}
                src={item.image}
                width={item.width}
                height={item.height}
                alt="Logo Outline"
                />{" "}
                </div>
              <RestDetailTitle style={{marginLeft:(index == 5)?5:0}}>{item.name}</RestDetailTitle>
            </ResturantDetailsWrapper>
          );
        })}
        <ViewDirection>View Directions</ViewDirection>
      </ResturantDetailsContainer>
      <RestDetailText>
        Head to Springfield Stadium and watch the Jersey Bulls, English
        football's newest and most southernly club, as they host an action
        packed exhibition of football. Jersey Bulls have been climbing the
        leagues and have been involved in a number of successful cup runs,
        including the FA Cup, FA Vase and have most recently entered the FA
        Youth Cup.
      </RestDetailText>
      <AlsoSeeText>More information</AlsoSeeText>
      <MoreInfo>
        <p>Home Fixtures:</p>
        <p>06/01 = Alton</p>
        <p>13/01 = Hamworthy Recreation</p>
        <p>20/01 = Redhill</p>
        <p>27/01 = Balham</p>
        <p>03/02 = Colliers Wood United</p>
        <p>24/02 = Camberley Town</p>
        <p>02/03 = Guildford City</p>
        <p>09/03 = Sandhurst Town</p>
        <p>16/03 = Horley Town</p>
        <p>23/03 = Farnham Town</p>
        <p>20/04 = Fleet Town</p>
      </MoreInfo>
      <AlsoSeeText>More dates</AlsoSeeText>
      <DatesContainer>
        <DatesWrapperText>
          <p>09/03/2024</p>
          <p>SATURDAY</p>
          <p>15:00</p>
        </DatesWrapperText>
        <div style={{ borderRadius: 4, background: "#F2F2F2",textAlign:"center",fontWeight:"bold"}}>
          <p style={{fontSize:17}}>9</p>
          <p style={{ background: "red",fontSize:10,color:"white",padding:"0px 5px",borderBottomLeftRadius:4,borderBottomRightRadius:4 }}>MAR</p>
        </div>
      </DatesContainer>
      <AlsoSeeText>More dates</AlsoSeeText>
      <BulletPointWrapper>
        <li>Outdoor</li>
        <li>Family friendly</li>
        <li>Couples</li>
        <li>Wheelchair access</li>
      </BulletPointWrapper>
      <AlsoSeeText>Accessibility</AlsoSeeText>
      <BulletPointWrapper>
        <li>Level access to bar</li>
        <li>Level access to dining room, cafe or restaurant</li>
        <li>Level access to main entrance</li>
        <li>Suitable for visitors with limited mobility</li>
      </BulletPointWrapper>
      <AlsoSeeText>Bus Route</AlsoSeeText>
      <BulletPointWrapper>
        <li style={{ textDecoration: "underline" }}>
          Route 23: Liberation Station - Jersey Zoo
        </li>
      </BulletPointWrapper>
      <AlsoSeeText>Opening</AlsoSeeText>
      <BulletPointWrapper>
        <li>
          January, February, March, April, July, August, September, October,
          November, December
        </li>
      </BulletPointWrapper>
    </Container>
  );
};

export default ModalContent;
