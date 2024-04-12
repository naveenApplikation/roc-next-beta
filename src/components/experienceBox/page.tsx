import { EnjoyShineMenuItem } from "@/app/dashboard/data";
import { blank, currency } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";
import CommonButton from "@/components/button/CommonButton";
import FilterSection from "@/components/filterSection";

interface ExperienceBoxProps {
  urlData?: any;
  urlTitle?: string;
}

const SearchedListContainer = styled.div`
  padding: 40px;
  background-color: #f2f3f3;
`;

const SearchedData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0px;
  p {
    font-size: 13px;
    font-weight: 400;
  }
  .likes {
    background-color: #00000014;
    padding: 8px 16px;
    border-radius: 16px;
    text-align: center;

    @media screen and (max-width: 350px) {
      padding: 6px 12px;
    }
  }
  .shopName {
    font-size: 16px;
    font-weight: 600;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const AddListButton = styled.div`
  padding-top: 20px;
`

const ExperienceBox: React.FC<ExperienceBoxProps> = ({ urlTitle, urlData }) => {
  const { modalClick } = useMyContext();

  return (
    <SearchedListContainer>
      <TitleText>{urlTitle}</TitleText>
      {urlData != 77 && (
        <div style={{ margin: "24px 0px" }}>
          <FilterSection />
        </div>
      )}
      {EnjoyShineMenuItem.map((item: any, index: any) => {
        return (
          <SearchedData key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Image
                src={item.headerImage}
                width={80}
                height={80}
                style={{ borderRadius: 4, cursor: "pointer" }}
                onClick={() => modalClick("activities", item)}
                alt=""
              />
              <div className="restroRating">
                <p className="shopName">{item.resturantName}</p>
                <DetailContainer>
                  <Image
                    src={item.image}
                    style={{
                      width: "13px",
                      height: "13px",
                      marginRight: 8,
                    }}
                    alt="utensils"
                  />
                  <p>{item.menuName}</p>
                </DetailContainer>
                <p>
                  <span>Outdoors</span>
                </p>
              </div>
            </div>
          </SearchedData>
        );
      })}
            <AddListButton>
        <CommonButton text="Suggest an Event" />
      </AddListButton>
    </SearchedListContainer>
  );
};

export default ExperienceBox;
