import { Segmented } from "antd";
import React from "react";
import styled from "styled-components";

interface TabPanelProps {
  // Define your props here
  defaultValue: string;
  tabChange: Function;
  options: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
  defaultValue,
  tabChange,
  options,
}) => {
  return (
    <CustomSegmented
      defaultValue={defaultValue}
      style={{ marginBottom: 16, marginTop: 16 }}
      onChange={(value: any) => tabChange(value)}
      options={options}
      block
    />
  );
};

export default TabPanel;

const CustomSegmented = styled(Segmented)`
  /* Add shorter right border to the first item */
  .ant-segmented-item:first-child:not(.ant-segmented-item-selected)
    > .ant-segmented-item-label::after {
    content: "";
    position: absolute;
    right: -1px;
    top: 25%;
    bottom: 25%;
    width: 1px;
    background-color: rgba(60, 60, 67, 0.36);
  }

  /* Add shorter left border to the last item */
  .ant-segmented-item:last-child:not(.ant-segmented-item-selected)
    > .ant-segmented-item-label::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 25%;
    bottom: 25%;
    width: 1px;
    background-color: rgba(60, 60, 67, 0.36);
  }

  .ant-segmented-item-selected:nth-child(2)
    ~ .ant-segmented-item:last-child
    > .ant-segmented-item-label::before {
    display: none !important;
  }

  .ant-segmented-item-selected:nth-child(2)
    ~ .ant-segmented-item:first-child
    > .ant-segmented-item-label::after {
    display: none !important;
  }
`;
