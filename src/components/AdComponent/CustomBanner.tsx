"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

const AdContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: -2px;
  cursor: pointer;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3f9;

  @media (min-width: 800px) {
    max-width: 480px;
  }

  @media screen and (max-width: 800px) {
    position: fixed;
  }
  @media screen and (min-width: 390px) {
    padding-top: 5px;
    padding-bottom: 5px;
    position: fixed;
  }
`;

const AdBody = styled.div`
  width: 100%;
  max-width: 390px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

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

export default function CustomBanner() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    // Preload all banner images
    banners.forEach((banner) => {
      const img = new window.Image();
      img.src = banner.imgSrc;
    });
  }, []);

  // Change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleClick = () => {
    window.open(banners[currentBannerIndex].url, "_blank");
  };

  return (
    <AdContainer onClick={handleClick}>
      <AdBody>
        <Image
          src={banners[currentBannerIndex].imgSrc}
          alt="Advertisement"
          width={390}
          height={60}
          // layout="fill" // You can uncomment this if you want to make the image responsive
        />
      </AdBody>
    </AdContainer>
  );
}
