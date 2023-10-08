import axios, { AxiosError } from 'axios';

const port = process.env.PORT || 9000;
const BASE_URL: string = `http://localhost:${port}`;

interface TimeResponse {
    epoch: number;
}

interface MetricsResponse {
    data: any;  // Adjust with the expected shape of your data
}


const fetchTime = async (): Promise<TimeResponse> => {
    try {
        const response = await axios.get<TimeResponse>(`${BASE_URL}/time`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'mysecrettoken'
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the time:", error);
        throw error as AxiosError;
    }
};

const fetchMetrics = async (): Promise<MetricsResponse> => {
    try {
        const response = await axios.get<MetricsResponse>(`${BASE_URL}/metrics`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'mysecrettoken'
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the metrics:", error);
        throw error as AxiosError;
    }
};





export {fetchTime, fetchMetrics};
