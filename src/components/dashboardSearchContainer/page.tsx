import React from 'react';
import styled from 'styled-components';
import TabPanel from '../tabPanel';
import Lists from '../search/Lists';
import FilterSection from '../filterSection';
import { RestroListData } from '@/app/dashboard/data';
import Image from 'next/image';
import { blank, thumbsup, utensils } from '@/app/utils/ImagePath';
import Ratings from '../ratings';
import SearchInput from "../searchInput/SearchInput";

interface DashboardSearchContainerProps {
    tabChange:Function,
    options:any,
    tabValue:string,
    showMap:boolean
}

const InputWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  gap: 6px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    padding-top: 16px;
  }
`;
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



const DashboardSearchContainer: React.FC<DashboardSearchContainerProps> = ({tabChange , options , tabValue , showMap}) => {
    return (
        
        <>
            <InputWrapper className="filterInput">
                <SearchInput />
            </InputWrapper>

            <TabPanel
                defaultValue="Lists"
                tabChange={tabChange}
                options={options}
            />
            {tabValue == "Lists" ? (
                <>
                    <Lists />
                </>
            ) : (
                <>
                    <FilterSection />
                    <SearchedListContainer>
                        {RestroListData.map((item: any) => {
                            return (
                                <SearchedData>
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
                                            <div style={{ display: "flex", alignItems: "center" }}>
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
                </>
            )}
        </>
    );
};

export default DashboardSearchContainer;