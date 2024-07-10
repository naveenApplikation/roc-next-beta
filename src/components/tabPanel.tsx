import { Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface TabPanelProps {
    // Define your props here
    defaultValue:string,
    tabChange : Function,
    options: any

}

const TabPanel: React.FC<TabPanelProps> = ({defaultValue , tabChange , options}) => {
    return (
        <CustomSegmented
            
            defaultValue={defaultValue}
            style={{ marginBottom: 8 }}
            onChange={(value :any) => tabChange(value)}
            options={options}
            block 
        />
    );
};

export default TabPanel;

const CustomSegmented = styled(Segmented)`
.ant-segmented-item:nth-child(1):not(.ant-segmented-item-selected) > .ant-segmented-item-label {
    border-right: 1px solid #000;
}

.ant-segmented-item:last-child:not(.ant-segmented-item-selected) > .ant-segmented-item-label {
    border-left: 1px solid #000;
}

.ant-segmented-item-selected > .ant-segmented-item-label {
    border: none;
}
`;



