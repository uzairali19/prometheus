import React from 'react';
import { render } from '@testing-library/react';
import {Loading} from '../Loading';

describe('LoadingComponent', () => {
    it('renders without crashing', () => {
        render(<Loading />);
    });

    it('renders a CircularProgress component', () => {
        const { getByRole } = render(<Loading />);
        const progressElement = getByRole('progressbar');
        expect(progressElement).toBeInTheDocument();
    });

    it('renders CircularProgress with correct props', () => {
        const { getByRole } = render(<Loading />);
        const progressElement = getByRole('progressbar') as HTMLElement;

        
        expect(progressElement).toHaveClass('MuiCircularProgress-root');

        
        expect(progressElement.style.width).toBe('300px');
        expect(progressElement.style.height).toBe('300px');
    });
});
