
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/Context/MyContext";
import Instance from "@/app/utils/Instance";
import { icons } from "@/app/utils/iconList";
import { ApiResponse } from "@/app/utils/types";
import { iconsHome } from "@/app/utils/homeIcon";


const SearchNFilter = dynamic(() => import("@/components/homepage/SearchNFilter"), { ssr: false })
const InfoApp = dynamic(() => import("@/components/homepage/InfoApp"), { ssr: false })
const LocalCusine = dynamic(() => import("@/components/homepage/LocalCusine"), { ssr: false })
const FamilyEvent = dynamic(() => import("@/components/homepage/FamilyEvent"), { ssr: false })
const EnjoyTheSunshine = dynamic(() => import("@/components/homepage/EnjoyTheSunshine"), { ssr: false })
const TrendingList = dynamic(() => import("@/components/homepage/TrendingList"), { ssr: false })
const TopAttractions = dynamic(() => import("@/components/homepage/TopAttractions"), { ssr: false })
const Directory = dynamic(() => import("@/components/homepage/Directory"), { ssr: false })
const Bars = dynamic(()=>import("@/components/homepage/Bars"))
const Shopping = dynamic(() => import("@/components/homepage/Shopping"), { ssr: false })
const Community = dynamic(() => import("@/components/homepage/Community"), { ssr: false })
const BeachLife = dynamic(() => import("@/components/homepage/BeachLife"), { ssr: false })
const Sustainability = dynamic(() => import("@/components/homepage/Sustainability"), { ssr: false })
const Heritage = dynamic(() => import("@/components/homepage/Heritage"), { ssr: false })
const Walks = dynamic(() => import("@/components/homepage/Walks"), { ssr: false })
const Wellbeing = dynamic(() => import("@/components/homepage/Wellbeing"), { ssr: false })
const WW2 = dynamic(() => import("@/components/homepage/WW2"), { ssr: false })
// const CycleRoutes = dynamic(() => import("@/components/homepage/DeliciousDine"), { ssr: false })
const CycleRoutes = dynamic(() => import("@/components/homepage/CycleRoutes"), { ssr: false })
const Outout = dynamic(() => import("@/components/homepage/Outout"), { ssr: false })
const Surfing = dynamic(() => import("@/components/homepage/Surfing"), { ssr: false })
const CommonButton = dynamic(() => import("@/components/button/CommonButton"), { ssr: false })

const LeaveFeedbackButton = styled.div`
padding-left: 40px;
padding-right: 40px;
  padding-bottom: 20px;
`;

const DashBoard = () => {
  const specificSectionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  // const loginToke = window.localStorage.getItem('loginToken')
  const { showMap, modalClick, dataDetails } = useMyContext();
  const [listData, setListData] = useState<any>([]);
  const [loader, setloader] = useState(true);

  const fetchDataAsync:any = async () => {
    setloader(true);
    try {
      const response = await Instance.get("/category?limit=10")
      if (response.status === 200) {
        response.data.forEach((list: any) => {
          const matchedIcon = iconsHome.find(icon => icon.name === list.iconName);
          if (matchedIcon) {
            list.image = matchedIcon.image;
          }
        })
        setListData(response?.data)
      } else {
        setListData([])

      }
    } catch (error) {
      setloader(false);
      setListData([])
    }finally {
      setloader(false);
    }
  }

  const menuClick = (item: any, condition?: boolean, id?: any) => {
    if (condition) {
      router.push(`/categories/${item}?search=${id}`);
    } else if (item === "directoryList") {
      router.push("/screens/directoryList");
    } else if (item === "AddToCreate") {
      router.push("/screens/createList");
    } else if (item === "CategorieList") {
      router.push("/screens/categorieList");
    } else if (item === "TrendingList") {
      router.push("/screens/trendingList");
    } else if (item === "LeaveFeedback") {
      window.open("https://forms.gle/rMb2fNQPgHiSWPBq7")
    } else {
      router.push(`/screens/${item}?categoryID=${id}`);
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

  useEffect(() => {
    fetchDataAsync()
    // homeGooglefetchDataAsync();
  }, []);

  return (
    <>
      <SearchNFilter menuClick={menuClick} modalClick={modalClick} />
      <InfoApp menuClick={menuClick} modalClick={modalClick} {...{ showMap }} />
      <LocalCusine menuClick={menuClick} modalClick={modalClick}/>
      <FamilyEvent menuClick={menuClick} modalClick={modalClick} />
      <EnjoyTheSunshine menuClick={menuClick} modalClick={modalClick} />
      <TrendingList menuClick={menuClick} modalClick={modalClick} {...{ listData }} loader={loader} />
      <TopAttractions menuClick={menuClick} modalClick={modalClick}/>
      <Directory menuClick={menuClick} modalClick={modalClick} />
      <Bars menuClick={menuClick} modalClick={modalClick} listData={listData[0]?._id} loader={loader} />
      <Shopping menuClick={menuClick} modalClick={modalClick} />
      <BeachLife menuClick={menuClick} modalClick={modalClick} />
      <Community menuClick={menuClick} modalClick={modalClick} {...{ listData }} loader={loader} />
      <Sustainability menuClick={menuClick} modalClick={modalClick} />
      {/* <Jerseyisms menuClick={menuClick} modalClick={modalClick} /> not working */}
      <Heritage menuClick={menuClick} modalClick={modalClick} />
      <Walks menuClick={menuClick} modalClick={modalClick} />
      <Wellbeing menuClick={menuClick} modalClick={modalClick} />
      <WW2 menuClick={menuClick} modalClick={modalClick} />
      {/* <DeliciousDine menuClick={menuClick} modalClick={modalClick} /> not working */}
      <Outout menuClick={menuClick} modalClick={modalClick}/>
      <CycleRoutes menuClick={menuClick} modalClick={modalClick} />
      <Surfing menuClick={menuClick} modalClick={modalClick}/>
      
      <LeaveFeedbackButton onClick={() => menuClick("LeaveFeedback")}>
        <CommonButton text="Leave feedback" />
      </LeaveFeedbackButton>
      {/* <BetaExploreModal /> */}
    </>
  );
};
export default DashBoard;
// export default DashBoard;
