import React, { useEffect, useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import { skeletonItems } from '@/app/utils/date'

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

const StarContainer = styled.div`
  width: 120px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const StarWrapper = styled.div`
  height: 64px;
  width: 120px;
  background: linear-gradient(45deg, black, transparent);
  position: relative;
  border-radius: 4px;

  p {
    position: absolute;
    top: 4px;
    right: 5px;
    background: #fff;
    width: 30px;
    text-align: center;
    border-radius: 10px;
    font-size: 8px;
  }

  .StarImageStyle {
    /* width: -webkit-fill-available; */
    height: 64px;
    border-radius: 4px;
  }
`;
const ImageTag = styled.img`
width:100%;
border-radius:4px;
object-fit:cover;
height:100%;
`;

const MainTitle = styled.p`
 overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
    margin-top: 8px;
`

const WW2: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls, showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    try {
      const result = await Instance.get("/ww-2");
      if(result?.data?.activity1){
        const combinedArray = [
          ...result.data.activity1,
          ...result.data.activity2,
        ];
        setData(combinedArray);
      } else {
        setData(result?.data);

      }
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

  const ImageUrlData = data.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails isOpen={() => menuClick("WW2", true, "ww-2")} title="WW2" />
      <ScrollingMenu>
        {loader
          ? skeletonItems.map((item, index) => (
            <div key={index}>
              <CommonSkeletonLoader />
            </div>
          ))
          : data?.slice(0, 10).map((item, index) => {
            return (
              <StarContainer
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  modalClick("ModalContent", item, item?.data_type === "google" ? item?.photoUrl : filteredUrls[index])
                }
              >
                <StarWrapper>
                  {
                    item?.data_type === "google" ?
                      <ImageTag src={item.photoUrl} alt="Image" />
                      :
                      <Image
                        src={filteredUrls[index]}
                        alt=""
                        width={500}
                        height={80}
                        style={{ borderRadius: "4px", maxWidth: "100%", objectFit: 'cover' }}
                      // alt=""
                      />

                  }
                </StarWrapper>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"
                      }
                      width={69}
                      height={12}
                      alt="right icon"
                    />{" "}
                    <p>{item?.rating}</p>
                  </div>
                  <MainTitle>
                    {item?.data_type === "google" ? item?.name : item?.acf?.title}
                  </MainTitle>
                </div>
              </StarContainer>
            );
          })}
      </ScrollingMenu>
    </>
  );
};

export default WW2;
