import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ExamplePage.css'; // Make sure the CSS file is in the same directory
import exampleTestImage from '../images/example_test.png'; // Import the image directly
import overlayImage from '../images/gen_test.png'; // Import the overlay image

const ExamplePage = () => {
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

                <div className="example-container">
                    <img src={exampleTestImage} alt="Test image" className="example-image"/> {/* Use the imported image here */}
                    <img src={overlayImage} alt="Overlay image" className="overlay-image"/> {/* Add the overlay image */}
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleAccept}>PRESS HERE FOR FEEDBACK!</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default ExamplePage;