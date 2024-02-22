import { RestroListData } from '@/app/dashboard/data';
import { associate, blank, currency } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Ratings from '../ratings';

interface ScaffoldingBoxProps {
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
const FooterContainer = styled.div`
display:flex;
align-items:center;
gap:5px;
p{
    font-size : 8px;
    font-weight:400;
}
`

const ScaffoldingBox: React.FC<ScaffoldingBoxProps> = (props) => {
    return (
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
                                <p className="shopName">item.name</p>
                                <DetailContainer>
                                    <Ratings defaultValue={3} />
                                    <p>3</p>
                                </DetailContainer>
                                <p>
                                    Competitive rates. Fast & efficient service. Scaffolding erected to CISRS standards
                                </p>
                                <FooterContainer>
                                    <Image src={associate} alt=""/>
                                    <p>
                                    Jersey Association of Scaffolder Contractors
                                    </p>
                                </FooterContainer>
                            </div>
                        </div>

                    </SearchedData>
                );
            })}
        </SearchedListContainer>
    );
};

export default ScaffoldingBox;