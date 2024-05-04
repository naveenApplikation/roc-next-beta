import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import DashBoardButton from "@/components/button/DashBoardButton";
import CommentRating from "@/components/dashboard/CommentRating";
import { LocalCuisineMenuItem } from "@/app/utils/data";
import RatingMenu from "@/components/dashboard/RatingMenu";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import Ratings from "@/components/ratings";
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
} from "@/app/utils/ImagePath";
import { setEngine } from "crypto";

interface ModalProps {
  onClose: () => void;
  reservationModal: Function;
  dataImage: any;
  data?: any;
  reservationMenu?: boolean;
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

const TextAreaContainer = styled.textarea`
  width: 100%;
  outline: none;
  background-color: white;
  height: 160px;
  border-radius: 8px;
  padding: 8px 16px;
  resize: none;
  &::placeholder {
    color: black; /* Change the color to your desired color */
    font-size: 16px;
    font-family: Inter;
  }
`;

const AddReview = styled.p`
  color: var(--MAIN, #2f80ed);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

const ModalContent: React.FC<ModalProps> = ({
  onClose,
  reservationModal,
  dataImage,
  data,
  reservationMenu,
}) => {
  const [showApiData, setShowApiData] = useState(data);
  console.log("datadatadata" , data);
  
  const ResturantDetailData = [
    {
      name: "Open ⋅ Closes 11 pm",
      image: clock,
    },
    {
      name: data.acf?.website,
      image: globes,
    },
    {
      name: data.acf?.telephone_number.formatted,
      image: phoneBlack,
    },
    {
      name: `${data.acf?.address.place_name}, ${data.acf?.address.address_line_1}, ${data.acf?.address.address_line_2}`,
      image: locationDot,
    },
  ];

  const [showReview, setShowReview] = useState(false);
  const [showEdit, setShowEdit] = useState("");
  const [commentReview, setCommentReview] = useState("");
  const [rating, setRating] = useState("");
  const [textId, setTextId] = useState("");

  // console.log(data.reviews, "ssds");

  const giveRating = (value: any) => {
    setRating(value);
  };

  const handleButtonClick = () => {
    setShowReview(!showReview);
  };

  useEffect(() => {
    if (showReview) {
      setShowEdit("");
      setCommentReview("");
      setRating("");
    }
  }, [showReview]);

  const [loader, setloader] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [reviewShowToggle, setReviewShowToggle] = useState(false);

  const MainImage = styled(Image)`
    width: 120px !important;
    height: 64px !important;
    border-radius: 6px;
  `;

  useEffect(() => {
    const getReviewData = async () => {
      setloader(true);
      if (data._id) {
        try {
          const ReviewData = await Instance.get(`review/${data?._id}`);
          console.log(ReviewData, "sdsdsds");
          setReviewData(ReviewData.data);
          setReviewShowToggle(false);
        } catch (error: any) {
          console.log(error.message);
          setloader(false);
        } finally {
          setloader(false);
        }
      }
    };
    getReviewData();
  }, [data?._id, reviewShowToggle]);

  const fetchDataAsync = async () => {
    setloader(true);
    const param = {
      placeId: data._id,
      rating: rating,
      comment: commentReview,
    };
    const paramUpdate = {
      rating: rating,
      comment: commentReview,
    };
    try {
      const ReviewData =
        showEdit !== ""
          ? await Instance.put(`review/${textId}`, paramUpdate)
          : await Instance.post("review", param);
      setShowReview(false);
      setReviewShowToggle(true);
      setCommentReview("");
      setRating("");
      setShowEdit("");
      console.log(ReviewData, "sdsdsds");
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

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

  const daysOfWeek = Object.keys(data.acf?.opening_hours ?? {});
  const daysOfWeekTiming = Object.values(data.acf?.opening_hours ?? {}) as {
    opens: string;
    closes: string;
  }[];

  const handleEdit = (index: any, rating: any, text: any, id: any) => {
    console.log("id", id);
    setShowEdit(index);
    setCommentReview(text);
    setRating(rating);
    setTextId(id);
  };

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
        {ResturantDetailData.map((item, index) => {
          return (
            <ResturantDetailsWrapper key={index}>
              {" "}
              <Image
                style={{ cursor: "pointer" }}
                src={item.image}
                alt="Logo Outline"
              />{" "}
              {index == 1 ? (
                <RestDetailTitleWebsite href={item?.name} target="_blank">
                  {item?.name}
                </RestDetailTitleWebsite>
              ) : (
                <RestDetailTitle>{item.name}</RestDetailTitle>
              )}
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
          {/* <Image src={comment} alt="icon" /> */}
          <OpeningTitle>Reviews</OpeningTitle>
        </ReviewWraaper>
        {reviewData.map((item: any, index: any) => (
          <div key={index}>
            {showEdit === index ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 14, fontWeight: "bold" }}>Comment</p>
                <TextAreaContainer
                  rows={4}
                  cols={50}
                  placeholder="Comments"
                  value={commentReview}
                  onChange={(e) => setCommentReview(e.target.value)}
                />
                {console.log("item", item?._id) as any}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: "bold" }}>
                    Rating:
                  </span>
                  <Ratings
                    defaultValue={0}
                    giveRating={giveRating}
                    ratingvalue={rating}
                  />
                </div>
                <CommonButton
                  text={showEdit === index ? "Update Review" : "Submit Review"}
                  isOpen={fetchDataAsync}
                />
              </div>
            ) : (
              <CommentRating
                index={index}
                id={item?._id}
                Titletext="ELCIAS DE FREITAS"
                Maintext={item.comment}
                starRating={item.rating}
                like={24}
                disLike={7}
                handleEdit={handleEdit}
              />
            )}
          </div>
        ))}

        <ReviewWraaper
          style={{ marginBottom: "8px", cursor: "pointer" }}
          onClick={handleButtonClick}
        >
          <Image src={plus} alt="icon" />
          <AddReview>Add Review</AddReview>
        </ReviewWraaper>
        {showReview && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: 14, fontWeight: "bold" }}>Comment</p>
            <TextAreaContainer
              rows={4}
              cols={50}
              placeholder="Comments"
              value={commentReview}
              onChange={(e) => setCommentReview(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: "bold" }}>Rating:</span>
              <Ratings
                defaultValue={0}
                giveRating={giveRating}
                ratingvalue={rating}
              />
            </div>
            <CommonButton text="Submit Review" isOpen={fetchDataAsync} />
          </div>
        )}
      </ReviewContainer>
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
      {reservationMenu && (
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
      )}
    </Container>
  );
};

export default ModalContent;
