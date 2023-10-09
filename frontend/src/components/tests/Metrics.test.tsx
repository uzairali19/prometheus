import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Metrics } from '../Metrics';
import { fetchMetrics } from '../../api';

jest.mock('../../api');

describe('<Metrics />', () => {
    let setIntervalSpy: jest.SpyInstance;

    beforeEach(() => {
        (fetchMetrics as jest.MockedFunction<any>).mockClear();
        setIntervalSpy = jest.spyOn(global, 'setInterval');
    });

    afterEach(() => {
        setIntervalSpy.mockRestore();
    });

    it('renders without crashing', () => {
        render(<Metrics />);
    });

    it('displays the loading component initially', () => {
        render(<Metrics />);
        expect(screen.getByTestId('loading-component')).toBeInTheDocument();
    });

    it('displays fetched metrics', async () => {
        const mockData = 'some metric data';
        (fetchMetrics as jest.MockedFunction<any>).mockResolvedValueOnce(mockData);

        render(<Metrics />);

        await waitFor(() => {
            expect(screen.getByText(mockData)).toBeInTheDocument();
        });
    });

    it('displays an error message if fetching fails', async () => {
        (fetchMetrics as jest.MockedFunction<any>).mockRejectedValueOnce(new Error('Fetch failed'));

        render(<Metrics />);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch metrics')).toBeInTheDocument();
        });
    });
    
});
