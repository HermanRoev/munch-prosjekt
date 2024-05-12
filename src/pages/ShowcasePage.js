import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ShowcasePage.css'; // Make sure the CSS file is in the same directory
import showcase from '../images/showcase_insta.png';

const ShowcasePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const overlay = location.state?.image;

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

                <div className="showcase-container">
                    <img src={overlay} alt="Overlay" className="overlay-image"/>
                    <img src={showcase} alt="Deepfake" className="showcase-image"/>
                </div>
                <div className="button-container">
                    <button className="form-button" onClick={handleAccept}>PRESS HERE FOR FEEDBACK!</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default ShowcasePage;