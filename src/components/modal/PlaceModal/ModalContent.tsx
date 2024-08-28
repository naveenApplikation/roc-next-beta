import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import CommonButton from "@/components/button/CommonButton";
import Ratings from "@/components/ratings";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import fallback from "../../../../assets/images/fallbackimage.png";
import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
import {
  comment,
  calenderWhiteImg,
  clock,
  globes,
  phoneBlack,
  locationDot,
  phone,
} from "@/app/utils/ImagePath";
import {
  convertTo12HourTime,
  handleCall,
  relatedTypesFun,
  reservationTypesFun,
} from "@/app/utils/commanFun";
import { Rate, Spin, Tooltip } from "antd";
import ImageCarousel from "@/components/carousel/imageCarousel";
import { getVenueStatus, isOpenHead } from "@/app/utils/commanFunCom";
import Link from "next/link";
import toast from "react-hot-toast";
import { useMyContext } from "@/app/Context/MyContext";

interface ModalProps {
  onClose: () => void;
  reservationModal: Function;
  dataImage: any;
  data?: any;
  reservationMenu?: boolean;
}

const ModalContent: React.FC<ModalProps> = ({
  reservationModal,
  dataImage,
  data,
  reservationMenu = true,
}) => {
  const { setTitleNameForModel } = useMyContext();
  const [showApiData, setShowApiData] = useState<any>({});
  const [reviewData, setReviewData] = useState([]);

  const res = useSWR(`/api/event?placeId=${data?.place_id}`, fetcher);

  useEffect(() => {
    if (Object.keys(data).length) {
      if (res?.data?.name) {
        setTitleNameForModel(res.data.name);
      }

      setShowApiData(res.data);

      if (res?.data?.reviews) {
        setReviewData(res?.data?.reviews);
      }
    } else {
      setShowApiData(data);
    }
  }, [data, res]);

  const copylink = (copy: any) => {
    navigator.clipboard.writeText(copy);
    toast.success("copy");
  };

  const ResturantDetailData = [
    {
      name:
        data?.data_type === "google"
          ? getVenueStatus(
              showApiData?.current_opening_hours,
              showApiData?.name
            )
          : "",
      image: clock,
      nameValue:
        data?.data_type === "google"
          ? showApiData?.current_opening_hours?.periods
          : "",
    },
    {
      name:
        data?.data_type === "google" ? (
          <WebsiteLink
            href={showApiData?.website ? showApiData?.website : ""}
            target="_blank">
            {showApiData?.website}
          </WebsiteLink>
        ) : (
          <WebsiteLink href={data?.acf?.website} target="_blank">
            {data?.acf?.website}
          </WebsiteLink>
        ),
      image: globes,
      nameValue:
        data?.data_type === "google"
          ? showApiData?.website
          : data?.acf?.website,
    },
    {
      name:
        data?.data_type === "google" ? (
          showApiData?.international_phone_number ? (
            <Tooltip title={"Copy international number"}>
              <span
                onClick={() =>
                  copylink(showApiData?.international_phone_number)
                }>
                <Link href={`tel:${showApiData?.international_phone_number}`}>
                  {showApiData?.international_phone_number}
                </Link>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={"Copy contact number"}>
              <span
                onClick={() => copylink(showApiData?.formatted_phone_number)}>
                {showApiData?.formatted_phone_number}
              </span>
            </Tooltip>
          )
        ) : (
          data?.acf?.telephone_number?.formatted
        ),
      image: phoneBlack,
      nameValue:
        data?.data_type === "google"
          ? showApiData?.international_phone_number
            ? showApiData?.international_phone_number
            : showApiData?.formatted_phone_number
          : data?.acf?.telephone_number?.formatted,
    },
    {
      name:
        data?.data_type === "google" ? (
          <Tooltip title={"Copy address"}>
            <span onClick={() => copylink(showApiData?.formatted_address)}>
              {showApiData?.formatted_address}
            </span>
          </Tooltip>
        ) : (
          `${data?.acf?.address?.place_name}, ${data?.acf?.address?.address_line_1}, ${data?.acf?.address?.address_line_2}`
        ),
      image: locationDot,
      nameValue:
        data?.data_type === "google"
          ? showApiData?.formatted_address
          : `${data?.acf?.address?.place_name}, ${data?.acf?.address?.address_line_1}, ${data?.acf?.address?.address_line_2}`,
    },
  ];

  const formattedValues = () => {
    const typeData =
      data?.data_type === "google" ? showApiData?.types : data?.acf?.type;
    if (Array.isArray(typeData)) {
      return data?.data_type === "google"
        ? showApiData?.types
            .map((item: any) => item.replaceAll("_", " "))
            .join(" | ")
        : data?.acf?.type.map((item: any) => item?.label).join(" | ");
    } else {
      return data?.data_type === "google"
        ? showApiData?.types
        : data?.acf?.type?.label;
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

  const opningDate = useCallback((val: any) => {
    return val.map((item: any) => {
      const [day, time] = item.split(": ");
      return { day, time };
    });
  }, []);

  return (
    <>
      {res.isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "500px",
          }}>
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <Container>
          <p
            style={{
              fontSize: "16px",
              textTransform: "capitalize",
              paddingLeft: "24px",
              paddingRight: "24px",
              fontWeight: "700",
            }}>
            {" "}
            {formattedValues()}{" "}
          </p>
          <ResturatContainer>
            {showApiData?.current_opening_hours?.periods.length && (
              <ResturatWrapper>
                {isOpenHead(showApiData?.current_opening_hours)}
              </ResturatWrapper>
            )}
            <Ratings defaultValue={data?.rating} ratingvalue={data?.rating} />
          </ResturatContainer>
          <ItemImageContainer>
            {showApiData?.photos ? (
              <ImageCarousel
                imageArr={showApiData?.photoUrl}
                imageUrl={dataImage}
              />
            ) : (
              <Image
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
                src={fallback}
                alt="Logo Outline"
              />
            )}
          </ItemImageContainer>
          <ResturantDetailsContainer>
            {ResturantDetailData.map((item, index) => {
              return (
                item?.nameValue && (
                  <ResturantDetailsWrapper key={index}>
                    {" "}
                    <Image
                      style={{ cursor: "pointer" }}
                      src={item?.image}
                      alt="Logo Outline"
                    />{" "}
                    {index == 1 ? (
                      <RestDetailTitleWebsite href={item?.name} target="_blank">
                        {item?.name}
                      </RestDetailTitleWebsite>
                    ) : (
                      <RestDetailTitle>{item?.name}</RestDetailTitle>
                    )}
                  </ResturantDetailsWrapper>
                )
              );
            })}
            <ViewDirection onClick={() => reservationModal("DirectionModal")}>
              View Directions
            </ViewDirection>
            {relatedTypesFun(showApiData?.types).length ? (
              <>
                {showApiData?.delivery === undefined &&
                showApiData?.dine_in === undefined ? (
                  ""
                ) : (
                  <>
                    <hr />
                    <DeliveryContainer>
                      {showApiData?.dine_in === undefined ? (
                        ""
                      ) : (
                        <div style={{ display: "flex", gap: "5px" }}>
                          {showApiData?.dine_in ? (
                            <IoMdCheckmark
                              style={{ color: "green", fontSize: "19px" }}
                            />
                          ) : (
                            <RxCross2
                              style={{ color: "red", fontSize: "19px" }}
                            />
                          )}
                          <p>Dine-in</p>
                        </div>
                      )}

                      {showApiData?.delivery !== undefined &&
                      showApiData?.dine_in !== undefined ? (
                        <div className="">.</div>
                      ) : (
                        ""
                      )}

                      {showApiData?.delivery === undefined ? (
                        ""
                      ) : (
                        <div style={{ display: "flex", gap: "5px" }}>
                          {showApiData?.delivery ? (
                            <IoMdCheckmark
                              style={{ color: "green", fontSize: "19px" }}
                            />
                          ) : (
                            <RxCross2
                              style={{ color: "red", fontSize: "19px" }}
                            />
                          )}
                          <p>Delivery</p>
                        </div>
                      )}
                    </DeliveryContainer>
                  </>
                )}

                {showApiData?.serves_wine === undefined &&
                showApiData?.serves_beer === undefined ? (
                  ""
                ) : (
                  <>
                    <hr />
                    <DeliveryContainer>
                      {showApiData?.serves_wine === undefined ? (
                        ""
                      ) : (
                        <div style={{ display: "flex", gap: "5px" }}>
                          {showApiData?.serves_wine ? (
                            <IoMdCheckmark
                              style={{ color: "green", fontSize: "19px" }}
                            />
                          ) : (
                            <RxCross2
                              style={{ color: "red", fontSize: "19px" }}
                            />
                          )}
                          <p>Wine</p>
                        </div>
                      )}
                      {showApiData?.serves_wine !== undefined &&
                      showApiData?.serves_beer !== undefined ? (
                        <div className="">.</div>
                      ) : (
                        ""
                      )}
                      {showApiData?.serves_beer === undefined ? (
                        ""
                      ) : (
                        <div style={{ display: "flex", gap: "5px" }}>
                          {showApiData?.serves_beer ? (
                            <IoMdCheckmark
                              style={{ color: "green", fontSize: "19px" }}
                            />
                          ) : (
                            <RxCross2
                              style={{ color: "red", fontSize: "19px" }}
                            />
                          )}
                          <p>Beer</p>
                        </div>
                      )}
                    </DeliveryContainer>
                  </>
                )}

                <hr />
              </>
            ) : (
              ""
            )}
          </ResturantDetailsContainer>
          <RestDetailText>{strippedContent}</RestDetailText>
          {reviewData.length >= 1 && (
            <ReviewContainer>
              <ReviewWraaper>
                <Image src={comment} alt="icon" />
                <OpeningTitle>Reviews</OpeningTitle>
              </ReviewWraaper>
              {reviewData.map((item: any, index: any) => (
                <div
                  key={index}
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div>
                      {item.profile_photo_url ? (
                        <Image
                          src={item.profile_photo_url}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          width={30}
                          height={30}
                          alt=""
                        />
                      ) : (
                        <Image
                          src={fallback}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          width={30}
                          height={30}
                          alt=""
                        />
                      )}
                    </div>
                    <p style={{ fontSize: "16px" }}>{item?.author_name}</p>
                  </div>
                  <div className="">
                    <Rate disabled allowHalf defaultValue={item?.rating} />{" "}
                    &nbsp;{" "}
                    <span style={{ fontSize: "13px" }}>
                      {item?.relative_time_description}
                    </span>
                  </div>
                  <div style={{ width: "100%", fontSize: "14px" }}>
                    <p>{item?.text}</p>
                  </div>
                  <hr />
                </div>
              ))}
            </ReviewContainer>
          )}
          <DatesContainer>
            <OpeningTitle>Opening</OpeningTitle>
            {data?.data_type === "google" ? (
              <DatesWrapperTextGoogle>
                {showApiData?.current_opening_hours?.weekday_text &&
                  opningDate(
                    showApiData?.current_opening_hours?.weekday_text
                  ).map((item: any, index: any) => (
                    <p
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}>
                      <p>{item?.day}</p>
                      <p>{item?.time}</p>
                    </p>
                  ))}
              </DatesWrapperTextGoogle>
            ) : (
              <DatesWrapperText>
                {data?.acf?.seasonality &&
                  data?.acf?.seasonality.map((item: any, index: any) => (
                    <p key={index}>
                      {item?.label}
                      {index !== data?.acf?.seasonality.length - 1 && ","}{" "}
                    </p>
                  ))}
              </DatesWrapperText>
            )}

            {data?.data_type === "google" ? (
              <WeekTimeArrange>
                <p>Time:</p>
                <p>
                  {convertTo12HourTime(
                    showApiData?.current_opening_hours?.periods[0].open?.time
                  )}{" "}
                  -{" "}
                  {convertTo12HourTime(
                    showApiData?.current_opening_hours?.periods[0].close?.time
                  )}
                </p>
              </WeekTimeArrange>
            ) : (
              daysOfWeek.map((item, index) => (
                <WeekTimeArrange key={index}>
                  <p>{item}:</p>
                  <p>
                    {daysOfWeekTiming[index].opens} -{" "}
                    {daysOfWeekTiming[index].closes}
                  </p>
                </WeekTimeArrange>
              ))
            )}
          </DatesContainer>
          {reservationMenu ? (
            <ButtonContainer>
              {reservationTypesFun(showApiData?.types).length ? (
                <CommonButton
                  text="Reservation"
                  image={calenderWhiteImg}
                  imageStyle={14}
                  isOpen={() => reservationModal("calenderModal")}
                />
              ) : (
                ""
              )}
              {showApiData?.international_phone_number ||
              showApiData?.formatted_phone_number ? (
                <CommonButton
                  text="Call"
                  image={phone}
                  imageStyle={20}
                  isOpen={() =>
                    handleCall(
                      showApiData?.international_phone_number ||
                        showApiData?.formatted_phone_number
                    )
                  }
                  linkNum={
                    showApiData?.international_phone_number ||
                    showApiData?.formatted_phone_number
                  }
                />
              ) : (
                ""
              )}
            </ButtonContainer>
          ) : (
            ""
          )}
        </Container>
      )}
    </>
  );
};

export default ModalContent;

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

const ItemImageContainer = styled.div`
  padding: 0px 24px;
  height: 200px;
  width: 100%;
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
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap;
  gap: 3px; */

  p {
    flex: 1;
  }
`;

const WeekTimeArrange = styled.div`
  display: flex;
  align-items: center;

  p {
    color: var(--BODY, #000);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    text-transform: capitalize;
    flex: 1;
  }
`;

const DeliveryContainer = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px 0px;
  font-size: 16px;
  margin-top: 5px;
`;

const WebsiteLink = styled(Link)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: lightblue;
    color: lightblue;
  }
`;
