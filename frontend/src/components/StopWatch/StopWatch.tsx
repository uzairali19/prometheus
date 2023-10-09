import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { fetchTime } from '../../api';
import AnimatedServerTime from './AnimatedServerTime';
import moment from 'moment';  // Import moment

const Stopwatch: React.FC = () => {
    const [serverTime, setServerTime] = useState<number | null>(null);
    const [timeDifference, setTimeDifference] = useState<number>(0);

    // Utility function to format time
    const formatTime = (secondsInput: number): string => {
        return moment.utc(secondsInput * 1000).format('HH:mm:ss');
    };

    // Function to fetch the server time
    const getServerTime = async () => {
        try {
            const data = await fetchTime();
            setServerTime(data.epoch);
            setTimeDifference(Math.round(Date.now() / 1000 - data.epoch));
        } catch (error) {
            console.error("Error fetching server time:", error);
        }
    };

    // Effect hook to fetch server time initially and at intervals
    useEffect(() => {
        getServerTime();
        const intervalId = setInterval(getServerTime, 30000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-center p-5">
            <Typography variant="h2" className="text-6xl mb-2">
                <AnimatedServerTime value={serverTime} />
            </Typography>
            <Typography variant="h2" className="text-6xl">
                {formatTime(timeDifference)}
            </Typography>
        </div>
    );
};

export default Stopwatch;
