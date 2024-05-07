import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { phoneBlack } from "@/app/utils/ImagePath";

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
  margin: 0px 24px;
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
  }
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

const TouristContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid black;
  margin: 0px 24px;
  padding-bottom: 9px;
`;

const TouristTitle = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TouristText = styled.p`
  color: var(--BODY, #000);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.13px;
  margin-left: 6px;
`;

const ActivitiesModal: React.FC<ModalProps> = ({
  dataImage,
  reservationModal,
  data,
}) => {
  const WeekDays = [
    "Monday:",
    "Tuesday:",
    "Wednesday:",
    "Thursday:",
    "Friday:",
    "Saturday:",
    "Sunday:",
  ];

  const ActivitiesListData = [
    {
      name: "March - October",
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fcalendar.png?alt=media&token=4dcb085b-44bc-4182-8893-27dda5f0325f",
      width: 14,
      height: 24,
    },
    {
      name: "Today: 09:00 - 18:00",
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fclock.png?alt=media&token=5f80c9da-b46f-4c37-8018-db55c0cfd72e",
      width: 16,
      height: 24,
    },
    {
      name: `£ ${data.acf?.price_from}`,
      image:
        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fgbp.png?alt=media&token=30f60889-d511-46d9-a8ce-30ef112929e8",
      width: 10,
      height: 24,
    },
    {
      name: data.acf?.telephone_number.formatted,
      image: phoneBlack,
      width: 12,
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
      name: (data.acf?.address.place_name ||  data.acf?.address.address_line_1 || data.acf?.address.address_line_2) ? `${data.acf?.address.place_name}, ${data.acf?.address.address_line_1}, ${data.acf?.address.address_line_2}` : "" ,
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

  const daysOfWeek = Object.keys(data.acf?.opening_hours ?? {});
  const daysOfWeekTiming = Object.values(data.acf?.opening_hours ?? {}) as {
    opens: string;
    closes: string;
  }[];

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
        {ActivitiesListData.map((item, index) => {
          return (
            item.name &&
            <ResturantDetailsWrapper key={index}>
              {" "}
              <div style={{ width: 20 }}>
                <Image
                  style={{
                    cursor: "pointer",
                    height: "auto",
                    width: index === 3 ? "auto" : "revert-layer",
                  }}
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="Logo Outline"
                />{" "}
              </div>
              {index == 5 ? (
                <RestDetailTitleWebsite href={item?.name} target="_blank">
                  {item?.name}
                </RestDetailTitleWebsite>
              ) : (
                <RestDetailTitle>{item.name}</RestDetailTitle>
              )}
              {index == 1 && (
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
      <AlsoSeeText>Tours & activities available</AlsoSeeText>
      {WeekDays.map((item, index) => (
        <TouristContainer key={index}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2F%23Image.png?alt=media&token=a48f741c-748f-4378-bc6c-82f727f01563"
            alt="Logo down"
            width={80}
            height={80}
            style={{ borderRadius: 4 }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <TouristTitle>South Coast Seafari</TouristTitle>
            <div style={{ display: "flex" }}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fgbp.png?alt=media&token=30f60889-d511-46d9-a8ce-30ef112929e8"
                alt="Logo down"
                width={9}
                height={13}
              />
              <TouristText style={{ marginLeft: 10 }}>
                May 11 2024 ‐ Jun 03 2024
              </TouristText>
            </div>
            <div style={{ display: "flex" }}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fcalendar.png?alt=media&token=4dcb085b-44bc-4182-8893-27dda5f0325f"
                alt="Logo down"
                width={12}
                height={13}
              />
              <TouristText>34.99 - 37.99</TouristText>
            </div>
          </div>
        </TouristContainer>
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
      <DatesContainer>
        <OpeningTitle>Opening</OpeningTitle>
        <DatesWrapperText>
        {data.acf?.seasonality &&
            data.acf?.seasonality.map((item: any, index: any) => (
              <p key={index}>
                {item.label}
                {index !== data.acf?.seasonality.length - 1 && ","}{" "}
              </p>
            ))}
        </DatesWrapperText>
        {daysOfWeek.map((item, index) => (
          <WeekTimeArrange key={index}>
            <p>{item}:</p>
            <p>
              {daysOfWeekTiming[index].opens} - {daysOfWeekTiming[index].closes}
            </p>
          </WeekTimeArrange>
        ))}
      </DatesContainer>
    </Container>
  );
};

export default ActivitiesModal;
