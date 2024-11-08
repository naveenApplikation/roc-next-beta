 
import { Fragment } from "react";
import { ElectonicIcon, FitnessIcon, FootIcon, GiftBoxIcon, GiftIcon, HomeDecorIcon, JewelIcon, kidsClothingIcon, lipIcon, MenClothingIcon, ShoppingLayout, ToysIcon, WomenClothingIcon } from "../utils/XmasImagePath";
import { getShopCategory } from "../XmasAction";
import ImageLayout from "./ImageLayout";
import ListingItems from "./ListingItems";
import Places from "./Places";


export default async function Shopping({ads}:{ads:any}){

        const shoppingData=await getShopCategory("main")
        const ShoppingItems=()=>{
            return  shoppingData.map((data,index)=>{
              return  <Fragment key={index}>
                <Places   nav={`/screens/${data.category.listName}?categoryID=${data.category._id}`} data={data.category.PeopleCommunityList} title={data.title} ></Places>
  
                </Fragment>
            })
       }
        const categoryList=await getShopCategory('secondary')
        
     return <>
             
            <div id="shopping" className="grid grid-cols-1  px-[20px] py-[24px] gap-[16px]">
                <div className="">
                    <h1 className="text-[#F40035] text-[32px] font-[900] ">Shopping</h1>
                </div>
                <div>
                    <p className="text-[16px]  leading-[20px] text-gray-500 font-[500] overflow-hidden  text-ellipsis line-clamp-2">St Helier late night shopping until 9pm on Thursdays through to 23 December.</p>
                </div>
                <ImageLayout data={ads}>
                {ads?.title}
                </ImageLayout>
                 
                <ShoppingItems></ShoppingItems>
                <ListingItems title="shopping" data={categoryList}></ListingItems>
            </div>
     </>
}


const data=[{
    content:"Women’s Clothing",
    image:WomenClothingIcon
},
{
    content:"Men’s Clothing",
    image:MenClothingIcon
},
{
    content:"Kids Clothing",
    image:kidsClothingIcon
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