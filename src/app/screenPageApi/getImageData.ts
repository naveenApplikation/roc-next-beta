'use server'
import axios from 'axios'
import {cache} from 'react'
export const getImageData = cache(async(imageArray:any) => {
 
     const res = await axios.post(
       "https://beta-dot-roc-app-425011.nw.r.appspot.com/google-imageurl",
        imageArray
     );
     console.log(await res.data)
     return await res.data

 });