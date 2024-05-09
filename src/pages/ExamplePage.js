import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ExamplePage.css'; // Make sure the CSS file is in the same directory

const ExamplePage = ({ inputImage }) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const image = inputImage || state?.image

    const handleAccept = () => {
        // Navigate to the feedback when the user presses continue
        navigate('/feedback');
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Deepfake Selfie</h1>
                </div>

                <div className="example-container">
                    <img src={image} alt="Test image" className="example-image"/> {/* Use the imported image here */}
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleAccept}>PRESS HERE FOR FEEDBACK!</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default ExamplePage;