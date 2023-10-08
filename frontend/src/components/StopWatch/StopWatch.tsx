import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { fetchTime } from '../../api';
import AnimatedServerTime from './AnimatedServerTime';  // Make sure to adjust the import path.

const DisplayTime: React.FC = () => {
    const [serverTime, setServerTime] = useState<number | null>(null);
    const [timeDifference, setTimeDifference] = useState<number>(0);

    useEffect(() => {
        // Fetch the server time
        const getServerTime = async () => {
            try {
                const data = await fetchTime();
                setServerTime(data.epoch);
                setTimeDifference(Math.round(Date.now() / 1000 - data.epoch));
            } catch (error) {
                console.error("Error fetching server time:", error);
            }
        };

        getServerTime();
    }, []);

    const formatTime = (secondsInput: number): string => {
        let totalSeconds = Math.round(secondsInput);

        const hrs = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;

        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-center p-5">
            <Typography className="text-6xl mb-2" variant="h2">
                <AnimatedServerTime value={serverTime} />
            </Typography>
            <Typography className="text-6xl" variant="h2">{formatTime(timeDifference)}</Typography>
        </div>
    );
};

export default DisplayTime;
