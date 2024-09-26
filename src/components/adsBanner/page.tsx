"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BannerDemo, RightArow } from "@/app/utils/ImagePath";
import DirectionModalLayout from "@/components/modal/Modal"
import { useMyContext } from "@/app/Context/MyContext";

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

interface AdsBannerProps {
  className?: string;
  maxWidth?: string;
}
const AdsBanner: React.FC<AdsBannerProps> = ({ className = "20px", maxWidth = "480px" }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { showMap, modalClick , modalType ,closeModal } = useMyContext();


  const handleOpen = () => {
    setOpen(!open)
  }

  console.log("modalTypemodalType" , modalType)

  return (
    <>
      <AdContainer $className={className} $maxWidth={maxWidth} onClick={() => modalClick("adsBanner", "adsBanner")}>
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
      {/* <DirectionModalLayout
        isOpen={modalType.adsBanner}
        name="adsBanner"
        showMap={showMap}
        onClose={() => closeModal("adsBanner")}
      >
        <iframe
          style={{ border: "none", height: "100%", overflow: 'hidden' }}
          src="https://hub.roc.je/featured/jersey-war-tunnels-escape-rooms"
          height="500px"
          width="100%"
          title="Jersey War Tunnels Escape Rooms"
          className="iframe_body"
        ></iframe>
      </DirectionModalLayout> */}
    </>
  );
}

export default AdsBanner