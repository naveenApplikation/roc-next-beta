import MapWithMenu from '@/components/RightSideMenu/MapWithMenu';
// import DashBoard from '@/components/dashboard/DashBoardPage';
import React from 'react'
import styled from 'styled-components';
import { useMyContext } from './Context/MyContext';
import RightSideMenu from "@/components/RightSideMenu/page";

const Container = styled.div`
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 800px) {
            flex-direction: column-reverse;
        }
    `;
const MainContainer = styled.div`
        height: 100vh;
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        @media screen and (max-width: 800px) {
            border-radius: 24px 24px 0px 0px;
            height: auto;
            overflow: hidden;
            z-index: 1;
        }
        `;


const DashboardMenu = styled.div<{
    $showMap: boolean;
}>`
        width: ${({ $showMap }) => ($showMap ? "480px" : "580px")};
        padding-bottom: ${({ $showMap }) => ($showMap ? "0" : "0")};
        background: #f2f3f3;
        transition: width 0.6s ease; /* Adjust transition timing function and duration */
        background-blend-mode: normal, luminosity;
        box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-height: 100vh;
    .shoadow_wrapper_container{
        opacity:0;
    }
    @media screen and (max-width: 800px) {
      display: ${({ $showMap }) => ($showMap ? "none" : "flex")};
      width: 100%;
      min-height: ${({ $showMap }) =>
        $showMap ? "calc(100vh - 500px)" : "100vh"};
    }
  `;
interface PageLayoutProps {
    children: any;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const { modalClick, showMap, iconClick } = useMyContext();
    return (
        <Container>
            <MainContainer>
                {children}
            </MainContainer>
            {/* {showMap && <MapWithMenu />} */}
           
        </Container>
    )
}

export default PageLayout