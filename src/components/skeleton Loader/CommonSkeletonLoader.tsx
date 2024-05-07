import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommonSkeletonLoader = () => {
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <Skeleton width={120} height={64} />
      <Skeleton width={120} height={15} style={{marginTop:14}}  />
      <Skeleton width={120} height={25} style={{marginTop:8}}  />
    </div>
  );
};

export default CommonSkeletonLoader;
