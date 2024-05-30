import MapWithMenu from '@/components/RightSideMenu/MapWithMenu';
// import DashBoard from '@/components/dashboard/DashBoardPage';
import React from 'react'
import styled from 'styled-components';
import { useMyContext } from './Context/MyContext';
import PlacesModalScreen from '@/components/AllModalScreen/PlacesModalScreen';

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
        box-shadow: 0px -8px 40px 0px rgba(0, 0, 0, 0.25);
        z-index: 1;
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
            {showMap && <MapWithMenu />}
            <PlacesModalScreen showMap={showMap} />
        </Container>
    )
}

export default PageLayout