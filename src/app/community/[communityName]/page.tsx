"use client"
import { RestroListData } from '@/app/dashboard/data';
import Layout from '@/app/layout/page';
import { blank, plusCircle, thumbsup, utensils } from '@/app/utils/ImagePath';
import CommonButton from '@/components/button/CommonButton';
import FilterSection from '@/components/filterSection';
import Ratings from '@/components/ratings';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

interface CommunityPageProps {
  // Define your props here
}

const CommunityBody = styled.div`
  padding:0px 40px;
  min-height:calc(100vh - 113px);
  padding-bottom:40px;
  .communityName{
    font-family: "ProximaNova";
    font-size : 24px;
    font-weight:700;
  }
  .likesCount{
    font-size:15px;
    font-weight:500;
    font-style : italic;
  }
`
const SearchedListContainer = styled.div`
  padding-bottom: 40px;
`


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




const CommunityPage: React.FC<CommunityPageProps> = (props) => {
  const params = useParams()

  let urlData : any
  if(params){

    urlData = (params.communityName).toString().replaceAll("%20", " ")
  }


  return (
      <CommunityBody>
        <p className='communityName'>{urlData}</p>
        <p className='likesCount'>5281 Likes</p>
        <FilterSection />
        <SearchedListContainer>
          {RestroListData.map((item: any,index:any) => {
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
                    <p className="shopName">{item.name}</p>
                    <div style={{display:"flex",alignItems:"center"}}>
                    <Image
                      src={utensils}
                      style={{
                        width: "13px",
                        height: "13px",
                        marginRight: 8,
                      }}
                      alt="utensils"
                      />
                    <Ratings defaultValue={item.rating} />
                      </div>
                    <p>
                      <span>Open - Closes</span>
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
                  <p>{item.likeCount}</p>
                </div>
              </SearchedData>
            );
          })}
        </SearchedListContainer>

        <CommonButton image={plusCircle} text="Add to list" />
      </CommunityBody>
  );
};
export default Layout(CommunityPage)