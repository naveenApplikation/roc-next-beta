import React, { useState, useEffect } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import RatingMenu from "@/components/dashboard/RatingMenu";
import styled from "styled-components";
import { EnjoyShineMenuItem } from "@/app/utils/data";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from "@/app/utils/date";
import Image from "next/image";

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

const ScrollingMenuDishes = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  flex-shrink: 0;
  cursor: pointer;
`;

const UtensilsDishesImage = styled.div`
  border-radius: 4px;
  background: #c4c4c4;
  height: 64px;
  align-self: stretch;
`;

const Title = styled.p`
  white-space: nowrap;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const Menutitle = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
  display: block;
  width: 100%; /* Ensures the link takes up the full width of its container */
  white-space: nowrap; /* Prevents wrapping of the link text */
  overflow: hidden; /* Hides any overflowing content */
  text-overflow: ellipsis;
`;

const MenuIconContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 16px;
`;

const MenuIcon = styled(Image)`
  /* width: 11px;
  height: 12px; */
`;

const MainImage = styled(Image)`
  width: 120px !important;
  height: 64px !important;
  border-radius: 6px;
`;

const PriceText = styled.p`
  overflow: hidden;
  color: rgba(0, 0, 0, 0.48);
  text-overflow: ellipsis;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;

const EnjoyTheSunshine: React.FC<DashboardProps> = ({
  modalClick,
  menuClick,
}) => {
  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/sun-shine");
      setData(result.data);
    } catch (error: any) {
      console.log(error.message);
      setloader(false);
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const ImageUrlData = data.map((item) => item.acf.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Enjoy the sunshine", true, "sun-shine")}
        title="Enjoy the sunshine"
      />
      {/* <ScrollingMenu>
        {EnjoyShineMenuItem.map((item, index) => {
          return (
            <div key={index}>
              <RatingMenu
                title={item.menuName}
                menuImageUrl={item.image}
                headerImage={item.headerImage}
                containerImageUrl={true}
                MenutitleDetail={item.resturantName}
                isOpen={() => modalClick("activities", item)}
              />
            </div>
          );
        })}
      </ScrollingMenu> */}
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
              <div key={index}>
                <CommonSkeletonLoader />
              </div>
            ))
          : data?.slice(0, 10).map((item, index) => {
              return (
                <div key={index}>
                  {/* <RatingMenu
                    title={item.acf.parish.label}
                    menuImageUrl={
                      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant1.jpg?alt=media&token=c48ad7ce-9020-4dc9-b91f-1c866cb3e836"
                    }
                    headerImage={filteredUrls[index]}
                    containerImageUrl={true}
                    MenutitleDetail={item.acf.title}
                    isOpen={() =>
                      modalClick("activities", item, filteredUrls[index])
                    }
                  /> */}
                  <ScrollingMenuDishes
                    onClick={() =>
                      modalClick("activities", item, filteredUrls[index])
                    }
                  >
                    <UtensilsDishesImage>
                      <MainImage
                        src={filteredUrls[index]}
                        alt=""
                        width={500}
                        height={80}
                        style={{
                          borderRadius: 4,
                          maxWidth: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </UtensilsDishesImage>
                    <Menutitle>
                      {item.acf.title}
                    </Menutitle>
                    <PriceText>
                      £ {item.acf.price_from}
                    </PriceText>
                  </ScrollingMenuDishes>
                </div>
              );
            })}
      </ScrollingMenu>
    </>
  );
};

export default EnjoyTheSunshine;
