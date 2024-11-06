'use server'

export async function getCarouselData()
{

    try
    {
         let response=await fetch('https://v1.nocodeapi.com/cfroc/google_sheets/ypRtytgskBQhFsSP?tabId=api_carousel')
         response=await response.json() 
         return response
         

    }
    catch(error)
    {
          return []
    }
}