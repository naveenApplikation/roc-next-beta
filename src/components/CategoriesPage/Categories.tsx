'use client'
import React, { useEffect, useState } from 'react'
import HeaderScreen from "@/components/header/HeaderScreen";
import SearchModalScreen from "@/components/AllModalScreen/SearchModalScreen";
import ProfileAccountModalScreen from "@/components/AllModalScreen/ProfileAccountModalScreen";
import ProfileMylistModalScreen from "@/components/AllModalScreen/ProfileMylistModalScreen";
import PlacesModalScreen from "@/components/AllModalScreen/PlacesModalScreen";
import ViewDirectionModalScreen from "@/components/AllModalScreen/ViewDirectionModalScreen";
import CalenderBookDatesModalScreen from "@/components/AllModalScreen/CalenderBookDatesModalScreen";
import PlaceOrderOnlineModalScreen from "@/components/AllModalScreen/PlaceOrderOnlineModalScreen";
import FilterModalScreen from "@/components/AllModalScreen/FilterModalScreen";
import EventListingModalScreen from "@/components/AllModalScreen/EventListingModalScreen";
import ActivitiesModalScreen from "@/components/AllModalScreen/ActivitiesModalScreen";
import { useMyContext } from "@/app/Context/MyContext";
import PageLayout from "@/app/pageLayout";
import { useParams, useRouter } from "next/navigation";
import styled from 'styled-components';
 
interface Props{
    children:any
}
type tabs = "Lists" | "Places";
type mylisttabs = "Created" | "Contributed";

const Categories= () => {
    
  const { showMap} = useMyContext();
     const router = useRouter();
     const params=useParams()
      useEffect(() => {
        router.prefetch("categories/" +params);
      }, []);
      
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

 
   
  return (
    <>
     
      <SearchModalScreen {...{ tabChange, options, tabValue, showMap }} />
      <ProfileAccountModalScreen showMap={showMap} />
      <ProfileMylistModalScreen
        {...{ myListtabChange, mylistoptions, myListtabValue, showMap }}
      />
      <PlacesModalScreen showMap={showMap} />
      <CalenderBookDatesModalScreen showMap={showMap}/>
      <PlaceOrderOnlineModalScreen showMap={showMap}/>
      <FilterModalScreen showMap={showMap} />
      <EventListingModalScreen showMap={showMap}/>
      <ActivitiesModalScreen showMap={showMap}/>
      <ViewDirectionModalScreen showMap={showMap}/>
    </>
  )
}

export default Categories