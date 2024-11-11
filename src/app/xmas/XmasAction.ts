'use server'
 
export async function getCarouselData()
{

    try
    {
         let response=await fetch(`${process.env.NEXT_API_URL}/carousel`,{
            next:{revalidate:14400}
         })
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
          let response=await fetch(`${process.env.NEXT_API_URL}/highlight`,{
            next:{revalidate:14400}
         })
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
         let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas-event-${type}-category`,{
            next:{revalidate:14400 }
         })
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
        let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas/${type}/foodAndDrinks-Category`,{
            next:{revalidate:14400 }
         })
         response=await response.json()
         return response
    } catch (e) {
        return []
    }
}

export async function getShopCategory(type:String){
    try {
        let response:any=await fetch(`${process.env.NEXT_API_URL}/X-Mas/${type}/shopCategory`,{
            next:{revalidate:14400 }
         })
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
         let response=await fetch(`${process.env.NEXT_API_URL}/advertisement`,{
            next:{revalidate:14400 }
         })
         response=await response.json()
         return response
     }
     catch(error)
     {
         return []
     }
}


export async function getXmasEvents(params:string)
{
     try
     {
         let response=await fetch(`${process.env.NEXT_API_URL}/${params}`,{
            next:{revalidate:14400 }
         })
         response=await response.json()
         return response
     }
     catch(error)
     {
         return []
     }
}
