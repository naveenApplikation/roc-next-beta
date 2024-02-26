import { RestroListData } from '@/app/dashboard/data';
import { blank, currency } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface ExperienceBoxProps {
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
`;

const DetailContainer = styled.div`
display:flex;
align-items:center;
`


const ExperienceBox: React.FC<ExperienceBoxProps> = (props) => {
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
                                            marginRight: 8,
                                        }}
                                        alt="utensils"
                                    />
                                    <p>St Helier</p>
                                </DetailContainer>
                                <p>
                                    <span>Outdoors</span>
                                </p>
                            </div>
                        </div>

                    </SearchedData>
                );
            })}
        </SearchedListContainer>
    );
};

export default ExperienceBox;