"use client"

import Layout from '@/app/layout/page';
import FilterSection from '@/components/filterSection';
import StaysBox from '@/components/staysBox/page';
import React from 'react';
import styled from 'styled-components';

interface StaysProps {
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
  @media screen and (max-width: 400px) {
    padding:0px 15px;
  }
`

const Stays: React.FC<StaysProps> = (props) => {
    
    return (
        <CategoryBody>
            <p className='communityName'>Stays</p>
            <FilterSection />
            <StaysBox />
        </CategoryBody>
    );
};
export default Layout(Stays)