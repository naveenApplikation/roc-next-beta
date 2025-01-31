import { getApiShoppingWithIcon, getApiWithIcon, getCategory, getDataForHome, imageOptimization } from "@/app/action";
import Event from "./Event";
import InfoApp from "@/components/homepage/InfoApp";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import Image from "next/image";
import { cycleRouteData, EnjoyShineMenuItem, shoppingImages } from "@/app/utils/data";
import CategoryList from "./CategoryList";
import { iconsHome } from "@/app/utils/homeIcon";

import { wellbeingImg } from "@/app/utils/ImagePath";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import DirectoryList from "./DirectoryList";
import Places from "./Places";
import BeachLife from "./BeachLife";

import TopAttraction from "./TopAttraction";
import { getAllPosts, getClient } from "@/lib/sanity.client";
import Blog from "./Blog";
import Header from "@/components/header/page";
import Walks from "@/components/homepage/Walks";
import { LogoIcon } from "@/app/xmas/utils/XmasImagePath";
import Sunshine from "./Sunshine";
import CreateList from "./CreateList";
import EventsByDate from "./EventsByDate";

export default async function HomeDashBoard() {

    let familyEventdata = await getCategory("upcomming-events?type=limit");
    familyEventdata = await familyEventdata.data.slice(0, 10);
    familyEventdata = await imageOptimization(familyEventdata)
    const listData = await getApiWithIcon("category", iconsHome);
    const Shoppingdata = await getApiShoppingWithIcon(
        "shopping-lists",
        shoppingImages
    );
    const eventsCategories = await getApiWithIcon("event-list", iconsHome);
    const activities = await getApiWithIcon("activity-list", iconsHome);
    const community = await getApiWithIcon("category", iconsHome);
    let Wellbeingdata = await getCategory("wellbeing-lists");
    Wellbeingdata.map((item) => {
        item.image = wellbeingImg
    })
    let localCusinedata = await getCategory("google/dine-out");

    localCusinedata = {
        name: localCusinedata?.listName,
        id: localCusinedata?._id,
        listData: localCusinedata.GoogleHomeScreenList.slice(0, 10),
    };
    let bardata = await getDataForHome("Pubs", listData[0]?._id);
    bardata = {
        name: bardata?.listName,
        id: bardata?._id,
        listData: bardata?.categoryList.slice(0, 10),
    };
    let sustainabilitydata = await getCategory("google/sustainability");
    sustainabilitydata = {
        name: sustainabilitydata[0]?.listName,
        id: sustainabilitydata[0]?._id,
        listData: sustainabilitydata[0].GoogleHomeScreenList?.slice(0, 10),
    };
    let heritagedata = await getCategory("google/heritage");
    heritagedata = {
        name: heritagedata[0]?.listName,
        id: heritagedata[0]?._id,
        listData: heritagedata[0]?.GoogleHomeScreenList?.slice(0, 10),
    };
    let cocktaildata = await getCategory("google/cocktail-bars");
    cocktaildata = {
        name: cocktaildata[0]?.listName,
        id: cocktaildata[0]?._id,
        listData: cocktaildata[0]?.GoogleFoodAndDrinksList?.slice(0, 10),
    };

    let surfingdata = await getCategory("google/surfing");
    surfingdata = {
        name: surfingdata[0]?.listName,
        id: surfingdata[0]?._id,
        listData: surfingdata[0]?.GoogleHomeScreenList?.slice(0, 10),
    };
    let beachLifedata = await getCategory("google/beach-life");
    beachLifedata = {
        name: beachLifedata[0]?.listName,
        id: beachLifedata[0]?._id,
        listData: beachLifedata[0]?.GoogleHomeScreenList?.slice(0, 10),
    };
    let topAttractionsdata = await getCategory("google/top-attraction");
    topAttractionsdata = {
        name: topAttractionsdata[0]?.listName,
        id: topAttractionsdata[0]?._id,
        listData: topAttractionsdata[0]?.GoogleHomeScreenList?.slice(0, 10),
    };
    const client = getClient();
    const post = await getAllPosts(client);
    const Walksdata = await getCategory("walks");
   
    let enjoyTheSunshinedata = await getCategory("sun-shine");
    enjoyTheSunshinedata = await enjoyTheSunshinedata.data;
    return <>
        <div className="grid grid-cols-1  gap-[24px] pb-[200px]">
            <Header></Header>
            <SearchNFilter />
            <InfoApp></InfoApp>
            <Event nav="/eventCategory/upcoming" title="Upcoming Events" data={familyEventdata}></Event>
            <CategoryList title="Trending Lists" data={community} nav="/Places/Trending Lists"></CategoryList>
            <CreateList></CreateList>
            <Places title={localCusinedata.name} nav={`/Places/${localCusinedata.name}/${localCusinedata.id}`} data={localCusinedata.listData}></Places>

            <Sunshine title="Enjoy the Sunshine" data={enjoyTheSunshinedata} nav={"/activityCategory/enjoy the sunshine"}></Sunshine>
            <EventsByDate></EventsByDate>
            <BeachLife data={beachLifedata.listData} nav={`/Places/${beachLifedata.name}/${beachLifedata.id}`} title={beachLifedata.name}></BeachLife>
            <DirectoryList></DirectoryList>
            <Places title={bardata.name} nav={`/Places/${bardata.name}/${bardata.id}`} data={bardata.listData}></Places>

            <CategoryList title="shopping" data={Shoppingdata} nav="/Places/Shopping"></CategoryList>
            <CategoryList title="Event Categories" data={eventsCategories} nav="/eventCategory"></CategoryList>
            <CategoryList title="Activity Categories" data={activities} nav="/activityCategory"></CategoryList>
            <CategoryList title="Community Latest" data={community} nav="/Places/Community"></CategoryList>
            <Places title={sustainabilitydata.name} nav={`/Places/${sustainabilitydata.name}/${sustainabilitydata.id}`} data={sustainabilitydata.listData}></Places>
            <Places title={heritagedata.name} nav={`/Places/${heritagedata.name}/${heritagedata.id}`} data={heritagedata.listData}></Places>
            <Walks data={Walksdata} ></Walks>

            <CategoryList title="Wellbeing" data={Wellbeingdata} nav="/Places/Wellbeing"></CategoryList>
            <Places title={"Out Out"} nav={`/Places/${cocktaildata.name}/${cocktaildata.id}`} data={cocktaildata.listData}></Places>

            <CycleRoutes></CycleRoutes>
            <Places title={surfingdata.name} nav={`/Places/${surfingdata.name}/${surfingdata.id}`} data={surfingdata.listData}></Places>
            <TopAttraction data={topAttractionsdata.listData} nav={`/Places/${topAttractionsdata.name}/${topAttractionsdata.id}`} title={topAttractionsdata.name}></TopAttraction>
            <Blog title="Jersey Feed" data={post} nav="/blog"></Blog>
            <div className="flex px-[20px] justify-center w-full py-[8px] mt-[30px] ">
                <Image
                    src={LogoIcon}
                    alt=""
                    height={32}
                    width={120}
                ></Image>
            </div>
        </div>
    </>
}