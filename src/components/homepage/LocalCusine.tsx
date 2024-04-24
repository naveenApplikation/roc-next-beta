import React, { useEffect,useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import {fetchDatAll } from "@/app/API/Baseurl";
import { LocalCuisineMenuItem } from "@/app/dashboard/data";
import {ApiResponse} from '@/app/utils/types'
import { useMyContext } from "@/app/Context/MyContext";

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

const OptionMenu = styled(ScrollingMenu)`
  gap: 25px;
`;

const LocalCusine: React.FC<DashboardProps> = ({modalClick,menuClick}) => {

  const {filterUrls } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const fetchDataAsync = async () => {
    const result = await fetchDatAll('/local-cuisine');
    setData(result)
  };

  useEffect(()=>{
    fetchDataAsync()
  },[])

  const ImageUrlData = data.map((item) => item.acf.gallery_images_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Local cuisine", true, "local-cuisine")}
        title="Local cuisine"
      />
      <ScrollingMenu>
        {data.slice(0, 10).map((item, index) => (
          <div key={index}>
            <RatingMenu
              title={item.acf.parish.label}
              menuImageUrl={"https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65"}
              headerImage={filteredUrls[index]}
              containerImageUrl={true}
              MenutitleDetail={item.acf.title}
              isOpen={() => modalClick("ModalContent", item,filteredUrls[index])}
            />
          </div>
        ))}
      </ScrollingMenu>
    </>
  );
};

export default LocalCusine;
