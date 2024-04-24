import React,{useEffect,useState} from "react";
import {fetchDatAll } from "@/app/API/Baseurl";
import {ApiResponse} from '@/app/utils/types'
import { useMyContext } from "@/app/Context/MyContext";
import styled from "styled-components";
import Image from "next/image";
import MenuDetails from "@/components/dashboard/MenuDetails";

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

const TopAttractionContainer = styled.div`
  display: flex;
  width: 80px;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  p {
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const TopAttractionprofile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-size: contain;
`;

const TopAttractions: React.FC<DashboardProps> = ({modalClick,menuClick}) => {

  const {filterUrls } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const fetchDataAsync = async () => {
    const result = await fetchDatAll('/top-attractions');
    setData(result)
  };

  useEffect(()=>{
    fetchDataAsync()
  },[])

  const ImageUrlData = data.map((item) => item.acf.gallery_images_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
     <MenuDetails isOpen={() => menuClick("Top Attractions", true,"top-attractions")} title="Top Attractions" />
      <ScrollingMenu>
        {data?.slice(0, 10).map((item, index) => {
          return (
            <TopAttractionContainer
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => modalClick("ModalContent", item,filteredUrls[index])}
            >
              <TopAttractionprofile>
                <Image
                  src={filteredUrls[index]}
                  alt=""
                  width={80}
                  height={80}
                  style={{ borderRadius: "100%" }}
                  // alt=""
                />
              </TopAttractionprofile>
              <p>{item.acf.title}</p>
            </TopAttractionContainer>
          );
        })}
      </ScrollingMenu>
    </>
  );
};

export default TopAttractions;
