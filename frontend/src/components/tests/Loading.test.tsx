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

        // Check color. This assumes that the color leads to a certain class or style. Adjust if necessary.
        expect(progressElement).toHaveClass('MuiCircularProgress-root'); // Assuming MUI uses this class for 'success' color

        // Check size. This assumes that size leads to a certain style. Adjust if necessary.
        expect(progressElement.style.width).toBe('300px');  // Assuming MUI applies size as width in pixels
        expect(progressElement.style.height).toBe('300px'); // Adjust based on actual implementation
    });
});
