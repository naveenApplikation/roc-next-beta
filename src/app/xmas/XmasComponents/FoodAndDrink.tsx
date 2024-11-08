import { Fragment } from "react";
import { BarIcon, BasketIcon, CookieIcon, CupIcon, dining, WIneIcon, winterDomes } from "../utils/XmasImagePath";
import { getFoodandDrinks } from "../XmasAction";
import ImageLayout from "./ImageLayout";
import ListingItems from "./ListingItems";
import Places from "./Places";

export default async function FoodAndDrink({ads}:{ads:any})
{

    const foodAndDrinkData=await getFoodandDrinks('main')
     const foodAndDrinkCategory=await getFoodandDrinks('secondary')
     const FoodAndDrinkItems=()=>{
          return foodAndDrinkData.map((data,index)=>{
          return  <Fragment key={index}>
<Places  nav={`/screens/${data.category.listName}?categoryID=${data.category._id}`} data={data.category.PeopleCommunityList} title={data.title} ></Places>

          </Fragment>
          })
     }
    return <>
        <div id="food & drink" className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">Food & Drink</h1>
                </div>
                <div>
                    <p className="text-[16px]  leading-[20px] text-gray-400 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div>
                <ImageLayout data={ads}>
                    {ads?.title}
                </ImageLayout>
              <FoodAndDrinkItems></FoodAndDrinkItems>
            
                <ListingItems title="food" data={foodAndDrinkCategory}></ListingItems>
         </div>
    </>
}




const data=[{
    content:"Restaurants",
    image:dining
},
{
    content:"Bars & Nightlife",
    image:BarIcon
},

{
    content:"Café & Lunch",
    image:CupIcon
},
{
    content:"Bakeries & Sweet Treats",
    image:CookieIcon
},
{
    content:"Farmers & Artisan",
    image:BasketIcon
},
{
    content:"Wines & Spirits",
    image:WIneIcon

}
]