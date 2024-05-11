import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TabPanel from '../tabPanel';
import Lists from '../search/Lists';
import FilterSection from '../filterSection';
import { RestroListData } from '@/app/utils/data';
import Image from 'next/image';
import { blank, commentstar, thumbsup, utensils } from '@/app/utils/ImagePath';
import Ratings from '../ratings';
import SearchInput from "../searchInput/SearchInput";
import Instance from '@/app/utils/Instance';
import { debounce } from 'lodash';
import { useMyContext } from '@/app/Context/MyContext';

interface DashboardSearchContainerProps {
    tabChange: Function,
    options: any,
    tabValue: string,
    showMap?: boolean
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



const DashboardSearchContainer: React.FC<DashboardSearchContainerProps> = ({ tabChange, options, tabValue, showMap }) => {
    const {modalType} = useMyContext()
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [loader, setLoader] = useState<boolean>(false)

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };
    const fetchDataAsync = async (value: string) => {
        setLoader(true);

        try {
            const result = await Instance.get(`/search?title=${value}`);
            setData(result.data);
        } catch (error: any) {
            console.log(error.message);
            setLoader(false);
        } finally {
            setLoader(false);
        }
    };

    const debouncedSearch = debounce(fetchDataAsync, 300);

    useEffect(()=>{
        if(!modalType.search){
            setSearchQuery('')
            setData([])
        }

    },[modalType.search])


    return (

        <>
            <InputWrapper className="filterInput">
                <SearchInput
                    value={searchQuery}
                    onchange={(e: any) => handleSearch(e.target.value)} />
            </InputWrapper>
            <>
                {/* <FilterSection /> */}
                <SearchedListContainer>
                    {loader ? "Loading..." : (searchQuery &&
                        data.map((item: any, index: any) => {
                            if (!item._id) {
                                return null;
                            }
                            const imageList = JSON.parse(item.acf.header_image_data);
                            const image = imageList[0].url;

                            return (
                                <div
                                    style={{ display: "flex", flexDirection: "column", gap: 16, width: '100%' }}
                                    key={index}>
                                    <ListDataWrraper>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 16,
                                                width: '85%',
                                            }}>
                                            <div style={{ width: 80, height: 80 }}>
                                                <Image
                                                    src={image}
                                                    width={500}
                                                    height={80}
                                                    style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
                                                    alt="infoCirlce"
                                                />
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                gap: 10,
                                                flexDirection: "column",
                                                maxWidth: 'calc(100% - 30%)'
                                            }}>
                                                <ListDataTittleText>
                                                    {item?.acf?.title}
                                                </ListDataTittleText>
                                                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                                    <ListDataInfoText>
                                                        {item?.acf?.aa_rating
                                                            ? item?.acf?.aa_rating?.value == "No rating"
                                                                ? ""
                                                                : item?.acf?.aa_rating?.value
                                                            : ""}
                                                    </ListDataInfoText>
                                                    <Image src={commentstar} alt="infoCirlce" />
                                                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>

                                                        {
                                                            item?.acf?.portal_post_owner_name ? (
                                                                <ListDataInfoText>
                                                                    . {item?.acf?.portal_post_owner_name}
                                                                </ListDataInfoText>
                                                            ) : null
                                                        }
                                                        <ListDataInfoText>. {item?.type}</ListDataInfoText>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </ListDataWrraper>
                                </div>
                            );
                        }))}

                </SearchedListContainer>
            </>











            {/* <TabPanel
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
                       
                        {RestroListData.map((item: any, index: any) => {
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
            )} */}
        </>
    );
};

export default DashboardSearchContainer;


const ListDataWrraper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgb(217, 217, 217);
  align-items: center;
  padding: 9px 0px;
  position: relative;
`;

const ListDataTittleText = styled.p`
  color: var(--BODY, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const ListDataInfoText = styled.p`
  color: rgba(0, 0, 0, 0.48);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`;
