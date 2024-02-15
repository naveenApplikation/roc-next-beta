import { Segmented } from 'antd';
import React from 'react';

interface TabPanelProps {
    // Define your props here
    defaultValue:string,
    tabChange : Function,
    options: any

}

const TabPanel: React.FC<TabPanelProps> = ({defaultValue , tabChange , options}) => {
    return (
        <Segmented
            defaultValue={defaultValue}
            style={{ marginBottom: 8 }}
            onChange={(value :any) => tabChange(value)}
            options={options}
        />
    );
};

export default TabPanel;