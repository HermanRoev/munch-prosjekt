import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/CapturePage.css';

const videoConstraints = {
    width: 2160,  // Higher width for high-res capture
    height: 2160, // Higher height for high-res capture
    facingMode: "user",
};

const CapturePage = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);  // Ref for the canvas to perform high-res capture
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const newImageSrc = canvas.toDataURL('image/jpeg');
        setImageSrc(newImageSrc);
        console.log('Captured Image Resolution:', canvas.width, 'x', canvas.height); // Log the resolution
    }, []);

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
                            <img src={imageSrc} alt="Captured" className="captured-image mirrored"/>
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                className="webcam-view mirrored"
                            />
                        )}
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    {imageSrc ? (
                        <div className="button-container">
                            <button onClick={retakeImage} className="button">TRY AGAIN</button>
                            <button onClick={continueWithImage} className="button">CONTINUE</button>
                        </div>
                    ) : (
                        <div className="button-container">
                            <button onClick={capture} className="button">CAPTURE SELFIE</button>
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default CapturePage;
