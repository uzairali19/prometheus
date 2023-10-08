import React from 'react';

interface AnimatedServerTimeProps {
    value: number | null;
}

const AnimatedServerTime: React.FC<AnimatedServerTimeProps> = ({ value }) => {
    const displayValue = value !== null ? value : "0000000000";

    return <React.Fragment>{displayValue}</React.Fragment>;
};

export default AnimatedServerTime;
