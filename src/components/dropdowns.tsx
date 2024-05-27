import { Dropdown } from 'antd';
import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface DropDwonsProps {
    // Define your props here
    items: any;
    name:string;
    stylePass?:any
}



const DropDwons: React.FC<DropDwonsProps> = ({ items , name ,stylePass}) => {
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <DropdownText onClick={(e) => e.preventDefault()} style={{padding:stylePass ?"16px":" 0px 10px"}}>
                {name}
                <CaretDownOutlined />
            </DropdownText>
        </Dropdown>
    );
};

export default DropDwons;

const DropdownText = styled.p`
font-size:13px;
font-weight:500;
display:flex;
min-width:90px;
/* padding:12px; */
gap:8px;
background:white;
border-radius:8px;
justify-content:space-between;
align-items: center;
height:30px;

`;