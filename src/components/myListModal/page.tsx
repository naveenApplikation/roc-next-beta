import React from "react";
import styled from "styled-components";
import TabPanel from "../tabPanel";
import Lists from "./Mylist";
import { RestroListData } from "@/app/utils/data";
import Image from "next/image";
import { blank, thumbsup } from "@/app/utils/ImagePath";
import Ratings from "../ratings";

interface DashboardSearchContainerProps {
  myListtabChange: Function;
  mylistoptions: any;
  myListtabValue: string;
  listData?: any;
  contributionData?: any;
  loader?: boolean;
}



const MylistModal: React.FC<DashboardSearchContainerProps> = ({
  myListtabChange,
  mylistoptions,
  myListtabValue,
  listData,
  contributionData,
  loader,
}) => {
  return (
    <>
      <TabPanel
        defaultValue="Created"
        tabChange={myListtabChange}
        options={mylistoptions}
      />
      {myListtabValue == "Created" ? (
        <>
          <Lists {...{ listData, loader }} />
        </>
      ) : (
        <>
        <Lists {...{ loader }} listData={contributionData}/>
          {/* <FilterSection /> */}
          {/* <SearchedListContainer>
            {contributionData.map((item: any, index: any) => {
              return (
                <SearchedData key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                    }}>
                    <Image style={{ background: "white" }} src={blank} alt="" />
                    <div className="restroRating">
                      <p className="shopName">{item?.name}</p>
                      <div style={{ display: "flex", alignItems: "center" }}>

                        <Ratings defaultValue={item?.rating} />
                      </div>
                      <p>
                        <span>Open - Close</span>
                      </p>
                      <p>Indoors</p>
                    </div>
                  </div>
                  <div className="likes">
                    <Image
                      src={thumbsup}
                      alt="like"
                      style={{ width: "16px", height: "16px" }}
                    />
                    <p>{item?.likeCount}</p>
                  </div>
                </SearchedData>
              );
            })}
          </SearchedListContainer> */}
        </>
      )}
    </>
  );
};

export default MylistModal;


const SearchedListContainer = styled.div`
  padding-bottom: 40px;
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
  p span {
    color: #2b902b;
  }
`;
