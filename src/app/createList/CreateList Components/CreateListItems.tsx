import Image from "next/image";
import React from "react";
import styled from "styled-components";
import UnselectedBtnImg from "../../../../assets/images/createListImages/check.png";
import SelectedBtnImg from "../../../../assets/images/createListImages/plus-circle.png";
import DragIcon from "../../../../assets/images/createListImages/dragIcon.png";
import CommentRatingImage from "../../../../assets/images/modalImage/CommentRatingImage.png";
import deliveryVehicle from "../../../../assets/images/createListImages/moped.png";
import comment from "../../../../assets/images/comment.svg";

interface CreateListItemsProps {
  dragBtn?: any;
  unSelectedBtn?: any;
  selectedBtn?: any;
  commentBtn?: any;
  listItemName: string;
  itemPlaceLogo?: any;
  ratedStar?: any;
  starRating?: number;
  placeName1?: string;
  placeName2?: string;
  status1?: string;
  status2?: string;
  timing1?: string;
  timing2?: string;
  timing3?: string;
  secondLineDetails1?: any;
  secondLineDetails2?: any;
  secondLineDetails3?: any;
  thirdLineDetails1?: any;
  thirdLineDetails2?: any;
  marginTop?: string;
  ratingStarImage?: any;
  newText?: any;
  delivery?: any;
  isOpen?: any;
}

const CreateListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px 9px 0px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #d9d9d9;
  position: relative;

  /* @media screen and (max-width: 400px) {
    width: max-content;
  } */
`;

const DragBtnBox = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  cursor: pointer;
`;

const UploadImage = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  background-color: white;
  padding: 6px 8px 8px 8px;
`;

const NewText = styled.div`
  color: var(--BODY, #000);
  font-family: Inter;
  font-size: 8px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  font-style: normal;
  text-align: right;
`;

const DeliveryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 4px;
`;

const DeleiveryText = styled.div`
  color: var(--BODY, #000);
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  font-family: Inter;
  line-height: normal;
`;

const ListItemDetails = styled.div`
  width: 214px;
  display: flex;
  /* align-self: flex-start;  */
  flex-direction: row;
  justify-content: space-between;
`;

const ItemDetails = styled.div<{ marginTop?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  margin-top: ${(props) => props.marginTop || "0"};
`;

const ItemName = styled.div`
  width: max-content;
  font-family: Inter;
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TextBox1 = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextBox2 = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextBox3 = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const DeatilsText = styled.div`
  color: var(--BODY, #000);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.13px;
  margin-right: 4px;
`;

const DetailsTime = styled.div`
  color: #2b902b;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.13px;
  margin-right: 4px;
`;

const UnselectedBtn = styled.div`
  width: 48px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: var(--MAIN, #2f80ed);
  border-style: none;
  cursor: pointer;
  position: absolute;
  right: 24px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;

const SelectedBtn = styled.button`
  width: 48px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 24px;
  border-radius: 8px;
  background: var(--Green-2, #27ae60);
  border-style: none;
  cursor: pointer;
  position: absolute;
  right: 24px;

  @media screen and (max-width: 400px) {
    right: 10px;
  }
`;

const CreateListItems: React.FC<CreateListItemsProps> = ({
  dragBtn,
  unSelectedBtn,
  selectedBtn,
  commentBtn,
  listItemName,
  itemPlaceLogo,
  ratedStar,
  starRating,
  placeName1,
  placeName2,
  status1,
  status2,
  timing1,
  timing2,
  timing3,
  secondLineDetails1,
  secondLineDetails2,
  secondLineDetails3,
  thirdLineDetails1,
  thirdLineDetails2,
  marginTop,
  ratingStarImage,
  newText,
  delivery,
  isOpen,
}) => {
  return (
    <CreateListItem>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {dragBtn && (
          <DragBtnBox>
            <Image
              style={{ width: "8px", height: "16px" }}
              src={DragIcon}
              alt="dragIcon"
            />
          </DragBtnBox>
        )}
        <UploadImage>
          {newText && <NewText>NEW</NewText>}
          {delivery && (
            <DeliveryBox>
              <Image
                style={{ width: "10px", height: "8px" }}
                src={deliveryVehicle}
                alt="deliveryVehicle"
              />
              <DeleiveryText>DELIVERY</DeleiveryText>
            </DeliveryBox>
          )}
        </UploadImage>
        <ListItemDetails>
          <ItemDetails marginTop={marginTop}>
            <ItemName>{listItemName}</ItemName>
            {secondLineDetails1 && (
              <TextBox1>
                <Image
                  style={{
                    width: "11px",
                    height: "12px",
                    opacity: 0.72,
                    marginRight: "4px",
                  }}
                  src={itemPlaceLogo}
                  alt="detailImage"
                />
                <DeatilsText>{placeName1}</DeatilsText>
                {ratedStar && (
                  <RatingContainer>
                    <Image
                      style={{ width: "68px", height: "12px" }}
                      src={ratingStarImage}
                      alt="icon"
                    />
                    <p>{starRating}</p>
                  </RatingContainer>
                )}
              </TextBox1>
            )}
            {secondLineDetails2 && (
              <TextBox2>
                <DeatilsText>{placeName2}</DeatilsText>
                <DetailsTime>{timing1}</DetailsTime>
                {ratedStar && (
                  <RatingContainer>
                    <Image
                      style={{ width: "68px", height: "12px" }}
                      src={CommentRatingImage}
                      alt="icon"
                    />
                    <p>{starRating}</p>
                  </RatingContainer>
                )}
              </TextBox2>
            )}
            {secondLineDetails3 && (
              <RatingContainer>
                <Image
                  style={{ width: "68px", height: "12px" }}
                  src={CommentRatingImage}
                  alt="icon"
                />
                <p>{starRating}</p>
              </RatingContainer>
            )}
            {thirdLineDetails1 && (
              <TextBox3>
                <DetailsTime>{status1}</DetailsTime>
                <DetailsTime>{timing2}</DetailsTime>
              </TextBox3>
            )}
            {thirdLineDetails2 && (
              <TextBox2>
                <DeatilsText>{status2}</DeatilsText>
                <DetailsTime>{timing3}</DetailsTime>
              </TextBox2>
            )}
          </ItemDetails>
        </ListItemDetails>
      </div>
      {unSelectedBtn && (
        <UnselectedBtn>
          <Image
            style={{ width: "16px", height: "16px" }}
            src={UnselectedBtnImg}
            alt="UnselectedBtnImg"
          />
        </UnselectedBtn>
      )}
      {selectedBtn && (
        <SelectedBtn>
          <Image
            style={{ width: "14px", height: "16px" }}
            src={SelectedBtnImg}
            alt="SelectedBtnImg"
          />
        </SelectedBtn>
      )}
      {commentBtn && (
        <UnselectedBtn onClick={isOpen}>
          <Image
            // style={{ width: "14px", height: "16px" }}
            src={comment}
            alt="SelectedBtnImg"
          />
        </UnselectedBtn>
      )}
    </CreateListItem>
  );
};

export default CreateListItems;
