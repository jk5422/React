import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DynamicSkeleton = ({ isLoading, children }) => {
    return isLoading ? <Skeleton height="100%" width="100%" /> : children;
};

const SkeletonExampleComponent = () => {
    const isLoading = false;

    return (
        <div style={{ width: "300px", height: "200px" }}>
            <DynamicSkeleton isLoading={isLoading}>
                <div style={{ width: "300px", height: "200px", background: "lightblue" }}>
                    Content Loaded
                </div>
            </DynamicSkeleton>
        </div>
    );
};

export default SkeletonExampleComponent;
