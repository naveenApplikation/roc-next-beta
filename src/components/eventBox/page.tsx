import { RestroListData } from '@/app/dashboard/data';
import { blank, locationMark, utensils } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import Ratings from '../ratings';
import styled from 'styled-components';

interface EventBoxProps {
    // Define your props here
}


const EventBox: React.FC<EventBoxProps> = (props) => {


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

                                    <Image
                                        src={locationMark}
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
                                    <span>11:40 - 14:00</span>
                                </p>
                            </div>
                        </div>

                    </SearchedData>
                );
            })}
        </SearchedListContainer>
    );
};

export default EventBox;