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
    const [imageData, setImageData] = useState([])
    const fetchImageData = async () => {
        try {
            const res = await Instance.post('/google-imageurl', imageArr)
            if (res?.status === 200) {
                console.log(res.data)
                setImageData(res?.data)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        if (imageArr) {
            fetchImageData()
        }
    }, [imageArr.length])
    
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
                    imageData.map((val, index) => {
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
                        : "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07"
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