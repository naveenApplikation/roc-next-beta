import { ClothingIcon, dining, drinks, ElectonicIcon, FitnessIcon, FootIcon, GiftBoxIcon, GiftIcon, hearts, HomeDecorIcon, JewelIcon, lipIcon, ShoppingLayout, smily, ToysIcon } from "../utils/XmasImagePath";
import ImageLayout from "./ImageLayout";
import ListingItems from "./ListingItems";
import Places from "./Places";


export default function Shopping(){
     return <>
             
            <div className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">Shopping</h1>
                </div>
                <div>
                    <p className="text-[16px]  leading-[20px] text-gray-500 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div>
                <ImageLayout image={ShoppingLayout}>
                   Coop Bikes: Your family bike shop
                </ImageLayout>
                <Places title="Artisan & Personalised"></Places>
                <Places title="Toy Shops"></Places>
                <Places title="Christmas trees and decorations"></Places>
                <ListingItems data={data}></ListingItems>
            </div>
     </>
}


const data=[{
    content:"Women’s Clothing",
    image:ClothingIcon
},
{
    content:"Men’s Clothing",
    image:ClothingIcon
},
{
    content:"Kids Clothing",
    image:ClothingIcon
},
{
    content:"Footwear",
    image:FootIcon
},
{
    content:"Beauty & Fragrances",
    image:lipIcon
},
{
    content:"Gourmet Gifts",
    image:GiftIcon
},
{
    content:"Jewellery & Watches",
    image:JewelIcon
},
{
    content:"Electronics & Tech",
    image:ElectonicIcon
},
{
    content:"Toys",
    image:ToysIcon
},
{
    content:"Artisan & Personalised",
    image:GiftBoxIcon
},
{
    content:"Home & Décor",
    image:HomeDecorIcon
},
{
    content:"Fitness & Outdoors",
    image:FitnessIcon
},


]