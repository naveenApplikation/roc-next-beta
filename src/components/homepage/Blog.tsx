

import fallback from "../../../assets/images/fallbackimage.png";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import Link from "next/link";
import { BlogMenu } from "./Menu";
interface DashboardProps {
  data?: any;
  title: string;
} 

const Blog: React.FC<DashboardProps> = ({ data, title }) => {
  
   console.log( urlForImage(data[0]?.coverImage)
   .height(1000)
   .width(2000)
   .url())
  return (
    <>
       <BlogMenu></BlogMenu>
      <div className="flex overflow-auto gap-[8px] px-[40px] max-[800px]:px-[16px]  no-scrollbar">
        {data?.slice(0, 10).map(
                (item: any, index: any) => {
                  return (
                     
                      <Link key={index} className="flex w-[120px] flex-col flex-shrink-0 cursor-pointer" href={`/blog/posts/${item.slug}`}  >
                        
                          <>
                            <div className="rounded bg-gray-400 h-[64px] self-stretch">
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
                            </div>
                            {/* {title && (
                              <MenuIconContainer>
                                
                                <Title>{title}</Title>
                              </MenuIconContainer>
                            )} */}
                            <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-[13px] font-normal leading-normal mt-2"> {item? item?.title : ""}</p>
                          </>
                       
                      </Link>
                    
                  );
                }
              )
             
            }       
                
      </div>
    </>
  );
};

export default Blog;
 

 