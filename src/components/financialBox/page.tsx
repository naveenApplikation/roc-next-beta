import { RestroListData } from "@/app/utils/data";
import { blank } from "@/app/utils/ImagePath";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import InfoApp from "@/components/homepage/InfoApp";
import LocalCusine from "@/components/homepage/LocalCusine";
import FamilyEvent from "@/components/homepage/FamilyEvent";
import EnjoyTheSunshine from "@/components/homepage/EnjoyTheSunshine";
// import TrendingList from "@/components/homepage/TrendingList";
import TopAttractions from "@/components/homepage/TopAttractions";
import Directory from "@/components/homepage/Directory";
import Bars from "@/components/homepage/Bars";
import Shopping from "@/components/homepage/Shopping";
import Community from "@/components/homepage/Community";
import BeachLife from "@/components/homepage/BeachLife";
import Sustainability from "@/components/homepage/Sustainability";
import Jerseyisms from "@/components/homepage/Jerseyisms";
import Heritage from "@/components/homepage/Heritage";
import Walks from "@/components/homepage/Walks";
import Wellbeing from "@/components/homepage/Wellbeing";
import WW2 from "@/components/homepage/WW2";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import DeliciousDine from "@/components/homepage/DeliciousDine";
import Outout from "@/components/homepage/Outout";
import Surfing from "@/components/homepage/Surfing";
import { useMyContext } from "@/app/Context/MyContext";

interface FinancialBoxProps {
  // Define your props here
}
const SearchedListContainer = styled.div`
  padding: 0px;
  display: flex;
  background-color: #f2f3f3;
  flex-direction: column;
  gap: 16px;
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
const FinancialBox: React.FC<FinancialBoxProps> = (props) => {
  const { modalClick } = useMyContext();

  const menuClick = () => {};

  return (
    <SearchedListContainer>
      {/* {RestroListData.map((item: any,index:any) => {
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
                                style={{ background: "white" }}
                                src={blank}
                                alt=""
                            />
                            <div className="restroRating">
                                <p className="shopName">item.name</p>
                                <DetailContainer>                                   
                                    <p>St Helier</p>
                                </DetailContainer>
                            </div>
                        </div>

                    </SearchedData>
                );
            })} */}
      <SearchNFilter menuClick={menuClick} modalClick={modalClick} />
      <InfoApp menuClick={menuClick} modalClick={modalClick} />
      {/* <LocalCusine menuClick={menuClick} modalClick={modalClick} /> */}
      <FamilyEvent   />
      <EnjoyTheSunshine/>
      {/* <TrendingList menuClick={menuClick} modalClick={modalClick} /> */}
      {/* <TopAttractions menuClick={menuClick} modalClick={modalClick} /> */}
      <Directory menuClick={menuClick} modalClick={modalClick} />
      {/* <Bars menuClick={menuClick} modalClick={modalClick} />
      <Shopping menuClick={menuClick} modalClick={modalClick} />
      {/* <Community menuClick={menuClick} modalClick={modalClick} /> */}
      {/* <BeachLife menuClick={menuClick} modalClick={modalClick} />
      <Sustainability menuClick={menuClick} modalClick={modalClick} />
      <Jerseyisms menuClick={menuClick} modalClick={modalClick} />
      <Heritage menuClick={menuClick} modalClick={modalClick} />  */}
      <Walks menuClick={menuClick}   />
      <Wellbeing menuClick={menuClick} />
      <WW2 menuClick={menuClick} modalClick={modalClick} />
      <CycleRoutes menuClick={menuClick} modalClick={modalClick} />
      <DeliciousDine menuClick={menuClick} modalClick={modalClick} />
      {/* <Outout menuClick={menuClick} modalClick={modalClick} />
      <Surfing menuClick={menuClick} modalClick={modalClick} /> */}
    </SearchedListContainer>
  );
};

export default FinancialBox;
