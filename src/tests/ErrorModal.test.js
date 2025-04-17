import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorModal from '../components/ErrorModal';

describe('ErrorModal Component', () => {
    const mockOnClose = jest.fn();
    const testMessage = 'Test error message';

    it('renders nothing when closed', () => {
        render(
            <ErrorModal
                isOpen={false}
                onClose={mockOnClose}
                message={testMessage}
            />
        );
        expect(screen.queryByText(testMessage)).not.toBeInTheDocument();
    });

    it('renders error message when open', () => {
        render(
            <ErrorModal
                isOpen={true}
                onClose={mockOnClose}
                message={testMessage}
            />
        );
        expect(screen.getByText(testMessage)).toBeInTheDocument();
        expect(screen.getByText('Download Error')).toBeInTheDocument();
    });

    it('calls onClose when clicking close button', () => {
        render(
            <ErrorModal
                isOpen={true}
                onClose={mockOnClose}
                message={testMessage}
            />
        );
        fireEvent.click(screen.getByText('Close'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when clicking overlay', () => {
        render(
            <ErrorModal
                isOpen={true}
                onClose={mockOnClose}
                message={testMessage}
            />
        );
        fireEvent.click(screen.getByTestId('modal-overlay'));
        expect(mockOnClose).toHaveBeenCalled();
    });
});
