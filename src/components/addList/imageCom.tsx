import Instance from '@/app/utils/Instance';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
interface ImageComProps {
    imageArr: any[];
}
const ImageCom: React.FC<ImageComProps> = ({ imageArr }) => {

    const [imageData, setImageData] = useState<string>("https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07")

    const fetchImageData = async () => {
        if (imageArr) {
            try {
                const res = await Instance.post('/google-imageurl', imageArr)
                if (res?.status === 200) {
                    setImageData(res?.data[0])
                } else {
                    setImageData('https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FNo_Image_Available.jpg?alt=media&token=90cbe8cc-39f6-45f9-8c4b-59e9be631a07')
                }
            } catch (error) {

            }

        }

    }

    useEffect(() => {
        fetchImageData();
    }, [])
    return (
        <>
            <img src={imageData} alt="" style={{ borderRadius: 4, width:'80px',  objectFit: "cover", height: '100%' }} />
        </>
    )
}

export default ImageCom