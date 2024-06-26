import { getDirectoryCatagories } from "@/app/action";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Image from "next/image";
// import { PopularLists, SelectedLists } from "@/components/search/Data";
// import { thumbsup } from "@/app/utils/ImagePath";
// import { sideWidth } from "@/app/utils/date";
// import Instance from "@/app/utils/Instance";
// import { icons } from "@/app/utils/iconList";
// import Skeleton from "react-loading-skeleton";
// import { useRouter } from "next/navigation";
import { ListItem } from "../trendingList/ListItem";

interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const DirectoryCatories: React.FC<TrendingListProps> = async ({
  urlTitle,
  urlData,
}) => {
  const listData = await getDirectoryCatagories(urlData);
  console.log(listData);
  return (
    <>
      <ListItem data={listData} urlTitle={urlTitle}></ListItem>
    </>
  );
};
// const DirectoryCatories: React.FC<TrendingListProps> = ({
//   urlTitle,
//   urlData,
// }) => {
//   const [listData, setListData] = useState<string[]>([]);
//   const router = useRouter();

//   const fetchDataAsync = async () => {
//     try {
//       const response = await Instance.get(`/directory?query=${urlData}`);
//       if (response.status === 200) {
//         response.data.forEach((list: any) => {
//           const matchedIcon = icons.find((icon) => icon.name === list.iconName);
//           if (matchedIcon) {
//             list.image = matchedIcon.image;
//           }
//         });
//         setListData(response?.data);
//       } else {
//         setListData([]);
//       }
//     } catch (error) {
//       setListData([]);
//     }
//   };

//   useEffect(() => {
//     fetchDataAsync();
//   }, [urlData]);

//   const menuClick = (item: any, condition?: boolean, id?: any) => {
//     if (condition === true) {
//       router.push(`/screens/${item}?categoryID=${id}`);
//     }
//   };

//   const skeletonItems = new Array(10).fill(null);

//   return (
//     <div>
//       <Container>
//         <PopularListContainer>
//           <PopularlistTitle>{urlTitle}</PopularlistTitle>
//         </PopularListContainer>
//         {listData.length
//           ? listData.map((item: any, index) => {
//               return (
//                 <ListContainer
//                   key={index}
//                   onClick={() => menuClick(item?.listName, true, item?._id)}
//                 >
//                   <ImageTitleContainer>
//                     <Imagecontainer style={{ background: item?.bgColor }}>
//                       {item?.image}
//                     </Imagecontainer>
//                     <p>{item?.listName}</p>
//                   </ImageTitleContainer>
//                   <LikesContainer>
//                     <Image
//                       style={{ width: 16, height: "auto" }}
//                       src={thumbsup}
//                       alt="icon"
//                     />
//                     <p>{item.voting.length}</p>
//                   </LikesContainer>
//                 </ListContainer>
//               );
//             })
//           : skeletonItems.map((item, index) => (
//               <SearchedData key={index}>
//                 <MainWrraper>
//                   <MainInsideWrapper>
//                     <Skeleton
//                       width={80}
//                       height={80}
//                       style={{ borderRadius: 8 }}
//                     />
//                     <div className="restroRating">
//                       <Skeleton
//                         width={120}
//                         height={15}
//                         style={{ borderRadius: 8 }}
//                       />
//                       <Skeleton
//                         width={120}
//                         height={15}
//                         style={{ borderRadius: 8 }}
//                       />
//                       <Skeleton
//                         width={120}
//                         height={15}
//                         style={{ borderRadius: 8 }}
//                       />
//                     </div>
//                   </MainInsideWrapper>
//                   <div className="likes">
//                     <Skeleton width={16} height={16} />
//                   </div>
//                 </MainWrraper>
//               </SearchedData>
//             ))}
//       </Container>
//     </div>
//   );
// };

export default DirectoryCatories;

// const Container = styled.div`
//   padding: 40px;
//   background-color: #f2f3f3;
//   width: ${sideWidth};
//   height: 100%;
//   min-height: 82vh;
//   @media screen and (max-width: 800px) {
//     width: 100%;
//     padding: 40px 15px;
//   }
// `;

// const PopularListContainer = styled.div`
//   display: flex;
//   justify-content: space-between;

//   .view {
//     color: #000;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
//   }
// `;

// const PopularlistTitle = styled.div`
//   color: #000;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   margin-bottom: 24px;
//   text-transform: capitalize;
// `;

// const ListContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.08);
//   padding: 8px 0px;
//   cursor: pointer;
// `;

// const ImageTitleContainer = styled.div`
//   display: flex;
//   gap: 8px;
//   align-items: center;

//   p {
//     color: #000;
//     text-align: center;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
//   }
// `;

// const Imagecontainer = styled.div`
//   display: flex;
//   width: 40px;
//   height: 40px;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   border-radius: 100%;
//   background: #eb5757;
// `;

// const LikesContainer = styled.div`
//   display: flex;
//   gap: 8px;
//   align-items: center;

//   p {
//     color: rgba(0, 0, 0, 0.48);
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 24px; /* 150% */
//   }
// `;

// const SearchedData = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 10px;
//   border-bottom: 1px solid #d9d9d9;
//   padding: 10px 0px;
//   p {
//     font-size: 13px;
//     font-weight: 400;
//     @media screen and (max-width: 350px) {
//       font-size: 1.3rem;
//     }
//   }
//   .likes {
//     background-color: #00000014;
//     padding: 8px 16px;
//     border-radius: 16px;
//     text-align: center;

//     @media screen and (max-width: 350px) {
//       padding: 6px 12px;
//     }
//   }
//   .shopName {
//     font-size: 16px;
//     font-weight: 600;
//     @media screen and (max-width: 350px) {
//       font-size: 1.6rem;
//     }
//   }
//   p span {
//     color: #2b902b;
//   }
// `;

// const MainWrraper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   justify-content: space-between;
//   width: 100%;
// `;
// const MainInsideWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
// `;
