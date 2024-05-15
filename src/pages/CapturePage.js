import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/CapturePage.css';
import overlay from '../images/face-svg.svg';

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
    const [code, setCode] = useState("");
    const [isCodeValid, setIsCodeValid] = useState(false);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        setIsCodeValid(newCode.trim() !== "");
    };

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

    const continueWithImage = async () => {
        if (!isCodeValid) {
            alert('Please enter a valid code')
            return;
        }
        try {
            const response = await fetch('https://178.232.54.31:8189/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Code validation failed');
            }

            if (response.ok) {
                navigate('/processing', { state: { image: imageSrc } });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Wrong code or an error occurred. Please try again.');
        }
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
                            <div className="webcam-overlay-container">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    className="webcam-view mirrored"
                                />
                                <img src={overlay} alt="Face Outline" className="face-overlay"/>
                            </div>
                        )}
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    {imageSrc ? (
                        <div className="button-container">
                            <button onClick={retakeImage} className="form-button">TRY AGAIN</button>
                            <button onClick={continueWithImage} className="form-button"> CONTINUE </button>
                            <input type="text" id="code-input" value={code} onChange={handleCodeChange}
                                   className="form-input"
                                   placeholder="Code"/>
                        </div>
                    ) : (
                        <div className="button-container">
                            <button onClick={capture} className="form-button">CAPTURE SELFIE</button>
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
};

export default CapturePage;
