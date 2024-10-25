import React from "react";
import styled from "styled-components";
import Image from "next/image";
import fallback from "../../../assets/images/fallbackimage.png";
 
interface MenuProps {
  title?: string;
  MenutitleDetail?: string;
  isOpen?: () => void;
  containerImageUrl?: boolean;
  menuImageUrl?: any;
  headerImage?: any;
}







const RatingMenu: React.FC<MenuProps> = ({
  containerImageUrl,
  title,
  menuImageUrl,
  MenutitleDetail,
  headerImage,
  isOpen,
}) => {
  return (
    <div className="flex w-[120px] flex-col flex-shrink-0 cursor-pointer">
      {containerImageUrl && (
        <>
          <div className="rounded bg-gray-400 h-[64px] self-stretch">
            <Image
              className="w-[120px] h-[64px] rounded-[6px]"
              src={headerImage ? headerImage : fallback}
              alt="my image"
              width={500}
              height={80}
              style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
            />
          </div>
          {title && (
            <div className="flex gap-[6px] mt-[16px]">
              {menuImageUrl && (
                <Image
                  src={menuImageUrl}
                  width={11}
                  height={12}
                  alt="icon"
                />
              )}
              <p className="text-size-[12px] font-normal text-center leading-normal" >{title}</p>
            </div>
          )}
          <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-[13px] font-normal leading-normal mt-2">{MenutitleDetail}</p>
        </>
      )}
    </div>
  );
};

export default RatingMenu;
