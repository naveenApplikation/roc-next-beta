"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  BannerDemo,
  BannerDemo2,
  BannerDemo3,
  RightArow,
} from "@/app/utils/ImagePath";
import DirectionModalLayout from "@/components/modal/Modal";
import { useMyContext } from "@/app/Context/MyContext";

const AdContainer = styled.div<{
  $className: string;
  $maxWidth: string;
  $bottom?:string
}>`
  width: 480px;
  position: sticky;
  bottom: -2px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffffff1c;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding-bottom: ${({ $className }) => $className};

  @media screen and (max-width: 800px) {
    position: fixed;
    width: 100%;
    bottom:${({$bottom})=>$bottom};
    max-width: ${({ $maxWidth }) => $maxWidth};
  }
  @media screen and (min-width: 390px) {
    position: fixed;
  }
`;

const AdBody = styled.div<{
  $maxWidth: string;
}>`
  width: 440px;
  display: flex;
  border-radius: 12px;
  background: white;
  border: 1px solid #d9d9d9;

  img {
    border-radius: 12px 0px 0px 12px;
  }
  @media screen and (max-width: 800px) {
    width: 97%;
    max-width: ${({ $maxWidth }) => $maxWidth};
  }
`;

const FullAdBody = styled.div<{
  $maxWidth: string;
}>`
  width: 440px;
  display: flex;
  justify-content: center;

  img {
    border-radius: 12px 12px 12px 12px;
  }
  @media screen and (max-width: 800px) {
    width: 97%;
    max-width: ${({ $maxWidth }) => $maxWidth};
  }
`;
const AdContent = styled.div`
  padding: 4px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const AdText = styled.div`
  .banner_heading {
    font-size: 16px;
    font-weight: 700;
    @media screen and (max-width: 367px) {
      font-size: 14px;
    }
    @media screen and (max-width: 333px) {
      font-size: 12px;
    }
  }
  .banner_text {
    font-size: 14px;
    color: #0000007a;
    font-weight: 400;
    @media screen and (max-width: 367px) {
      font-size: 12px;
    }
    @media screen and (max-width: 333px) {
      font-size: 10px;
    }
  }
`;

interface AdsBannerProps {
  className?: string;
  maxWidth?: string;
  style?:CSSProperties,
  bottom?:string
}

// Ad Data
const adsData:any = [
  // {
  //   type: "existing",
  //   image:
  //     "https://ucarecdn.com/24e65b1d-aac3-4eba-a4b3-0c7f11e2abe6/-/preview/384x280/",
  //   url: "https://hub.roc.je/app/featured/de-gruchy",
  //   heading: "Find Your Ideal Christmas Hamper at de Gruchy",
  //   text: "The Perfect Christmas Gift!",
  // },
  // {
  //   type: "existing",
  //   image: BannerDemo3, // Path to the new ad image
  //   url: "https://hub.roc.je/featured/art-in-the-frame-christmas-events", // URL for the new ad
  //   heading: "Sip, Savour, and Make Memories: Christmas Tasting & Craft Events",
  //   text: "",
  // },
];

const AdsBanner: React.FC<AdsBannerProps> = ({
  className = "20px",
  maxWidth = "480px",
  style,
  bottom
}) => {

  
  const { modalClick, setcurrentAdsDetail } = useMyContext();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  if(adsData.length==0)
    {
       return <></>
    }
  const currentAd = adsData[currentAdIndex];

  return (
    <>
      
      {currentAd.type === "existing" ? (
        <AdContainer
        $bottom={bottom}
          style={{...style}}
          $className={className}
          $maxWidth={maxWidth}
          onClick={() => {
            setcurrentAdsDetail({
              url: adsData[currentAdIndex].url,
              heading: adsData[currentAdIndex].heading,
              title: adsData[currentAdIndex].text,
            });
            modalClick("adsBanner", "adsBanner");
          }}
        >
          <AdBody $maxWidth={maxWidth}>
            <Image
              src={currentAd.image}
              alt="Advertisement"
              width={96}
              height={66}
            />
            <AdContent>
              <AdText>
                <p className="banner_heading">{currentAd.heading}</p>
                <p className="banner_text">{currentAd.text}</p>
              </AdText>
              <Image src={RightArow} alt="icon" height={20} />
            </AdContent>
          </AdBody>
        </AdContainer>
      ) : (
        <AdContainer
          $className={className} // Set default className
          $maxWidth={maxWidth} // Set default maxWidth
          onClick={() => window.open(currentAd.url, "_blank")}
        >
          <FullAdBody $maxWidth={maxWidth}>
            <Image src={currentAd.image} alt="Full Ad" height={70} />
          </FullAdBody>
        </AdContainer>
      )}
    </>
  );
};

export default AdsBanner;
