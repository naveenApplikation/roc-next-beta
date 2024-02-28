"use client"

import Layout from '@/app/layout/page';
import FilterSection from '@/components/filterSection';
import ScaffoldingBox from '@/components/scaffoldingBox/page';
import React from 'react';
import styled from 'styled-components';

interface ScaffoldingProps {
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
`

const Scaffolding: React.FC<ScaffoldingProps> = (props) => {

  return (
      <CategoryBody>
        <p className='communityName'>Scaffolding</p>
        <FilterSection />
        <ScaffoldingBox />
      </CategoryBody>
  );
};
export default Layout(Scaffolding)