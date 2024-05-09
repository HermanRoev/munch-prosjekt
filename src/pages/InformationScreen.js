import React from 'react';
import '../css/InformationScreen.css';
import {useNavigate} from "react-router-dom";
import PageContainer from "../components/PageContainer";

const InformationScreen = () => {
    const navigate = useNavigate();

    const handleAccept = () => {
        // Navigate to the TermsPage when the user accepts
        navigate('/terms');
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>AI Image Generator</h1>
                </div>

                <p className="description">
                    Welcome to a unique interactive installation where your selfie becomes the gateway to
                    unexpected narratives. Here, you will see yourself transformed through advanced digital
                    technology, exploring the intriguing overlap of real and virtual identities.
                    This exhibition invites you to consider the fluidity of your digital self and the
                    profound implications of emerging technologies.
                </p>
                <p className="description">
                    Discover a new perspective on identity and technology in an experience that challenges
                    and surprises. Join us to uncover the unseen—where your image transcends the everyday
                    and ventures into new, thought-provoking territories.
                </p>
                <div className="button-container">
                    <button className="form-button" onClick={handleAccept}>PRESS HERE TO TRY!</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default InformationScreen;