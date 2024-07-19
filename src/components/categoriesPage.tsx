
"use client";

import AttractionBox from "@/components/attractionBox/page";
import EventBox from "@/components/eventBox/page";
import ExperienceBox from "@/components/experienceBox/page";
import TrendingList from "@/components/trendingList/page";
import FinancialBox from "@/components/financialBox/page";
import ScaffoldingBox from "@/components/scaffoldingBox/page";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import HeaderScreen from "@/components/header/HeaderScreen";
import SearchModalScreen from "@/components/AllModalScreen/SearchModalScreen";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ProfileMylistModalScreen from "@/components/AllModalScreen/ProfileMylistModalScreen";
import MyBookMarkModal from "@/components/AllModalScreen/MyBookMarkModal";
import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
import PlaceOrderOnlineModalScreen from "@/components/AllModalScreen/PlaceOrderOnlineModalScreen";
import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import ActivitiesModalScreen from "@/components/AllModalScreen/ActivitiesModalScreen";
import CategorieList from "@/components/categorieList/page";
import { useMyContext } from "@/app/Context/MyContext";
import { ApiResponse } from "@/app/utils/types";
 
import PageLayout from "@/app/pageLayout";
import DirectoryCategories from "@/components/DirectoryScreen/DirectoryCategories";
import { useRouter } from "next/navigation";

interface CategoriesPageProps {
    params:string,
    searchParams:string,
    data:any
}
const CategoryBody = styled.div`
  position: relative;
  z-index: 1;
  width: 480px;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";
type myBookmarktabs = "Lists" | "Events";

const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
    console.log(props.data.length)
  const params = useParams<any>();
  const router=useRouter();
  
  useEffect(()=>{
     router.prefetch("categories/" + props.params);
  },[])
  let urlData: any;
  if (params) {
    urlData = params.eventName.toString().replaceAll("%20", " ");
  } else if (params) {
    urlData = params.eventName.toString().replaceAll("%26", " ");
  }
  const options = ["Lists", "Places"];
  const mylistoptions = ["Created", "Contributed"];
  const [tabValue, setTabValue] = useState("Lists");

  const [myBookMarkState, setMyBookMarkState] = useState("Lists");
 
  const myBookmarkoptions = ["Lists", "Events"];

  const myBookmarktabChange = async (value: myBookmarktabs) => {
    setMyBookMarkState(value);
  };
  // const [showMap, setShowMap] = useState<boolean>(false);

  const tabChange = (value: tabs) => {
    setTabValue(value);
  };

  const [myListtabValue, setMyListTabValue] = useState("Created");

  const myListtabChange = (value: mylisttabs) => {
    setMyListTabValue(value);
  };

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [data, setData] = useState<ApiResponse[]>([]);

 

  useEffect(() => {
    const fetchDataAsync = async () => {
     
      try {
        const result = props.data;
        if (props.searchParams == "surfing" || props.searchParams == "ww2") {
          const combinedArray = [
            ...result.activity1,
            ...result.activity2,
          ];
          setData(combinedArray);
        } else {
          setData(result);
        }
      } catch (error: any) {
        console.log(error.message);
        
      } finally {
         
      }
    };
    if (props.searchParams !== "Directory") {
      fetchDataAsync();
    }
  }, [props.searchParams]);

  const { showMap, filterUrls } = useMyContext();
  console.log(data)
  const ImageUrlData = data?.map((item) => item?.acf?.header_image_data);
   console.log(ImageUrlData)
 const filteredUrls = filterUrls(ImageUrlData);

  const categories = () => {
    if (props.searchParams=== "Family Events" || props.params === "Events") {
      return (
        <EventBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
          loader={false}
        />
      );
    } else if (urlData === "Enjoy the sunshine") {
      return (
        <ExperienceBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
          loader={false}
        />
      );
    // } else if (
    //   urlData == "Trending Lists" ||
    //   urlData == "Jerseyisms" ||
    //   urlData == "Community" ||
    //   urlData == "Shopping" ||
    //   urlData == "Wellbeing"
    // ) {
    //   return <TrendingList urlData={search} urlTitle={urlData} />;
    // } else if (urlData === "categorieList") {
    //   return <CategorieList />;
    // } else if (search === "Directory") {
    //   return <DirectoryCategories urlData={urlData} urlTitle={urlData} />;
    // } else if (urlData === "Scaffolding") {
    //   return <ScaffoldingBox />;
    } else {
      return (
        <AttractionBox
          urlData={data}
          urlTitle={urlData}
          filteredUrls={filteredUrls}
          loader={false}
        />
      );
    }
  };

  return (
    <>
      <PageLayout>
        <CategoryBody>
          <HeaderScreen />
          {categories()}
        </CategoryBody>
      </PageLayout>
      <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen
        {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
      />
         <MyBookMarkModal
        {...{ myBookmarktabChange, myBookmarkoptions, myBookMarkState, showMap }}
      />
      <PlacesModalScreen showMap={showMap} />
      <CalenderBookDatesModalScreen showMap={showMap}/>
      <PlaceOrderOnlineModalScreen showMap={showMap}/>
      <FilterModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap}/>
      <ActivitiesModalScreen showMap={showMap}/>
      <ViewDirectionModalScreen showMap={showMap}/>
    </>
  );

};
export default CategoriesPage;


// "use client";

// import AttractionBox from "@/components/attractionBox/page";
// import EventBox from "@/components/eventBox/page";
// import ExperienceBox from "@/components/experienceBox/page";
// import TrendingList from "@/components/trendingList/page";
// import FinancialBox from "@/components/financialBox/page";
// import ScaffoldingBox from "@/components/scaffoldingBox/page";
// import { useParams } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useSearchParams } from "next/navigation";
// import HeaderScreen from "@/components/header/HeaderScreen";
// import SearchModalScreen from "@/components/AllModalScreen/SearchModalScreen";
// import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
// import ProfileMylistModalScreen from "@/components/AllModalScreen/ProfileMylistModalScreen";
// import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
// import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
// import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
// import PlaceOrderOnlineModalScreen from "@/components/AllModalScreen/PlaceOrderOnlineModalScreen";
// import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
// import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
// import ActivitiesModalScreen from "@/components/AllModalScreen/ActivitiesModalScreen";
// import CategorieList from "@/components/categorieList/page";
// import { useMyContext } from "@/app/Context/MyContext";
// import { ApiResponse } from "@/app/utils/types";
// import Instance from "@/app/utils/Instance";
// import PageLayout from "@/app/pageLayout";
// import DirectoryCategories from "@/components/DirectoryScreen/DirectoryCategories";

// interface CategoriesPageProps {
//   // Define your props here
// }
// const CategoryBody = styled.div`
//   position: relative;
//   z-index: 1;
//   width: 480px;
//   height: 100vh;
//   overflow: auto;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   @media screen and (max-width: 800px) {
//     width: 100%;
//   }
// `;
// type tabs = "Lists" | "Places";
// type mylisttabs = "Created" | "Contributed";

