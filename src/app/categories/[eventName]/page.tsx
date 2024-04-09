"use client"

import Layout from '@/app/layout/page';
import AttractionBox from '@/components/attractionBox/page';
import EventBox from '@/components/eventBox/page';
import ExperienceBox from '@/components/experienceBox/page';
import FilterSection from '@/components/filterSection';
import FinancialBox from '@/components/financialBox/page';
import ScaffoldingBox from '@/components/scaffoldingBox/page';
import StaysBox from '@/components/staysBox/page';
import { useParams } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import HeaderScreen from '@/components/header/HeaderScreen'

interface CategoriesPageProps {
  // Define your props here
}
const CategoryBody = styled.div`
  padding:0px 40px;
  min-height:calc(100vh - 113px);
  .communityName{
    font-size : 24px;
    font-weight:700;
  }
  .likesCount{
    font-size:15px;
    font-weight:500;
    font-style : italic;
  }
  @media screen and (min-width: 400px) {
    padding:0px 15px;
  }
`

const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
  const params = useParams()
  let urlData : any
  if(params){

    urlData = (params.eventName).toString().replaceAll("%20", " ")
  }


  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')

  console.log(search,"search")
 

  const categories = () => {
    if (urlData === "Events") {
      return <EventBox />
    }else if(urlData === "Experiences"){
      return <ExperienceBox />
    }else if(urlData === "Attractions"){
      return <AttractionBox />
    }else if(urlData === "Stays"){
      return <StaysBox />
    }else if(urlData === "Financial Services"){
      return <FinancialBox />
    }else if(urlData === "Scaffolding"){
      return <ScaffoldingBox />
    }else{
      return <AttractionBox urlData={search} urlTitle={urlData} />
    }
  }

  return (
      <>
      <HeaderScreen />
        {/* <FilterSection /> */}
        {categories()}
      </>
  );
};
export default CategoriesPage