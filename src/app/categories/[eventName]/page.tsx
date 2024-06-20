"use client"

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import { useMyContext } from "@/app/Context/MyContext";
import { ApiResponse } from '@/app/utils/types';
import Instance from "@/app/utils/Instance";
import PageLayout from '@/app/pageLayout';
import dynamic from 'next/dynamic';


const AttractionBox = dynamic(() => import("@/components/attractionBox/page"), { ssr: false })
const EventBox = dynamic(() => import("@/components/eventBox/page"), { ssr: false })
const ExperienceBox = dynamic(() => import("@/components/experienceBox/page"), { ssr: false })
const TrendingList = dynamic(() => import("@/components/trendingList/page"), { ssr: false })
const ScaffoldingBox = dynamic(() => import("@/components/scaffoldingBox/page"), { ssr: false })
const HeaderScreen = dynamic(() => import("@/components/header/HeaderScreen"), { ssr: false })
const SearchModalScreen = dynamic(() => import("@/components/AllModalScreen/SearchModalScreen"), { ssr: false })
const ProfileAccountModalScreen = dynamic(() => import("@/components/AllModalScreen/ProfileAccountModalScreen"), { ssr: false })
const ProfileMylistModalScreen = dynamic(() => import("@/components/AllModalScreen/ProfileMylistModalScreen"), { ssr: false })
const PlacesModalScreen = dynamic(() => import("@/components/AllModalScreen/PlacesModalScreen"), { ssr: false })
const ViewDirectionModalScreen = dynamic(() => import("@/components/AllModalScreen/ViewDirectionModalScreen"), { ssr: false })
const CalenderBookDatesModalScreen = dynamic(() => import("@/components/AllModalScreen/CalenderBookDatesModalScreen"), { ssr: false })
const PlaceOrderOnlineModalScreen = dynamic(() => import("@/components/AllModalScreen/PlaceOrderOnlineModalScreen"), { ssr: false })
const FilterModalScreen = dynamic(() => import("@/components/AllModalScreen/FilterModalScreen"), { ssr: false })
const EventListingModalScreen = dynamic(() => import("@/components/AllModalScreen/EventListingModalScreen"), { ssr: false })
const ActivitiesModalScreen = dynamic(() => import("@/components/AllModalScreen/ActivitiesModalScreen"), { ssr: false })
const CategorieList = dynamic(() => import("@/components/categorieList/page"), { ssr: false })
const DirectoryCategories = dynamic(() => import("@/components/DirectoryScreen/DirectoryCategories"), { ssr: false })

interface CategoriesPageProps {
  // Define your props here
}

type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";

const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
  const params = useParams<any>()
  let urlData: any
  if (params) {
    urlData = (params.eventName).toString().replaceAll("%20", " ")
  } else if (params) {
    urlData = (params.eventName).toString().replaceAll("%26", " ")
  }
  const options = ["Lists", "Places"];
  const mylistoptions = ["Created", "Contributed"];
  const [tabValue, setTabValue] = useState("Lists");
  // const [showMap, setShowMap] = useState<boolean>(false);

  const tabChange = (value: tabs) => {
    setTabValue(value);
  };

  const [myListtabValue, setMyListTabValue] = useState("Created");


  const myListtabChange = (value: mylisttabs) => {
    setMyListTabValue(value);
  };

  const searchParams = useSearchParams()

  const search = searchParams.get('search')

  const [data, setData] = useState<ApiResponse[]>([]);

  const [loader, setloader] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setloader(true);
      try {
        const result = await Instance.get(`${search}`);
        if (search == "surfing" || search == "ww2") {
          const combinedArray = [...result.data.activity1, ...result.data.activity2];
          setData(combinedArray);
        } else {
          setData(result.data);
        }

      } catch (error: any) {
        console.log(error.message);
        setloader(false);
      } finally {
        setloader(false);
      }
    };
    if(search !== "Directory"){
      fetchDataAsync();
    }
  }, [search]);

  const { showMap, filterUrls } = useMyContext()

  const ImageUrlData = data?.map((item) => item?.acf?.header_image_data);

  const filteredUrls = filterUrls(ImageUrlData);

  const categories = () => {
    if (urlData === "Family Events" || urlData === "Events") {
      return <EventBox urlData={data} urlTitle={urlData} filteredUrls={filteredUrls} loader={loader} />
    } else if (urlData === "Enjoy the sunshine") {
      return <ExperienceBox urlData={data} urlTitle={urlData} filteredUrls={filteredUrls} loader={loader} />
    } else if (urlData == "Trending Lists" || urlData == "Jerseyisms" || urlData == "Community" || urlData == "Shopping" || urlData == "Wellbeing" ) {
      return <TrendingList urlData={search} urlTitle={urlData} />
    } else if (urlData === "categorieList") {
      return <CategorieList />
    } else if (search === "Directory") {
      return <DirectoryCategories urlData={urlData} urlTitle={urlData} />
    } else if (urlData === "Scaffolding") {
      return <ScaffoldingBox />
    } else {
      return <AttractionBox urlData={data} urlTitle={urlData} filteredUrls={filteredUrls} loader={loader} />
    }
  }

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
      <ProfileMylistModalScreen {...{ myListtabChange, mylistoptions, myListtabValue, showMap }} />
      <PlacesModalScreen showMap={showMap} />
      <CalenderBookDatesModalScreen showMap={showMap} />
      <PlaceOrderOnlineModalScreen showMap={showMap} />
      <FilterModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap} />
      <ActivitiesModalScreen showMap={showMap} />
      <ViewDirectionModalScreen showMap={showMap} />
    </>
  );
};
export default CategoriesPage;

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