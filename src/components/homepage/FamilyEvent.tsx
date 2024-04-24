import React,{useEffect,useState} from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { familyEventMenuItem } from "@/app/dashboard/data";
import Image from "next/image";
import { useMyContext } from "@/app/Context/MyContext";
import {fetchDatAll } from "@/app/API/Baseurl";
import {formatMonth,formatDate} from '@/app/utils/date'
import {ApiResponse} from '@/app/utils/types'

interface DashboardProps {
    modalClick?: any;
    menuClick?: any;
  }

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 40px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const FamilEventContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  /* justify-content: flex-end; */
  gap: 8px;
  flex-shrink: 0;

  .date {
    font-size: 10px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    width: 30px;
  }

  .month {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    background-color: red;
    width: fit-content;
    color: #fff;
    width: 30px;
    border-radius: 0px 0px 4px 4px;
  }
`;

const FamilEventText = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
`;

const FamilyEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FamilyEventWrapperInside = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  text-align: center;
  background: white;
  border-radius: 4px;
`;

const FamilyEvent: React.FC<DashboardProps> = ({modalClick,menuClick}) => {

  const {filterUrls } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchDatAll('/family-events');
      setData(result);
    };

    fetchDataAsync();
  }, []);

 const ImageUrlData = data.map((item) => item.acf.gallery_images_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails isOpen={() => menuClick("Family Events", true, "Events")} title="Family Events" />
      <ScrollingMenu>
        {data.slice(0, 10).map((item, index) => {
          return (
            <FamilEventContainer
              key={index}
              onClick={() => modalClick("eventListing", item,filteredUrls[index])}
              style={{ cursor: "pointer" }}
            >
              <FamilyEventWrapper>
                <Image
                  src={filteredUrls[index]}
                  alt=""
                  width={80}
                  height={80}
                  style={{borderRadius:4}}
                />
                <FamilyEventWrapperInside>
                  <p className="date">{formatDate(item.acf.event_dates[0].date)}</p>
                  <p className="month">{formatMonth(item.acf.event_dates[0].date)}</p>
                </FamilyEventWrapperInside>
              </FamilyEventWrapper>
              <FamilEventText>{item.acf.title}</FamilEventText>
            </FamilEventContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default FamilyEvent;
