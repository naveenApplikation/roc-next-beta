"use client";

import React, { useEffect, useRef } from "react";
 
import Image from "next/image";
import {
  LogoNew,
  Hamburger,
  profileBrown,
  MenuIcon,
  iconbeta,
} from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";
import { rightSideMenu, rightSideMenuMobile } from "@/app/utils/data";
import { useRouter } from "next-nprogress-bar";

// const RightSideMenuContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   overflow: auto;
//   gap: 24px;
//   position: absolute;
//   top: 60px;
//   right: 30px;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   @media screen and (max-width: 800px) {
//     padding: 0px;
//     height: auto;
//     overflow: hidden;
//     flex-direction: row;
//     display: none;
//   }
// `;


const RightSide = ({children}:{children:any}) => {
  const { modalClick, iconClick } = useMyContext();

  const router = useRouter();
  const positionRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{
      if(positionRef.current)
      {
         alert(positionRef.current.getBoundingClientRect().y)
      }
  },[])
  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
    }
  };

  const click = (item: any) => {
    if (item.name === "Map") {
      iconClick("mapClick");
    }
  };

  return (
    <div className="fixed  h-[510px] flex flex-col p-[16px] pb-[60px] px-4 top-0 w-full right-0 bg-cover bg-center">
      {children}
      <div className="hidden  max-[800px]:flex justify-between pt-6 flex-1">
        <Image
          src={LogoNew}
          width={117}
          height={48}
          style={{ height: "48px" }}
          alt="Logo Outline"
          priority
        />
        <div className="flex gap-[16px]">
          
          <div className="w-[48px] h-[48px] bg-white/20 backdrop-blur-[10px] rounded-full flex justify-center items-center">
            <Image
              src={profileBrown}
              width={20}
              height={17.5}
              alt="Logo Outline"
              onClick={() => modalClick("createAccountModal")}
              priority
            />
          </div>
          <div className="w-[48px] h-[48px] bg-white/20 backdrop-blur-[10px] rounded-full flex justify-center items-center">
            <Image
              src={MenuIcon}
              width={20}
              height={17.5}
              alt="Logo Outline"
              onClick={() => modalClick("createAccountModal")}
              priority
            />
          </div>
          {/* <Hamburger onClick={() => modalClick("LoginSignupModal")} /> */}
        </div>
      </div>
      <div className="flex flex-col h-screen overflow-auto gap-[24px] absolute top-[60px] right-[30px] no-scrollbar max-[800px]:hidden">
        {rightSideMenu.map((item, index) => {
          return (
            <div className="shadow-[0_4px_12px_rgba(0,0,0,0.1)] max-[800px]:w-full"
              key={index}
              onClick={() => {
                if (item.url == "upcoming") {
                  router.push("/eventCategory/upcoming");
                } else if (item.url == "activity") {
                  router.push("/activityCategory/all-activities");
                } else {
                  menuClick(
                    index == 3 || index == 6 ? item.id : item.url,
                    index == 3 || index == 6 ? true : false,
                    index == 3 || index == 6 ? item.url : item.id
                  );
                }
              }}>
              <div className="bg-white/20 flex flex-row items-center justify-center h-[64px] px-[16px] py-[24px] gap-[8px] rounded-lg cursor-pointer w-full bg-white/16  backdrop-blur-[20px] max-[530px]:flex-col max-[450px]:p-2">
                <Image
                  style={{
                    width: item.name == "All" ? "22px" : "auto",
                    height: item.name == "All" ? "auto" : "revert-layer",
                  }}
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="icon"
                />
                <p className="text-[14px]  w-full bg-white/20 rounded-lg py-[12px] px-[8px]  font-medium border-none">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden max-[800px]:flex justify-between gap-2">
        {rightSideMenuMobile.map((item, index) => {
          return (
            <div className="shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-full"
              key={index}
              onClick={() => {
                if (index == 3) {
                  click(item);
                } else {
                  if (item.url == "upcoming") {
                    router.push("/upcoming");
                  } else {
                    menuClick(
                      index == 2 ? item.name : item.url,
                      index == 2 ? true : false,
                      index == 2 ? item.url : item.id
                    );
                  }
                }
              }}>
              <div className="bg-white/20 flex flex-col items-center justify-center h-[64px] p-4 gap-2 rounded-lg cursor-pointer w-full bg-white/16  backdrop-blur-[20px] max-[530px]:flex-col max-[450px]:p-2">
                <Image
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="icon"
                />
                <p className="text-[14px] text-white font-medium leading-normal">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={positionRef} className="hidden max:[800px]:flex justify-center items-center mt-[8px] cursor-pointer backdrop-blur-[20px] max-[800px]:block max-[800px]:w-full">
        <button
        className="text-[14px]  w-full bg-white/20 rounded-lg py-[12px] px-[8px] text-white font-medium border-none"
          style={{ cursor: "pointer" }}
          onClick={() => menuClick("Community", true, "category-item")}>
          All Categories
        </button>
      </div>
    </div>
  );
};

export default RightSide;
