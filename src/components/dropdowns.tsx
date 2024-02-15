import { Dropdown } from 'antd';
import React from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface DropDwonsProps {
    // Define your props here
    items: any;
    name:string;
}

const DropdownText = styled.p`
font-size:13px;
font-weight:500;
display:flex;
min-width:90px;
padding:12px;
gap:8px;
background:white;
border-radius:8px;
justify-content:center;

`

const DropDwons: React.FC<DropDwonsProps> = ({ items , name }) => {
    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <DropdownText onClick={(e) => e.preventDefault()}>
                {name}
                <CaretDownOutlined />
            </DropdownText>
        </Dropdown>
    );
};

export default DropDwons;