import React from 'react';
import { render } from '@testing-library/react';
import AnimatedServerTime from '../StopWatch/AnimatedServerTime';

describe('AnimatedServerTime', () => {
    it('renders without crashing', () => {
        render(<AnimatedServerTime value={1234567890} />);
    });

    it('displays the provided value prop correctly', () => {
        const { getByText } = render(<AnimatedServerTime value={1234567890} />);
        expect(getByText('1234567890')).toBeInTheDocument();
    });

    it('defaults to "0000000000" when value is null', () => {
        const { getByText } = render(<AnimatedServerTime value={null} />);
        expect(getByText('0000000000')).toBeInTheDocument();
    });
});
