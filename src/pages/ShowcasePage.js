import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ShowcasePage.css'; // Make sure the CSS file is in the same directory
import showcaseTestImage from '../images/showcase_insta.png'; // Import the image directly
import overlayImage from '../images/gen_test.png'; // Import the overlay image

const ShowcasePage = () => {
    const navigate = useNavigate();

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
                    <img src={showcaseTestImage} alt="Test image" className="showcase-image"/> {/* Use the imported image here */}
                    <img src={overlayImage} alt="Overlay image" className="overlay-image"/> {/* Add the overlay image */}
                </div>
                <div className="button-container">
                    <button className="form-button" onClick={handleAccept}>PRESS HERE FOR FEEDBACK!</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default ShowcasePage;