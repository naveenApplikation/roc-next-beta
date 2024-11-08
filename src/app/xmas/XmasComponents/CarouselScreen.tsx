"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { RocLogoIcon } from "../utils/XmasImagePath";
import { MenuIcon } from "@/app/utils/ImagePath";

import "../style.css";
import { transform } from "lodash";
import { useMyContext } from "@/app/Context/MyContext";
import { useRouter } from "next-nprogress-bar";
import { convertGCSUrl } from "@/app/utils/commanFun";
import fallback from "../../../../assets/images/fallbackimage.png";
const filterUrls = (ImageUrlData: any) => {
  const imageUrls: string[] = [];
  ImageUrlData?.forEach((item: any) => {
    if (item) {
      try {
        const jsonData = JSON.parse(item);
        const url = jsonData[0]?.url; // Use optional chaining to avoid errors if jsonData[0] is undefined

        if (url && (url.endsWith(".jpg") || url.endsWith(".png"))) {
          imageUrls.push(convertGCSUrl(url));
        } else {
          imageUrls.push(fallback.src); // Push default image URL if URL is not valid
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        imageUrls.push(fallback.src); // Push default image URL if JSON parsing fails
      }
    } else {
      imageUrls.push(fallback.src); // Push default image URL if item is undefined
    }
  });
  return imageUrls;
};

const Carousel = ({ slides }) => {
  const router = useRouter();

  const { modalClick } = useMyContext();

  const navigate = (type: string, item: any) => {
    console.log(item);
    switch (type) {
      case "event":
        const filteredUrls = filterUrls([item.event_id.acf.header_image_data]);
        console.log(filteredUrls);
        modalClick(
          "eventListing",
          {
            acf: item.event_id.acf,
          },
          filteredUrls[0] ? filteredUrls[0] : fallback
        );
        break;
      case "iframe":
        router.push(`/xmas/iframe/carousel/${item?._id}`);
        break;
      case "eventCategory":
        router.push(`/eventCategory/${item?.category_id}`);

        break;
      case "place":
        modalClick(
          "eventListing",
          item,
          item?.data_type === "google" ? item?.photoUrl : fallback
        );
        break;
      default:
        router.push("/xmas");
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 5000; // 4 seconds

  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    // Auto-scroll to the next slide every 4 seconds
    const interval = setInterval(() => {
      goToNext();
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    console.log(e);
    touchStartX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 50) {
      goToNext();
    }
    if (touchStartX - touchEndX < -50) {
      goToPrevious();
    }
  };

  const RenderImage = () => {
    return (
      <>
        <div
          className="carousel-container absolute w-full h-full top-0 max-w-[100%] mx-auto overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() =>
            navigate(slides[currentIndex].link_type, slides[currentIndex])
          }
        >
          <div
            className="carousel-inner flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 max-[800px]:w-[100%]">
                <Image
                  height={510}
                  width={1000}
                  src={slide.img_url}
                  alt=""
                  className="w-full h-[510px] object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="min-[800px]:hidden fixed  top-0 h-[550px] w-full z-[1]">
        <RenderImage></RenderImage>
        {/* <button onClick={goToPrevious} className="absolute  left-0 top-[45%] transform -translate-y-1/2 bg-black/30 text-white p-2">
        ‹
      </button>
      <button onClick={goToNext} className="absolute right-0   top-[45%] transform -translate-y-1/2 bg-black/30 text-white p-2">
        ›
      </button> */}
        <div className="w-full fixed top-0 flex justify-between items-center  px-[24px] pt-[30px]">
          <Image
            src={RocLogoIcon}
            alt=""
            height={500}
            width={500}
            className="w-[117px] h-[48px]"
            onClick={() => router.push("/")}
          ></Image>
          <div
            onClick={() => modalClick("createAccountModal")}
            className="flex bg-[#F40035] rounded-[10px]  justify-between gap-[8px] items-center px-[10px] py-[9px]"
          >
            <p className="text-[15px] text-white font-[700]">Xmas Guide</p>
            <Image
              src={MenuIcon}
              alt=""
              height={500}
              width={500}
              className="relative h-[16px] w-[20px]"
            ></Image>
          </div>
        </div>

        <div
          style={{ color: `'#fff` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() =>
            navigate(slides[currentIndex].link_type, slides[currentIndex])
          }
          className="backdropEffect"
        >
          <p className={`font-[400] ${"text-white"} text-[18px]`}>
            {slides[currentIndex].date}
          </p>
          <p
            className={`font-[550] ${"text-white"} text-[22px] leading-[25px]`}
          >
            {slides[currentIndex].title.split(" ").map((item, index) => {
              if (index == 2 && currentIndex != 2) {
                return (
                  <span className="text-white" key={index}>
                    {item + " "}
                    <br />{" "}
                  </span>
                );
              } else {
                return <Fragment key={index}>{item + " "}</Fragment>;
              }
            })}
          </p>
          <div>
            <p className={`text-[16px] ${"text-white"} font-[500]`}>
              View Details
            </p>
          </div>
          <div className="flex flex-row gap-[5px] p-[4px] w-[100px]">
            {slides.map((_, index) => {
              return (
                <div
                  key={index}
                  className={`${index === currentIndex ? "bg-white" : "bg-gray-500 "} w-full h-[3px] rounded-[100px]`}
                ></div>
              );
            })}
            {/* <div className='bg-white w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div>
                                    <div className='bg-gray-500 w-full h-[3px] rounded-[100px]'></div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
