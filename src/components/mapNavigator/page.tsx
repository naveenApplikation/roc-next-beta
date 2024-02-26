import { Store, calender, castle, location, utensils } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface MapNavigatorProps {
    // Define your props here
}
const MapNavigatorComponent = styled.div`
    display:flex;
    gap:10px;
`
const MapNavigatorBox = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img{
        height:12px;
        width:12px;
    }
`
const MapNavigatorText = styled.div`
    font-size:14px;
    font-weight:400;
`

const mapNavigatorData = [
    {
        img: location,
        name: "St Heiler"
    },
    {
        img: castle,
        name: "To do"
    },
    {
        img: utensils,
        name: "Dine"
    },
    {
        img: Store,
        name: "Shop"
    },
    {
        img: calender,
        name: "Events"
    },


]

const MapNavigator: React.FC<MapNavigatorProps> = (props) => {
    return (
        <MapNavigatorComponent>
            {mapNavigatorData.map((item: any) => {
                return (
                    <MapNavigatorBox>
                        <Image src={item.img} alt='' />
                        <MapNavigatorText>
                            {item.name}
                        </MapNavigatorText>
                    </MapNavigatorBox>
                )
            })}
        </MapNavigatorComponent>
    );
};

export default MapNavigator;