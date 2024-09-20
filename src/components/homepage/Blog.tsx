"use client";

import { useMyContext } from "@/app/Context/MyContext";
import MenuDetails from "@/components/dashboard/MenuDetails";
import styled from "styled-components";
import CommonSkeletonLoader from "@/components/skeleton Loader/CommonSkeletonLoader";
import fallback from "../../../assets/images/fallbackimage.png";
import Skeleton from "react-loading-skeleton";
import { skeletonItems } from "@/app/utils/date";
import RatingMenu from "@/components/dashboard/RatingMenu";
import Image from "next/image";
import ShopBrachSkeleton from "../skeleton Loader/ShopBrachSkeleton";
import { useRouter } from "next-nprogress-bar";
import { urlForImage } from "@/lib/sanity.image";
interface DashboardProps {
  data?: any;
  title: string;
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

const Blog: React.FC<DashboardProps> = ({ data, title }) => {
  
     const router=useRouter()
    const menuClick=()=>{
          router.push('/blog') 
    }
   console.log(data);
  return (
    <>
      <MenuDetails
        isOpen={() => menuClick()}
        title={title}
      />
      <ScrollingMenu>
        {!data
          ? skeletonItems.map((item, index) => (
              <div key={index}>
               
                  <ShopBrachSkeleton />
                 
              </div>
        
          ))
           :data?.slice(0, 10).map(
                (item: any, index: any) => {
                  return (
                    <div key={index}>
                      <ScrollingMenuDishes onClick={()=>{
                        router.push(`/blog/posts/${item.slug}`);
                      }}>
                        
                          <>
                            <UtensilsDishesImage>
                              <Image
                                className="ratingImage"
                                src={
                                  urlForImage(item?.coverImage)
                                    .height(1000)
                                    .width(2000)
                                    .url()
                                    ? urlForImage(item?.coverImage)
                                        .height(1000)
                                        .width(2000)
                                        .url()
                                    : fallback
                                }
                                alt="my image"
                                width={500}
                                height={80}
                                style={{
                                  borderRadius: 4,
                                  maxWidth: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </UtensilsDishesImage>
                            {/* {title && (
                              <MenuIconContainer>
                                
                                <Title>{title}</Title>
                              </MenuIconContainer>
                            )} */}
                            <Menutitle> {item? item?.title : ""}</Menutitle>
                          </>
                       
                      </ScrollingMenuDishes>
                    </div>
                  );
                }
              )
             
            }       
                
      </ScrollingMenu>
    </>
  );
};

export default Blog;
 


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
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const Menutitle = styled.p`
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
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
