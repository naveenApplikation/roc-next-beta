import Instance from '@/app/utils/Instance';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
interface ImageComProps {
    imageArr: any[];
}
const ImageCom: React.FC<ImageComProps> = ({ imageArr }) => {

    const [imageData, setImageData] = useState<string>("")

    const fetchImageData = async () => {
        if (imageArr) {
            try {
                const res = await Instance.post('/google-imageurl', imageArr)
                if (res?.status === 200) {
                    setImageData(res?.data[0])
                } else {
                    setImageData('')
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
            <img src={imageData} alt="" style={{ borderRadius: 4, maxWidth: "100%", objectFit: "cover", height: '100%' }} />
        </>
    )
}

export default ImageCom