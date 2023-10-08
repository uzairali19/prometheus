import React, { useState, useEffect } from 'react';
import { fetchMetrics } from '../../api';
import { Loading } from "../Loading";

const Metrics: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getMetrics = async () => {
        try {
            const response = await fetchMetrics();
            setData(response);
            setError(null);
        } catch (err) {
            setError("Failed to fetch metrics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMetrics();
        const intervalId = setInterval(getMetrics, 30000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 mt-2">{error}</p>;

    return (
        <div className="p-4 border rounded">
            <h2 className="text-6xl mb-2 text-gray-800 text-center">Prometheus Metrics</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap">
                {data}
            </pre>
        </div>
    );
};

export default Metrics;