// const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
//   const params = useParams<any>();
//   let urlData: any;
//   if (params) {
//     urlData = params.eventName.toString().replaceAll("%20", " ");
//   } else if (params) {
//     urlData = params.eventName.toString().replaceAll("%26", " ");
//   }
//   const options = ["Lists", "Places"];
//   const mylistoptions = ["Created", "Contributed"];
//   const [tabValue, setTabValue] = useState("Lists");
//   // const [showMap, setShowMap] = useState<boolean>(false);

//   const tabChange = (value: tabs) => {
//     setTabValue(value);
//   };

//   const [myListtabValue, setMyListTabValue] = useState("Created");

//   const myListtabChange = (value: mylisttabs) => {
//     setMyListTabValue(value);
//   };

//   const searchParams = useSearchParams();

//   const search = searchParams.get("search");

//   const [data, setData] = useState<ApiResponse[]>([]);

//   const [loader, setloader] = useState(true);

//   useEffect(() => {
//     const fetchDataAsync = async () => {
//       setloader(true);
//       try {
//         const result = await Instance.get(`${search}`);
//         if (search == "surfing" || search == "ww2") {
//           const combinedArray = [
//             ...result.data.activity1,
//             ...result.data.activity2,
//           ];
//           setData(combinedArray);
//         } else {
//           setData(result.data);
//         }
//       } catch (error: any) {
//         console.log(error.message);
//         setloader(false);
//       } finally {
//         setloader(false);
//       }
//     };
//     if (search !== "Directory") {
//       fetchDataAsync();
//     }
//   }, [search]);

//   const { showMap, filterUrls } = useMyContext();
//   const ImageUrlData = data?.map((item) => item?.acf?.header_image_data);
   
//   const filteredUrls = filterUrls(ImageUrlData);

//   const categories = () => {
//     if (urlData === "Family Events" || urlData === "Events") {
//       return (
//         <EventBox
//           urlData={data}
//           urlTitle={urlData}
//           filteredUrls={filteredUrls}
//           loader={loader}
//         />
//       );
//     } else if (urlData === "Enjoy the sunshine") {
//       return (
//         <ExperienceBox
//           urlData={data}
//           urlTitle={urlData}
//           filteredUrls={filteredUrls}
//           loader={loader}
//         />
//       );
//     } else if (
//       urlData == "Trending Lists" ||
//       urlData == "Jerseyisms" ||
//       urlData == "Community" ||
//       urlData == "Shopping" ||
//       urlData == "Wellbeing"
//     ) {
//       return <TrendingList urlData={search} urlTitle={urlData} />;
//     } else if (urlData === "categorieList") {
//       return <CategorieList />;
//     } else if (search === "Directory") {
//       return <DirectoryCategories urlData={urlData} urlTitle={urlData} />;
//     } else if (urlData === "Scaffolding") {
//       return <ScaffoldingBox />;
//     } else {
//       return (
//         <AttractionBox
//           urlData={data}
//           urlTitle={urlData}
//           filteredUrls={filteredUrls}
//           loader={loader}
//         />
//       );
//     }
//   };

//   return (
//     <>
//       <PageLayout>
//         <CategoryBody>
//           <HeaderScreen />
//           {categories()}
//         </CategoryBody>
//       </PageLayout>
//       <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
//       <ProfileAccountModalScreen showMap={showMap} />
//       <ProfileMylistModalScreen
//         {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
//       />
//       <PlacesModalScreen showMap={showMap} />
//       <CalenderBookDatesModalScreen showMap={showMap} />
//       <PlaceOrderOnlineModalScreen showMap={showMap} />
//       <FilterModalScreen showMap={showMap} />
//       <EventListingModalScreen showMap={showMap} />
//       <ActivitiesModalScreen showMap={showMap} />
//       <ViewDirectionModalScreen showMap={showMap} />
//     </>
//   );
// };
// export default CategoriesPage;
