import React, { useState } from 'react';
import ErrorModal from './ErrorModal';

const ResumeDownload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ show: false, message: '' });

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_R2_WORKER_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.url) {
                window.open(data.url, '_blank', 'noopener,noreferrer');
            } else {
                throw new Error('Failed to fetch download URL');
            }
        } catch (error) {
            console.error('Error downloading resume:', error);
            setError({
                show: true,
                message:
                    'Unable to download resume. Please try again later or contact me directly.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={handleDownload} disabled={loading}>
                <i className="fa fa-download"></i>{' '}
                {loading ? 'Preparing Download...' : 'Download Resume'}
            </button>

            <ErrorModal
                isOpen={error.show}
                onClose={() => setError({ show: false, message: '' })}
                message={error.message}
            />
        </>
    );
};

export default ResumeDownload;
