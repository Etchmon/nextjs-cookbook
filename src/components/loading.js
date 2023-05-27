import React from "react";

const LoadingAnimation = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"></div>
        </div>
    );
};

export default LoadingAnimation;