import {  Rate } from 'antd';
import React from 'react';

interface RatingsProps {
    // Define your props here
    defaultValue: number
}

const Ratings: React.FC<RatingsProps> = ({ defaultValue }) => {
    return (
     
            <Rate  allowHalf defaultValue={defaultValue} />
    );
};

export default Ratings;