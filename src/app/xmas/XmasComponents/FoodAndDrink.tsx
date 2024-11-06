import { BarIcon, BasketIcon, CookieIcon, CupIcon, dining, WIneIcon, winterDomes } from "../utils/XmasImagePath";
import ImageLayout from "./ImageLayout";
import ListingItems from "./ListingItems";
import Places from "./Places";

export default function FoodAndDrink()
{
    return <>
        <div id="food & drink" className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">Food & Drink</h1>
                </div>
                <div>
                    <p className="text-[16px]  leading-[20px] text-gray-400 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div>
                <ImageLayout image={winterDomes}>
                Winter Domes at Grand jersey
                </ImageLayout>
                <Places title="Open on Christmas Day"></Places>
                <Places title="Gifts & Hampers"></Places>
                <Places title="Turkey & Trimmings"></Places>
                <Places title="Christmas Do"></Places>
                <Places title="Shopping Lunch Break"></Places>
                <ListingItems data={data}></ListingItems>
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