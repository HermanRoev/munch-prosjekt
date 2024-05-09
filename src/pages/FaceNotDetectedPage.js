import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/FaceNotDetectedPage.css'; // Make sure the CSS file is in the same directory

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
                <h2>
                    Oops! It looks like we couldn't capture your face properly.
                </h2>
                <p>
                    For a smooth experience, please find your way to the marked area on the ground.
                </p>
                <p>
                    Look straight into the camera lens, ensuring your face is fully in view.
                    Remember to remove any accessories like hats or sunglasses that might cover your face,
                    and if your hair is falling over your eyes, please push it back.
                </p>
                <p>
                    Keeping a relaxed, neutral face helps us recognize you better.
                    We appreciate your patience and cooperation.
                </p>
                <h2>
                    Ready to try again?
                </h2>
                <div className="button-container">
                    <button onClick={handleTryAgain} className="form-button">TRY AGAIN</button>
                    <button onClick={handleExit} className="form-button">EXIT</button>
                </div>
            </div>
        </PageContainer>
    );
};

export default FaceNotDetectedPage;