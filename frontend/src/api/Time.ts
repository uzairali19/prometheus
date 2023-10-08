import axios, { AxiosError } from 'axios';

const port = process.env.PORT || 9000;
const BASE_URL: string = `http://localhost:${port}`;

interface TimeResponse {
    epoch: number;
}

const fetchTime = async (): Promise<TimeResponse> => {
    try {
        const response = await axios.get<TimeResponse>(`${BASE_URL}/time`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the time:", error);
        throw error as AxiosError;
    }
};


export {fetchTime};
