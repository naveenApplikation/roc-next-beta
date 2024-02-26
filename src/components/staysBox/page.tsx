import { RestroListData } from '@/app/dashboard/data';
import { blank, currency, locationMark } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Ratings from '../ratings';

interface StaysBoxProps {
    // Define your props here
}


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

const DetailContainer = styled.div`
display:flex;
gap:5px;
align-items:center;
`


const StaysBox: React.FC<StaysBoxProps> = (props) => {
    return (
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
                                <p className="shopName">item.name</p>
                                <DetailContainer>

                                    <Image
                                        src={currency}
                                        style={{
                                            width: "13px",
                                            height: "13px",
                                        }}
                                        alt="utensils"
                                    />
                                    <p>From £100/night</p>
                                    <Ratings defaultValue={3} />
                                    <p>3</p>
                                </DetailContainer>
                                <p>
                                St Helier  <span>11 pm</span>
                                </p>
                            </div>
                        </div>

                    </SearchedData>
                );
            })}
        </SearchedListContainer>
    );
};

export default StaysBox;