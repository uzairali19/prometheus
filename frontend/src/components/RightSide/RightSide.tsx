import React from "react";
import { Metrics } from "../Metrics";

interface RightSideProps {
    className?: string;
}

const RightSide: React.FC<RightSideProps> = ({ className }) => {
    return (
        <div className={`flex flex-col items-start justify-start w-1/2 p-4 ${className}`}>
            <Metrics />
        </div>
    );
}

export default RightSide;
