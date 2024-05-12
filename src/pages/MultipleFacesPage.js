import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/MultipleFacesPage.css'; // Make sure the CSS file is in the same directory

const MultipleFacesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const num_faces = location.state?.faces;

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
                    <h1>Multiple Faces Detected</h1>
                </div>
                <p>
                    Oops! It looks like we detected {num_faces} faces in the image.
                </p>
                <p>
                    This application only works with a maximum of 1 person in the image.
                    Please try again with only one face in the frame.
                </p>
                <div className="button-container">
                    <button onClick={handleTryAgain} className="form-button">TRY AGAIN</button>
                    <button onClick={handleExit} className="form-button">EXIT</button>
                </div>
            </div>
        </PageContainer>
    );
};

export default MultipleFacesPage;