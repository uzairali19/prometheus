import React, { useState, useEffect } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import styled from '@emotion/styled';
const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Stopwatch: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined = undefined;

        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (intervalId) {
            clearInterval(intervalId);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);


    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds - (hrs * 3600)) / 60);
        const secs = seconds - (hrs * 3600) - (mins * 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleIsRunning = () => setIsRunning(!isRunning);
    const resetTimer = () => {
        setIsRunning(false);
        setElapsedSeconds(0);
    };

    return (
        <div className="text-center p-5">
            <Typography className="text-6xl" variant="h2">{formatTime(elapsedSeconds)}</Typography>
            <div className="flex justify-center space-x-4 mt-4">
                <IconButton onClick={toggleIsRunning} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {isRunning ? "Pause" : "Start"}
                </IconButton>
                <IconButton onClick={resetTimer} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                    "Reset"
                </IconButton>
            </div>
        </div>
    );
};

export default Stopwatch;
