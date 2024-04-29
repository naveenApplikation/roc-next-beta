import React, { useEffect, useRef } from "react";
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
import Jerseyisms from "@/components/homepage/Jerseyisms";
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



const LeaveFeedbackButton = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 20px;
`

const DashBoard= () => {
  const specificSectionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const {showMap,modalClick} = useMyContext()

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else if (item === "Dine") {
      router.push("/screens/ecoDining");
    } else if (item === "Shop") {
      router.push("/screens/wellbeing");
    } else if (item === "Events") {
      router.push("/screens/events");
    } else if (item === "Tours") {
      router.push("/screens/stays");
    } else if (item === "Hotels") {
      router.push("/screens/scaffolding");
    } else if (item === "Activities") {
      router.push("/screens/experiences");
    } else if (item === "Travel") {
      router.push("/screens/attractions");
    } else if (item === "Nightlife") {
      router.push("/screens/financial");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (
      specificSectionRef.current &&
      !specificSectionRef.current.contains(event.target as Node)
    ) {
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <SearchNFilter menuClick={menuClick} modalClick={modalClick} />
      <InfoApp menuClick={menuClick} modalClick={modalClick} />
      <LocalCusine menuClick={menuClick} modalClick={modalClick} />
      <FamilyEvent menuClick={menuClick} modalClick={modalClick} />
      <EnjoyTheSunshine menuClick={menuClick} modalClick={modalClick} />
      <TrendingList menuClick={menuClick} modalClick={modalClick} />
      <TopAttractions menuClick={menuClick} modalClick={modalClick} />
      <Directory menuClick={menuClick} modalClick={modalClick} />
      <Bars menuClick={menuClick} modalClick={modalClick} />
      <Shopping menuClick={menuClick} modalClick={modalClick} />
      <Community menuClick={menuClick} modalClick={modalClick} />
      <BeachLife menuClick={menuClick} modalClick={modalClick} />
      <Sustainability menuClick={menuClick} modalClick={modalClick} />
      <Jerseyisms menuClick={menuClick} modalClick={modalClick} />
      <Heritage menuClick={menuClick} modalClick={modalClick} />
      <Walks menuClick={menuClick} modalClick={modalClick} />
      <Wellbeing menuClick={menuClick} modalClick={modalClick} />
      <WW2 menuClick={menuClick} modalClick={modalClick} />
      <CycleRoutes menuClick={menuClick} modalClick={modalClick} />
      <DeliciousDine menuClick={menuClick} modalClick={modalClick} />
      <Outout menuClick={menuClick} modalClick={modalClick} />
      <Surfing menuClick={menuClick} modalClick={modalClick} />
      <LeaveFeedbackButton onClick={() => menuClick("AddToCreate")}>
        <CommonButton text="Leave feedback" />
      </LeaveFeedbackButton>
    </>
  );
};
export default DashBoard;
// export default DashBoard;
