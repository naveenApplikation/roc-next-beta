import React, { useEffect, useState } from "react";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Image from "next/image";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import {skeletonItems} from '@/app/utils/date'

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
  width: 100%;
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

const Surfing: React.FC<DashboardProps> = ({ modalClick, menuClick }) => {
  const { filterUrls,showContent } = useMyContext();

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  const fetchDataAsync = async () => {
    setloader(true);
    const storedValue = localStorage.getItem("hideUI");
    if(storedValue){
      try {
        const result = await Instance.get("/surfing");
        const combinedArray = [
          ...result.data.activity1,
          ...result.data.activity2,
        ];
        setData(combinedArray);
      } catch (error: any) {
        console.log(error.message);
        setloader(false);
      } finally {
        setloader(false);
      }
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [showContent]);

  const ImageUrlData = data.map((item) => item.acf.gallery_images_data);

  const filteredUrls = filterUrls(ImageUrlData);

  return (
    <>
      <MenuDetails
        isOpen={() => menuClick("Surfing", true, "surfing")}
        title="Surfing"
      />
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
                    modalClick("ModalContent", item, filteredUrls[index])
                  }
                >
                  <StarWrapper>
                    <Image
                      className="StarImageStyle"
                      src={filteredUrls[index]}
                      alt=""
                      width={120}
                      height={64}
                    />
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
                      <p>4.7</p>
                    </div>
                    <p style={{ fontSize: 14, marginTop: 8 }}>
                      {item.acf.title}
                    </p>
                  </div>
                </StarContainer>
              );
            })}
      </ScrollingMenu>
    </>
  );
};

export default Surfing;
