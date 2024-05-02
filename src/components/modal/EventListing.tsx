import React from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  formatMonth,
  formatFullDate,
  formatCalenderTime,
  formatDay,
  formatDate,
} from "@/app/utils/date";

interface ModalProps {
  //   onClose: () => void;
  //   reservationModal: Function;
  dataImage: any;
  reservationModal: any;
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

const RestDetailTitleWebsite = styled.a`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  /* text-decoration: underline; */
  display: block;
  width: 100%; /* Ensures the link takes up the full width of its container */
  white-space: nowrap; /* Prevents wrapping of the link text */
  overflow: hidden; /* Hides any overflowing content */
  text-overflow: ellipsis;
`;

const ItemImageContainer = styled.div`
  padding: 0px 24px;
`;

const ImageWrraper = styled(Image)`
  border-radius: 6px;
  width: 342px;
  height: 192px;
  /* width: -webkit-fill-available !important;
  height: 192px !important; */

  @media screen and (max-width: 1130px) {
    height: auto;
    width: -webkit-fill-available;
  }
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

const DateMonthWraaper = styled.div`
  border-radius: 4px;
  background: rgb(242, 242, 242);
  text-align: center;
  font-weight: bold;
`;

const Monthstyle = styled.p`
  background: red;
  font-size: 10px;
  color: white;
  padding: 0px 5px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-transform: uppercase;
`;

const ModalContent: React.FC<ModalProps> = ({
  dataImage,
  reservationModal,
  data,
}) => {
  const EventListData = [
    {
      name: data.acf?.event_dates
        ? formatFullDate(data.acf?.event_dates[0]?.date)
        : "No events",
      // name: "ssds",
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fcalendar.png?alt=media&token=4dcb085b-44bc-4182-8893-27dda5f0325f",
      width: 14,
      height: 24,
    },
    {
      name: data.acf?.event_dates
        ? data.acf?.event_dates[0]?.start_time
        : "No events",
      // name: "sdsd",
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fclock.png?alt=media&token=5f80c9da-b46f-4c37-8018-db55c0cfd72e",
      width: 16,
      height: 24,
    },
    {
      name: `£ ${data.acf?.from_price}`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fgbp.png?alt=media&token=30f60889-d511-46d9-a8ce-30ef112929e8",
      width: 10,
      height: 24,
    },
    {
      name: data.acf?.email_address,
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fenvelope.png?alt=media&token=08ba6331-d66b-485c-b274-4d85de7f76b0",
      width: 16,
      height: 24,
    },
    {
      name: data.acf?.website,
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fglobe.png?alt=media&token=0fa8a5a4-35c8-46ae-bb83-45c00d6d7328",
      width: 16,
      height: 24,
    },
    {
      name: `${data.acf?.address.place_name}, ${data.acf?.address.address_line_1}, ${data.acf?.address.address_line_2}`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Flocation-dot.png?alt=media&token=d6ea3348-daab-4b8e-acb6-977148c16e1f",
      width: 12,
      height: 24,
    },
  ];

  const formattedValues = () => {
    if (Array.isArray(data.acf?.type)) {
      return data.acf?.type.map((item: any) => item.label).join(" | ");
    } else {
      return data.acf?.type.label;
    }
  };

  const strippedContent = data.acf?.short_description
    .replace(/<p[^>]*>/g, "")
    .replace(/<\/p>/g, "");

  const formatRoute = (routeText: any) => {
    return routeText
      .replace("<br>", ": ")
      .replace("<i>", "")
      .replace("</i>", "")
      .replace(/(\()/, "")
      .replace(/\)/, "");
  };

  return (
    <Container>
      <ResturatContainer>
        <ResturatWrapper>
          <p style={{ fontSize: "14px" }}>{formattedValues()}</p>
        </ResturatWrapper>
      </ResturatContainer>
      <ItemImageContainer>
        <ImageWrraper
          src={
            dataImage
              ? dataImage
              : "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
          }
          alt="Logo"
          width={500}
          height={80}
          style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
        />
      </ItemImageContainer>
      <ResturantDetailsContainer>
        {EventListData.map((item, index) => {
          return (
            <ResturantDetailsWrapper key={index}>
              {" "}
              <div style={{ width: 20 }}>
                <Image
                  style={{ cursor: "pointer", height: "auto" }}
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="Logo Outline"
                />{" "}
              </div>
              {index == 4 ? (
                <RestDetailTitleWebsite href={item?.name} target="_blank">
                  {item?.name}
                </RestDetailTitleWebsite>
              ) : (
                <RestDetailTitle>{item.name}</RestDetailTitle>
              )}
            </ResturantDetailsWrapper>
          );
        })}
        <ViewDirection onClick={() => reservationModal("DirectionModal")}>
          View Directions
        </ViewDirection>
      </ResturantDetailsContainer>
      <RestDetailText>{strippedContent}</RestDetailText>
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
      {data.acf?.event_dates?.map((item: any, index: any) => (
        <DatesContainer key={index}>
          <DatesWrapperText>
            <p>{formatCalenderTime(item.date)}</p>
            <p>{formatDay(item.date)}</p>
            <p>{item.start_time}</p>
          </DatesWrapperText>
          <DateMonthWraaper>
            <p style={{ fontSize: 17 }}>{formatDate(item.date)}</p>
            <Monthstyle>{formatMonth(item.date)}</Monthstyle>
          </DateMonthWraaper>
        </DatesContainer>
      ))}
      <AlsoSeeText>Key Features</AlsoSeeText>
      <BulletPointWrapper>
        {data.acf?.key_facilities.map((item: any, index: any) => (
          <li key={index}>{item.label}</li>
        ))}
      </BulletPointWrapper>
      <AlsoSeeText>Accessibility</AlsoSeeText>
      <BulletPointWrapper>
        {data.acf?.accessibility.map((item: any, index: any) => (
          <li key={index}>{item.label}</li>
        ))}
      </BulletPointWrapper>
      <AlsoSeeText>Bus Route</AlsoSeeText>
      <BulletPointWrapper>
        {data.acf?.bus_routes.map((item: any, index: any) => (
          <li key={index} style={{ textDecoration: "underline" }}>
            {formatRoute(item.label)}
          </li>
        ))}
      </BulletPointWrapper>
      <AlsoSeeText>Opening</AlsoSeeText>
      <BulletPointWrapper>
        <li>
          {data.acf?.seasonality &&
            data.acf?.seasonality.map((item: any, index: any) => (
              <p key={index}>
                {item.label}
                {index !== data.acf?.seasonality.length - 1 && ","}{" "}
              </p>
            ))}
        </li>
      </BulletPointWrapper>
    </Container>
  );
};

export default ModalContent;
