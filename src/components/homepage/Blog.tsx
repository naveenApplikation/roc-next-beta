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
                    <WalkContainer
                      key={index}
                      onClick={() => router.push(`/blog/posts/${item.slug}`)}
                    >
                      <Image
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
                        alt=""
                        width={500}
                        height={80}
                        style={{
                          borderRadius: "4px",
                          maxWidth: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        // alt=""
                      />

                      <p>
                        {item? item?.title : ""}
                      </p>
                    </WalkContainer>
                  );
                }
              )
             
            }       
                
      </ScrollingMenu>
    </>
  );
};

export default Blog;

const WalkContainer = styled.div`
  height: 120px;
  min-width: 120px;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: end;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  justify-content: space-between;
  p {
    color: white;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    position: absolute;
    bottom: 8px;
    left: 12px;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;

const ImageTag = styled(Image)`
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
  height: 100%;
  cursor: "pointer";
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
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
