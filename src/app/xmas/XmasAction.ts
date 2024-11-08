'use server'

export async function getCarouselData()
{

    try
    {
         let response=await fetch(`${process.env.NEXT_API_URL}/carousel`)
         response=await response.json() 
         return response
         

    }
    catch(error)
    {
          return []
    }
}


export async function getHighlights()
{
      try
      {
          let response=await fetch(`${process.env.NEXT_API_URL}/highlight`)
          response=await response.json()
          return response
      }
      catch(error)
      {
         return []
      }
}
export async function getCategory(type:string)
{
    try
    {
         let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas-event-${type}-category`)
         response=await response.json()
         return response
    }
    catch(e)
    {
       return []
    }
}

export async function getFoodandDrinks(type:String){
    try {
        let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas/${type}/foodAndDrinks-Category`)
         response=await response.json()
         return response
    } catch (e) {
        return []
    }
}

export async function getShopCategory(type:String){
    try {
        let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas/${type}/shopCategory  `)
         response=await response.json()
         return response
    } catch (e) {
        return []
    }
}

export async function getAds()
{
     try
     {
         let response=await fetch(`${process.env.NEXT_API_URL}/advertisement`)
         response=await response.json()
         return response
     }
     catch(error)
     {
         return []
     }
}


export async function getXmasEvents()
{
     try
     {
         let response=await fetch(`${process.env.NEXT_API_URL}/x-mas-events?limit=true`)
         response=await response.json()
         return response
     }
     catch(error)
     {
         return []
     }
}
