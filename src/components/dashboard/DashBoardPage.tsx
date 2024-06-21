import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchNFilter from "@/components/homepage/SearchNFilter";
import InfoApp from "@/components/homepage/InfoApp";
import LocalCusine from "@/components/homepage/LocalCusine";
import FamilyEvent from "@/components/homepage/FamilyEvent";
import EnjoyTheSunshine from "@/components/homepage/EnjoyTheSunshine";
import TrendingList from "@/components/homepage/TrendingList";
import TopAttractions from "@/components/homepage/TopAttractions";
import Directory from "@/components/homepage/Directory";
import Bars from "@/components/homepage/Bars";
import Shopping from "@/components/homepage/Shopping";
import Community from "@/components/homepage/Community";
import BeachLife from "@/components/homepage/BeachLife";
import Sustainability from "@/components/homepage/Sustainability";
import Heritage from "@/components/homepage/Heritage";
import Walks from "@/components/homepage/Walks";
import Wellbeing from "@/components/homepage/Wellbeing";
import WW2 from "@/components/homepage/WW2";
import CycleRoutes from "@/components/homepage/CycleRoutes";
import DeliciousDine from "@/components/homepage/DeliciousDine";
import Outout from "@/components/homepage/Outout";
import Surfing from "@/components/homepage/Surfing";
import CommonButton from "@/components/button/CommonButton";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import { ApiResponse } from "@/app/utils/types";
import { iconsHome } from "@/app/utils/homeIcon";
import { shoppingImages } from "@/app/utils/data";
import { getApi,getApiWithIcon,getData } from "@/app/action";
import { walkData } from "@/app/utils/data";
import LeaveFeedbackButton from '@/components/homepage/LeaveFeedbackButton'

const DashBoard = async() => {
  // const specificSectionRef = useRef<HTMLDivElement>(null);

  // const router = useRouter();
  // const loginToke = window.localStorage.getItem('loginToken')
  // const { showMap, modalClick, dataDetails } = useMyContext();
  // const [listData, setListData] = useState<any>([]);
  // const [loader, setloader] = useState(true);

  // const fetchDataAsync:any = async () => {
  //   setloader(true);
  //   try {
  //     const response = await Instance.get("/category?limit=10")
  //     if (response.status === 200) {
  //       response.data.forEach((list: any) => {
  //         const matchedIcon = iconsHome.find(icon => icon.name === list.iconName);
  //         if (matchedIcon) {
  //           list.image = matchedIcon.image;
  //         }
  //       })
  //       setListData(response?.data)
  //     } else {
  //       setListData([])

  //     }
  //   } catch (error) {
  //     setloader(false);
  //     setListData([])
  //   }finally {
  //     setloader(false);
  //   }
  // }

  // const handleClick = (event: MouseEvent) => {
  //   if (
  //     specificSectionRef.current &&
  //     !specificSectionRef.current.contains(event.target as Node)
  //   ) {
  //   }
  // };
  // useEffect(() => {
  //   document.body.addEventListener("click", handleClick);
  //   return () => {
  //     document.body.removeEventListener("click", handleClick);
  //   };
  // }, []);

  // const [data, setData] = useState<ApiResponse[]>([]);

  // const [homeGoogleLoader, setHomeGoogleLoader] = useState(true);

  // const homeGooglefetchDataAsync = async () => {
  //   setHomeGoogleLoader(true);
  //   try {
  //     const result = await Instance.get("/homescreen-google");
  //     setData(result.data);
  //   } catch (error: any) {
  //     console.log(error.message);
  //     setHomeGoogleLoader(false);
  //   } finally {
  //     setHomeGoogleLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataAsync()
  //   // homeGooglefetchDataAsync();
  // }, []);

  const listData = await getApiWithIcon("category",iconsHome);
  const LocalCusinedata = await getApi("google/dine-out");
  const familyEventdata = await getApi("family-events");
  const EnjoyTheSunshinedata = await getApi("sun-shine");
  const TopAttractionsdata = await getApi("google/top-attraction");
  const bardata = await getData("Pubs",listData[0]?._id);
  const Shoppingdata = await getApiWithIcon("shopping-lists",shoppingImages);
  const beachLifedata = await getApi("google/beach-life");
  const sustainabilitydata = await getApi("google/sustainability");
  const Heritagedata = await getApi("google/heritage");
  const Walksdata = await getApi("walks");
  const Wellbeingdata = await getApi("wellbeing-lists");
  const Cocktaildata = await getApi("google/cocktail-bars");
  const Surfingdata = await getApi("google/surfing");

  return (
    <>
      <SearchNFilter  />
      <InfoApp  />
      <LocalCusine data={LocalCusinedata} />
      <FamilyEvent data={familyEventdata} />
      <EnjoyTheSunshine data={EnjoyTheSunshinedata} />
      <TrendingList {...{ listData }} />
      <TopAttractions data={TopAttractionsdata[0]}/>
      <Directory />
      <Bars dataPubs={bardata}  />
      <Shopping {...{ Shoppingdata }} />
      <BeachLife data={beachLifedata[0]}  />
      <Community  {...{ listData }} />
      <Sustainability data={sustainabilitydata[0]} />
      <Heritage data={Heritagedata[0]}  />
      <Walks data={Walksdata}   />
      <Wellbeing data={Wellbeingdata}  />
      <Outout data={Cocktaildata[0]} />
      <CycleRoutes  />
      <Surfing data={Surfingdata[0]} />
      <LeaveFeedbackButton />
      {/* <BetaExploreModal /> */}
    </>
  );
};
export default DashBoard;
// export default DashBoard;
