import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import DashBoardButton from "@/components/button/DashBoardButton";
import CommentRating from "@/components/dashboard/CommentRating";
import { LocalCuisineMenuItem } from "@/app/utils/data";
import RatingMenu from "@/components/dashboard/RatingMenu";
import CommonButton from "@/components/button/CommonButton";
import Instance from "@/app/utils/Instance";
import Ratings from "@/components/ratings";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
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
  phone,
} from "@/app/utils/ImagePath";
import { setEngine } from "crypto";
import { topAttractionMapping } from "@/app/utils/mappingFun";
import { convertTo12HourTime, relatedTypesFun, reservationTypesFun } from "@/app/utils/commanFun";
import { Rate, Spin, Tooltip } from "antd";
import ImageCarousel from "@/components/carousel/imageCarousel";
import { isOpen } from "@/app/utils/commanFunCom";
import Link from "next/link";
import toast from "react-hot-toast";

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
  margin-bottom: 5px;

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
  height: 200px;
  width:100%;
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
const DatesWrapperTextGoogle = styled.div`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  margin: 16px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px;
`;

const WeekTimeArrange = styled.div`
  display: flex;
  gap:10px;
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

const DeliveryContainer = styled.div`
display: flex;
gap:5px;
padding: 5px 0px;
font-size: 16px;
margin-top:5px;
`;

const WebsiteLink = styled(Link)`
&:hover {
  text-decoration: underline;
  text-decoration-color: lightblue;
  color: lightblue;
}
`;
const MainImage = styled(Image)`
width: 120px !important;
height: 64px !important;
border-radius: 6px;
`;



const ModalContent: React.FC<ModalProps> = ({
  onClose,
  reservationModal,
  dataImage,
  data,
  reservationMenu = true,
}) => {
  const [showApiData, setShowApiData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 1500);
    return () => clearTimeout(timer)
  }, [showApiData?.types, data?.acf?.type])

  useEffect(() => {
    setLoading(false)
    if (Object.keys(data).length) {
      topAttractionMapping(data).then((res: any) => {
        setShowApiData(res)
        console.log("respoinse", res)
        if (res?.reviews) {
          setReviewData(res?.reviews);
        }
      })
    }
  }, [data?._id, Object.keys(showApiData).length, reviewData.length, data?.name])

  const copylink = (copy: any) => {
    navigator.clipboard.writeText(copy)
    toast.success("copy")
  }

  const ResturantDetailData = [
    {
      name: data?.data_type === "google" ? isOpen(showApiData?.current_opening_hours?.periods) : "Closed 11:00 pm",
      image: clock,
      nameValue: data?.data_type === "google" ? showApiData?.current_opening_hours?.periods : "",
    },
    {
      name: data?.data_type === "google" ? <WebsiteLink href={showApiData?.website ? showApiData?.website : ""} target="_blank" >{showApiData?.website}</WebsiteLink> : <WebsiteLink href={data?.acf?.website} target="_blank" >{data?.acf?.website}</WebsiteLink>,
      image: globes,
      nameValue: data?.data_type === "google" ? showApiData?.website : data?.acf?.website,
    },
    {
      name: data?.data_type === "google" ? <Tooltip title={"Copy contact number"} >
        <span onClick={() => copylink(showApiData?.formatted_phone_number)}>{showApiData?.formatted_phone_number}</span>
      </Tooltip> : data?.acf?.telephone_number?.formatted,
      image: phoneBlack,
      nameValue: data?.data_type === "google" ? showApiData?.formatted_phone_number : data?.acf?.telephone_number?.formatted,
    },
    {
      name: data?.data_type === "google" ? <Tooltip title={"Copy international number"} >
        <span onClick={() => copylink(showApiData?.international_phone_number)}>{showApiData?.international_phone_number}</span>
      </Tooltip> : data?.acf?.telephone_number?.formatted,
      image: phoneBlack,
      nameValue: data?.data_type === "google" ? showApiData?.international_phone_number : data?.acf?.telephone_number?.formatted,
    },
    {
      name: data?.data_type === "google" ? <Tooltip title={"Copy address"} >
        <span onClick={() => copylink(showApiData?.formatted_address)}>{showApiData?.formatted_address}</span>
      </Tooltip> : `${data?.acf?.address?.place_name}, ${data?.acf?.address?.address_line_1}, ${data?.acf?.address?.address_line_2}`,
      image: locationDot,
      nameValue: data?.data_type === "google" ? showApiData?.formatted_address : `${data?.acf?.address?.place_name}, ${data?.acf?.address?.address_line_1}, ${data?.acf?.address?.address_line_2}`,
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
  const [reviewShowToggle, setReviewShowToggle] = useState(false);


  useEffect(() => {
    const getReviewData = async () => {
      setloader(true);
      if (data._id) {
        try {
          const ReviewData = await Instance.get(`review/${data?._id}`);
          // setReviewData(ReviewData?.data);
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
      placeId: data?._id,
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
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  const formattedValues = () => {
    const typeData = data?.data_type === "google" ? showApiData?.types : data?.acf?.type
    if (Array.isArray(typeData)) {
      return data?.data_type === "google" ? showApiData?.types.map((item: any) => item.replaceAll("_", " ")).join(" | ") : data?.acf?.type.map((item: any) => item?.label).join(" | ");
    } else {
      return data?.data_type === "google" ? showApiData?.types : data?.acf?.type?.label;
    }
  };

  const strippedContent = data?.acf?.short_description
    .replace(/<p[^>]*>/g, "")
    .replace(/<\/p>/g, "");

  const daysOfWeek = Object.keys(data?.acf?.opening_hours ?? {});
  const daysOfWeekTiming = Object.values(data?.acf?.opening_hours ?? {}) as {
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

  const opningDate = useCallback((val: any) => {

    return (val.map((item: any) => {
      const [day, time] = item.split(': ');
      return { day, time };
    }))

  }, [])


  return (
    <>
      {
        !loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '500px' }}>
            <Spin tip="Loading" size="large" />
          </div> :
          <Container>
            <p style={{ fontSize: "16px", textTransform: 'capitalize', paddingLeft: '24px', paddingRight: '24px', fontWeight: '700' }}> {formattedValues()} </p>
            <ResturatContainer>
              <ResturatWrapper>
                {/* <p style={{ fontSize: 16 }}>|</p> */}
                <OpenRestText>{showApiData?.current_opening_hours?.open_now ? "OPEN" : "CLOSE"}</OpenRestText>
              </ResturatWrapper>
              <Ratings
                defaultValue={data?.rating}
                giveRating={giveRating}
                ratingvalue={data?.rating}
              />

            </ResturatContainer>
            <ItemImageContainer>
              {
                showApiData?.photos &&
                <ImageCarousel imageArr={showApiData?.photos} imageUrl={dataImage} />
              }
            </ItemImageContainer>
            <ResturantDetailsContainer>
              {ResturantDetailData.map((item, index) => {
                return (
                  item?.nameValue &&
                  <ResturantDetailsWrapper key={index}>
                    {" "}
                    <Image
                      style={{ cursor: "pointer" }}
                      src={item?.image}
                      alt="Logo Outline"
                    />
                    {" "}
                    {index == 1 ? (
                      <RestDetailTitleWebsite href={item?.name} target="_blank">
                        {item?.name}
                      </RestDetailTitleWebsite>
                    ) : (
                      <RestDetailTitle>{item?.name}</RestDetailTitle>
                    )}
                  </ResturantDetailsWrapper>
                )
              })}
              <ViewDirection onClick={() => reservationModal("DirectionModal")}>
                View Directions
              </ViewDirection>
              {
                relatedTypesFun(showApiData?.types).length ?
                  <>
                    <hr />
                    <DeliveryContainer>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {
                          showApiData?.dine_in ? <IoMdCheckmark style={{ color: 'green', fontSize: '19px' }} /> : <RxCross2 style={{ color: 'red', fontSize: '19px' }} />
                        }
                        <p>Dine-in</p>
                      </div>
                      <div className="">.</div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {
                          showApiData?.delevery ? <IoMdCheckmark style={{ color: 'green', fontSize: '19px' }} /> : <RxCross2 style={{ color: 'red', fontSize: '19px' }} />
                        }
                        <p>Delivery</p>
                      </div>

                    </DeliveryContainer>

                    <hr />
                    <DeliveryContainer>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {
                          showApiData?.serves_wine ? <IoMdCheckmark style={{ color: 'green', fontSize: '19px' }} /> : <RxCross2 style={{ color: 'red', fontSize: '19px' }} />
                        }
                        <p>Wine</p>
                      </div>
                      <div className="">.</div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {
                          showApiData?.serves_beer ? <IoMdCheckmark style={{ color: 'green', fontSize: '19px' }} /> : <RxCross2 style={{ color: 'red', fontSize: '19px' }} />
                        }
                        <p>Beer</p>
                      </div>

                    </DeliveryContainer>

                    <hr />
                  </>
                  : ''
              }

            </ResturantDetailsContainer>
            <RestDetailText>{strippedContent}</RestDetailText>
            {/* <MenuButtonContainer>
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
        </MenuButtonContainer> */}
            <ReviewContainer>
              <ReviewWraaper>
                <Image src={comment} alt="icon" />
                <OpeningTitle>Reviews</OpeningTitle>
              </ReviewWraaper>
              {reviewData.length && reviewData.map((item: any, index: any) => (
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
                        text={showEdit === index ? (loader ? "Loading..." : "Submit Review") : "Submit Review"}
                        isOpen={fetchDataAsync}
                      />
                    </div>
                  ) : (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div>
                          <img src={item?.profile_photo_url} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                        </div>
                        <p style={{ fontSize: '16px' }}>{item?.author_name}</p>
                      </div>
                      <div className="">

                        <Rate disabled allowHalf defaultValue={item?.rating} /> &nbsp; <span style={{ fontSize: '13px' }}>{item?.relative_time_description}</span>
                      </div>
                      <div style={{ width: '100%', fontSize: '14px' }}>
                        <p>{item?.text}</p>
                      </div>
                      <hr />
                    </div>
                  )

                  }
                </div>
              ))}

              {/* <ReviewWraaper
            style={{ marginBottom: "8px", cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            <Image src={plus} alt="icon" />
            <AddReview>Add Review</AddReview>
          </ReviewWraaper> */}

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
                  <CommonButton text={loader ? "Loading..." : "Submit Review"} isOpen={fetchDataAsync} />
                </div>
              )}
            </ReviewContainer>
            <DatesContainer>
              <OpeningTitle>Opening</OpeningTitle>
              {
                data?.data_type === "google" ?
                  <DatesWrapperTextGoogle>
                    {showApiData?.current_opening_hours?.weekday_text &&
                      opningDate(showApiData?.current_opening_hours?.weekday_text).map((item: any, index: any) => (
                        <p key={index} style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <p style={{ width: '90px' }}>
                            {item?.day}
                          </p>
                          <p>
                            {item?.time}
                            {/* {index !== showApiData?.current_opening_hours?.weekday_text.length - 1 && ","}{" "} */}
                          </p>
                        </p>
                      ))}
                  </DatesWrapperTextGoogle>
                  :
                  <DatesWrapperText>
                    {data?.acf?.seasonality &&
                      data?.acf?.seasonality.map((item: any, index: any) => (
                        <p key={index}>
                          {item?.label}
                          {index !== data?.acf?.seasonality.length - 1 && ","}{" "}
                        </p>
                      ))}
                  </DatesWrapperText>
              }

              {
                data?.data_type === "google" ?

                  <WeekTimeArrange>
                    <p>Time:</p>
                    <p>
                      {convertTo12HourTime(showApiData?.current_opening_hours?.periods[0].open.time)} - {convertTo12HourTime(showApiData?.current_opening_hours?.periods[0].close.time)}
                    </p>
                  </WeekTimeArrange>
                  :
                  daysOfWeek.map((item, index) => (
                    <WeekTimeArrange key={index}>
                      <p>{item}:</p>
                      <p>
                        {daysOfWeekTiming[index].opens} - {daysOfWeekTiming[index].closes}
                      </p>
                    </WeekTimeArrange>
                  ))
              }
              {/* 
        {daysOfWeek.map((item, index) => (
          <WeekTimeArrange key={index}>
            <p>{item}:</p>
            <p>
              {daysOfWeekTiming[index].opens} - {daysOfWeekTiming[index].closes}
            </p>
          </WeekTimeArrange>
        ))} */}
            </DatesContainer>

            {reservationMenu ? (
              <ButtonContainer>
                {
                  reservationTypesFun(showApiData?.types).length ?
                    <CommonButton
                      text="Reservation"
                      image={calenderWhiteImg}
                      imageStyle={14}
                      isOpen={() => reservationModal("calenderModal")}
                    /> : ""
                }
                {
                  (showApiData?.international_phone_number || showApiData?.formatted_phone_number) ?
                    <CommonButton
                      text="Call"
                      image={phone}
                      imageStyle={20}
                      isOpen={() => reservationModal("Call")}
                      linkNum={showApiData?.international_phone_number || showApiData?.formatted_phone_number}
                    /> : ""
                }
              </ButtonContainer>
            ) : ""}
          </Container>

      }

    </>
  );
};

export default ModalContent;
