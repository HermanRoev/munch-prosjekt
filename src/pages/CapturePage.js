import React, {useCallback, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/CapturePage.css'; // Make sure the CSS file is in the same directory

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
};

const CapturePage = () => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    }, [webcamRef]);

    const retakeImage = () => {
        setImageSrc(null);
    };

    const continueWithImage = () => {
        navigate('/processing', { state: { image: imageSrc } });
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Take A Selfie</h1>
                </div>
                <div className="capture-container">

                    <div className="webcam-container">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Captured" className="captured-image mirrored"/> // Add the 'mirrored' class here
                        ) : (
                            <Webcam
                                audio={false}
                                height={videoConstraints.height}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={videoConstraints.width}
                                videoConstraints={videoConstraints}
                                className="webcam-view mirrored" // Add the 'mirrored' class here
                            />
                        )}
                    </div>
                    {imageSrc ? (
                        <div className="button-container">
                            <button onClick={retakeImage} className="button">TRY AGAIN</button>
                            <button onClick={continueWithImage} className="button">CONTINUE</button>
                        </div>
                    ) : (
                        <button onClick={capture} className="button">CAPTURE SELFIE</button>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default CapturePage;