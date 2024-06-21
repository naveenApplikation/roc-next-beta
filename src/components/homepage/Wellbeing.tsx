"use client"

import React, { useEffect, useState } from "react";
import { ApiResponse } from "@/app/utils/types";
import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import Instance from "@/app/utils/Instance";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import Image from "next/image";
import { skeletonItems } from "@/app/utils/date";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { wellbeingImg } from "@/app/utils/ImagePath";

interface DashboardProps {
  data?: any;
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
const CommunityContainer = styled.div`
  display: flex;
  width: 80px;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: end;
  gap: 8px;
  flex-shrink: 0;
  height: 80px;
  border-radius: 8px;
  background: #bb6bd9;

  p {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .StarImageStyle {
    /* width: -webkit-fill-available; */
    height: 64px;
    border-radius: 4px;
  }
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

const Wellbeing: React.FC<DashboardProps> = ({data}) => {
  const { filterUrls, modalClick,menuClick } = useMyContext();

  // const [data, setData] = useState<ApiResponse[]>([]);

  // const [loader, setloader] = useState(true);

  // const fetchDataAsync = async () => {
  //   setloader(true);
  //   try {
  //     const result = await Instance.get("/wellbeing-lists");
  //     setData(result.data);
  //   } catch (error: any) {
  //     console.log(error.message);
  //     setloader(false);
  //   } finally {
  //     setloader(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataAsync();
  // }, []);

  // const ImageUrlData = data.map((item) => item.acf.header_image_data);

  // const filteredUrls = filterUrls(ImageUrlData);

  return(
  //   <>
  //   <MenuDetails
  //     isOpen={() => menuClick("Wellbeing", true, "well-being")}
  //     title="Wellbeing"
  //   />
  //   <ScrollingMenu>
  //     {loader
  //       ? skeletonItems.map((item, index) => (
  //           <div key={index}>
  //             <CommonSkeletonLoader />
  //           </div>
  //         ))
  //       : data?.slice(0, 10).map((item, index) => {
  //           return (
  //             <StarContainer
  //               key={index}
  //               style={{ cursor: "pointer" }}
  //               onClick={() =>
  //                 modalClick("ModalContent", item, filteredUrls[index])
  //               }
  //             >
  //               <StarWrapper>
  //                 <Image
  //                   className="StarImageStyle"
  //                   src={filteredUrls[index]}
  //                   alt=""
  //                   width={500}
  //                   height={80}
  //                   style={{
  //                     borderRadius: 4,
  //                     maxWidth: "100%",
  //                     objectFit: "cover",
  //                   }}
  //                 />
  //                 {index == 0 && <p>New</p>}
  //               </StarWrapper>
  //               <div>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     gap: 4,
  //                     alignItems: "center",
  //                   }}
  //                 >
  //                   <Image
  //                     src={
  //                       "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FFrame%201535.png?alt=media&token=01590f0a-22c4-4d1d-9a68-4ea8f84c54c3"
  //                     }
  //                     width={69}
  //                     height={12}
  //                     alt="right icon"
  //                   />{" "}
  //                   <p>4.7</p>
  //                 </div>
  //                 <MainTitle>
  //                   {item.acf.title}
  //                 </MainTitle>
  //               </div>
  //             </StarContainer>
  //           );
  //         })}
  //   </ScrollingMenu>
  // </>
   <>
   <MenuDetails isOpen={() => menuClick("Wellbeing", true, "wellbeing-lists")} title="Wellbeing" />
   <ScrollingMenu>
   {!data
       ? skeletonItems.map((item, index) => (
           <div key={index}>
             <Skeleton width={80} height={80} style={{borderRadius:6}} />
           </div>
         ))
       :
       data.length ? data.map((item: any, index: any) => {
       return (
         <CommunityContainer
           key={index}
           style={{ background: item?.bgColor, cursor:'pointer' }}
           onClick={() => menuClick(item?.listName, false, item?.categoryId)}
         >
           {/* <p>{item?.image}</p> */}
           <p style={{textAlign:'right'}}>

            <Image src={wellbeingImg} alt="" />
           </p>
           <p>{item?.listName}</p>
         </CommunityContainer>
       );
     }) : ""}
   </ScrollingMenu>
 </>
  )
};

export default Wellbeing;
