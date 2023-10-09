import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import {Stopwatch} from '../StopWatch';
import { fetchTime } from '../../api';
import moment from 'moment';

jest.mock('../../api', () => ({
    fetchTime: jest.fn().mockResolvedValue({ epoch: 1700000000 })
}));

describe('<Stopwatch />', () => {
    beforeEach(() => {
        (fetchTime as jest.Mock).mockReset();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        act(() => {
            render(<Stopwatch />);
        });
    });

    it('displays the time difference', async () => {
        const mockServerTime = { epoch: 1700000000 };
        const currentTime = Date.now() / 1000;
        const expectedTimeDifference = Math.round(currentTime - mockServerTime.epoch);

        (fetchTime as jest.Mock).mockResolvedValueOnce(mockServerTime);

        render(<Stopwatch />);

        await waitFor(() => {
            const formattedDifference = moment.utc(expectedTimeDifference * 1000).format('HH:mm:ss');
            expect(screen.getByText(formattedDifference)).toBeInTheDocument();
        }, { timeout: 3000 });
    });

    it('logs error to the console if fetching server time fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        (fetchTime as jest.Mock).mockRejectedValueOnce(new Error('API error'));

        render(<Stopwatch />);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching server time:", expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });

    it('fetches server time at intervals', async () => {
        const mockServerTime = { epoch: 1700000000 };
        (fetchTime as jest.Mock).mockResolvedValueOnce(mockServerTime);

        render(<Stopwatch />);

        act(() => {
            jest.advanceTimersByTime(30000);
        });

        expect(fetchTime).toHaveBeenCalledTimes(2);
    });
});
