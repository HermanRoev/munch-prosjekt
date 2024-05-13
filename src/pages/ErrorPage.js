import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        // Navigate back to the start or home page
        navigate('/');
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Something went wrong</h1>
                </div>
                <p>
                    We're sorry for the inconvenience. Please try again.
                </p>
                <div className="button-container">
                    <button onClick={handleTryAgain} className="form-button">Try Again</button>
                </div>
            </div>
        </PageContainer>
    );
};

export default ErrorPage;