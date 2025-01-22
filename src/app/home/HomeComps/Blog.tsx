import React from 'react'
import Image from 'next/image';
import HomeMenu from './HomeMenu';
import Link from 'next/link';
import fallback from "../../../../assets/images/fallbackimage.png";
import { urlForImage } from '@/lib/sanity.image';
const Blog = ({
    title,
    data,
    nav,
  }: {
    title: string;
    data: any;
    nav: string;
  }) =>{
  return <>
    <HomeMenu link={nav}>{title}</HomeMenu>
    <div className="grid grid-flow-col gap-[8px] px-[40px] max-[800px]:px-[16px] overflow-y-hidden no-scrollbar">
      {(data || []).map((item, index) => {
        return (
          <Link
            href={`/blog/posts/${item.slug}`}
            key={index}
            className="flex flex-col cursor-pointer  w-[120px] gap-[8px]"
          >
            <div key={index} className="w-[120px] h-[70px]  rounded-[8px]">
              <Image
                height={500}
                width={500}
                alt="jersey image"
                objectFit="cover"
                src={     urlForImage(item?.coverImage)
                    .height(100)
                    .width(100)
                    .url()
                    ? urlForImage(item?.coverImage)
                        .height(500)
                        .width(500)
                        .url()
                    : fallback
                }
                
                className="h-full w-full object-cover w- rounded-[8px]"
              />
            </div>
            <p className="text-[12px] font-normal  leading-normal overflow-hidden  text-ellipsis line-clamp-1">
              {item?.title}
            </p>
          </Link>
        );
      })}
    </div>
  </>
}

export default Blog