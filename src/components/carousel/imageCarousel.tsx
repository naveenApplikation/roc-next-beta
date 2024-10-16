import { getImageData } from '@/app/screenPageApi/getImageData';
import { fallBack } from '@/app/utils/ImagePath';
import Instance from '@/app/utils/Instance';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';


interface ImageCraouselPrope {
    imageArr: any;
    imageUrl: string;
}

const ImageCarousel: React.FC<ImageCraouselPrope> = ({ imageArr, imageUrl }) => {
    // const [imageData, setImageData] = useState([])
    // console.log(imageArr)
    // const fetchImageData = async () => {
    //     try {
    //         const res =await Instance.post('/google-imageurl', imageArr)
    //         // const data = await fetch(
    //         // "http://localhost:3000/api/imageData",{
    //         //   body:imageArr}
    //         // );
    //         // console.log(data)
    //         // setImageData([])

    //         if (res?.status === 200) {
    //             console.log(res.data)
    //             setImageData(res?.data)
    //         }

    //     } catch (error) {

    //     }
    // }

    // useEffect(() => {
    //     if (imageArr) {
    //         console.log("yes")
    //         fetchImageData()
    //     }
    // }, [imageArr.length])
    
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 100 },
            items: 1,
           
        },
        mobile: {
            breakpoint: { max: 432, min: 0 },
            items: 1,
        }
    };


    return (
        imageArr.length ?
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >

                {
                    imageArr.map((val:any, index:any) => {
                        return (
                            <div
                                key={index} className="">

                                <img src={val} alt="" style={{ borderRadius: 4, maxWidth: "100%", width:'100%', height:'200px', objectFit: "cover", }} />
                                {/* <ImageWrraper
                                src={val}
                                alt="Logo"
                                width={500}
                                height={80}
                                style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
                            /> */}
                            </div>

                        )

                    })
                }
            </Carousel>
            :
            <ImageWrraper
                src={
                    imageUrl
                        ? imageUrl
                        : fallBack.src
                }
                alt="Logo"
                width={500}
                height={80}
                style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover" }}
            />
    )
}

export default ImageCarousel;



const ImageWrraper = styled(Image)`
  border-radius: 6px;
  width: 342px;
  height: 192px;
  @media screen and (max-width: 1130px) {
    height: auto;
    width: -webkit-fill-available;
  }
`;