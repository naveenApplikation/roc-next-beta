import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShopBeachSkeleton = () => {
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <Skeleton width={120} height={120} />
    </div>
  );
};

export default ShopBeachSkeleton;
