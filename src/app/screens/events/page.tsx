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


interface EventsProps {
  // Define your props here
}
const CategoryBody = styled.div`
  padding:12px 40px;
  min-height:calc(100vh - 113px);
  .communityName{
    font-size : 24px;
    font-weight:700;
    margin-bottom: 24px;
  }
  .likesCount{
    font-size:15px;
    font-weight:500;
    font-style : italic;
  }
  @media screen and (max-width: 400px) {
    padding:12px 15px;
  }
`

const Events: React.FC<EventsProps> = (props) => {

  return (
      <CategoryBody>
        <p className='communityName'>Events</p>
        <FilterSection />
        <EventBox />
      </CategoryBody>
  );
};
export default Layout(Events)