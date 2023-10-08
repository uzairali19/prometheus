import React from 'react';
import {Stopwatch} from "../StopWatch";

interface LeftSideProps {
    className?: string;
}
const LeftSide: React.FC<LeftSideProps> = ({ className }) => {
    return (
        <div className={className}>
            <Stopwatch />
        </div>
    );
};


export default LeftSide;