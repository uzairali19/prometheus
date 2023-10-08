import axios, { AxiosError } from 'axios';

const PORT = process.env.PORT || 9000;
const BASE_URL = process.env.PUBLIC_URL ||`http://localhost:${PORT}`;
const COMMON_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'mysecrettoken'
};

interface TimeResponse {
    epoch: number;
}

interface MetricsResponse {
    data: any;
}

const sendRequest = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
            headers: COMMON_HEADERS
        });
        return response.data;
    } catch (error:any) {
        console.error(`There was an error fetching from ${endpoint}:`, error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        throw error as AxiosError;
    }
};

const fetchTime = () => sendRequest<TimeResponse>('/time');
const fetchMetrics = () => sendRequest<MetricsResponse>('/metrics');

export { fetchTime, fetchMetrics };
