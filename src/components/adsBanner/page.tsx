"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BannerDemo, RightArow } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import DirectionModalLayout from "@/components/modal/Modal"

const AdContainer = styled.div<{
  $className: string;
  $maxWidth: string;
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
    width:100%;
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
  border-radius:12px;
  background:white;
  border:1px solid #D9D9D9;

  img{
    border-radius:12px 0px 0px 12px;
  }
  @media screen and (max-width: 800px) {
    width:97%;
    max-width: ${({ $maxWidth }) => $maxWidth};
  }
`;
const AdContent = styled.div`
  padding: 4px 10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  
`
const AdText = styled.div`
.baaner_heading{
  font-size:16px;
  font-weight:700;
    @media screen and (max-width: 367px) {
      font-size:14px;
    }
    @media screen and (max-width: 333px) {
      font-size:12px;
    }
}
.banner_text{
  font-size:14px;
  color: #0000007A;
  font-weight:400;
    @media screen and (max-width: 367px) {
      font-size:12px;
    }
    @media screen and (max-width: 333px) {
      font-size:10px;
    }
  }
  
`

const banners = [
  {
    url: "https://amzn.to/3Xjl874",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app-8a6e8.appspot.com/o/ADS%2FAmazon%20Banner%20Draft%201.png?alt=media&token=adec7612-054e-446a-a01b-45e72319c87b",
  },
  {
    url: "https://amzn.to/3Tq7QV2",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app-8a6e8.appspot.com/o/ADS%2FAmazon%20Banner%202.png?alt=media&token=595f3df2-0e99-4280-a9a3-582247c9132c",
  },
  {
    url: "https://amzn.to/4d2hUKZ",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app-8a6e8.appspot.com/o/ADS%2FAmazon%20Banner%203.png?alt=media&token=151eb7be-fd21-426c-9f4c-89e0f272cd91",
  },
  {
    url: "https://amzn.to/3XIeAQM",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app-8a6e8.appspot.com/o/ADS%2FAmazon%20Banner%204.png?alt=media&token=cccae8d5-b42f-46be-b39f-ce57cf8ec4e2",
  },
];
interface AdsBannerProps {
  className?: string;
  maxWidth?:string;
}
const AdsBanner: React.FC<AdsBannerProps> = ({ className = "20px" , maxWidth="480px" }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [open , setOpen] = useState<boolean>(false)
  const { modalType } = useMyContext();
  useEffect(() => {
    banners.forEach((banner) => {
      const img = new window.Image();
      img.src = banner.imgSrc;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


const handleOpen =()=>{
  setOpen(!open)
}

  return (
    <>
      <AdContainer $className={className} $maxWidth={maxWidth} onClick={handleOpen}>
        <AdBody $maxWidth={maxWidth}>
          <Image
            src={BannerDemo}
            alt="Advertisement"
            width={96}
            height={66}
          />
          <AdContent>
            <AdText>
              <p className="baaner_heading">Can You Escape Jersey’s
                Underground Puzzles?</p>
              <p className="banner_text">Jersey War Tunnels Escape Rooms</p>
            </AdText>
            <Image
              src={RightArow}
              alt="icon"
              height={20}
            />

          </AdContent>
        </AdBody>
      </AdContainer>
      <DirectionModalLayout
        isOpen={open}
        name="adsBanner"
        showMap={true}
        onClose={handleOpen}
      >
        <iframe
              style={{ border: "none", height: "100%", overflow: 'hidden' }}
              src="https://hub.roc.je/featured/jersey-war-tunnels-escape-rooms"
              height="500px"
              width="100%"
              title="Jersey War Tunnels Escape Rooms"
              className="iframe_body"
            ></iframe>
      </DirectionModalLayout>
    </>
  );
}

export default AdsBanner