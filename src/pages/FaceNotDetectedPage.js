import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

const FaceNotDetectedPage = () => {
    const navigate = useNavigate();

    const handleTryAgain = () => {
        // Navigate back to the image capture page
        navigate('/capture');
    };

    const handleExit = () => {
        // Navigate back to the start or home page
        navigate('/');
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Face Not Detected</h1>
                </div>
                <p>
                    Oops! It looks like we couldn't capture your face properly.
                </p>
                <p>
                    Keep in mind that the AI-generated image will closely resemble your facial expression and
                    orientation. For best results, face the camera directly and maintain a neutral expression.
                </p>
                <p>
                    Ready to try again?
                </p>
                <div className="button-container">
                    <button onClick={handleTryAgain} className="form-button">TRY AGAIN</button>
                    <button onClick={handleExit} className="form-button">EXIT</button>
                </div>
            </div>
        </PageContainer>
    );
};

export default FaceNotDetectedPage;