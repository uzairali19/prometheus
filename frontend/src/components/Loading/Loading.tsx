import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <CircularProgress data-testid="loading-component" color='success' size={300}/>
        </div>
    );
};

export default LoadingComponent;
