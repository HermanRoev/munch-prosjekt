import React, {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ProcessingPage.css'; // Make sure the CSS file is in the same directory

const ProcessingPage = () => {
    const location = useLocation();
    const image = location.state?.image;
    const code = location.state?.code;
    const navigate = useNavigate();
    const [processedImage, setProcessedImage] = useState(null);
    const imageProcessing = useRef(false);

    useEffect(() => {
    if (image && !imageProcessing.current) { // Only process if image
        imageProcessing.current = true;
        const processImage = async () => {
            try {
                const imageBlob = await fetch(image).then(response => response.blob());
                const formData = new FormData();
                formData.append('file', imageBlob, 'image.png');
                formData.append('code', code);

                const response = await fetch('https://178.232.54.31:8189/generate', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    try {
                        const data = await response.json();
                        if (data.hasOwnProperty('errorcode')) {
                            if (data.errorcode === 1) {
                                // Navigate to the face not detected page
                                navigate('/noface');
                            } else if (data.errorcode === 2) {
                                const faces = data.num_faces;
                                navigate('/moface', {state: {faces}})
                            }
                        }
                        else {
                            navigate('/error')
                        }
                    } catch (error) {
                        // If an error occurs when parsing the response, navigate to the error page
                        navigate('/error');
                    }
                }
                else {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setProcessedImage(imageUrl);
                }
            } catch (error) {
                // If any error occurs, navigate to the error page
                navigate('/error');
            }
        };
        processImage();
    }
}, [code, image, navigate, processedImage]);

    useEffect(() => {
        if (processedImage) {
            // Navigate to the next page with the processed image
            navigate('/showcase', { state: { image: processedImage } });
        }
    }, [processedImage, navigate]);

    return (
        <PageContainer>
            <div className="processing-container">
                <h1>Loading</h1>
                <main>
                    <svg className="ip" viewBox="0 0 256 128" width="192px" height="96px"
                         xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stop-color="#6B9488"/>
                                <stop offset="20%" stop-color="#528D8E"/>
                                <stop offset="40%" stop-color="#408497"/>
                                <stop offset="60%" stop-color="#40799C"/>
                                <stop offset="80%" stop-color="#536B9A"/>
                                <stop offset="100%" stop-color="#6B5A8E"/>
                            </linearGradient>
                            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stop-color="#6B5A8E"/>
                                <stop offset="20%" stop-color="#536B9A"/>
                                <stop offset="40%" stop-color="#40799C"/>
                                <stop offset="60%" stop-color="#408497"/>
                                <stop offset="80%" stop-color="#528D8E"/>
                                <stop offset="100%" stop-color="#6B9488"/>
                            </linearGradient>
                        </defs>
                        <g fill="none" stroke-linecap="round" stroke-width="16">
                            <g stroke-dasharray="180 656">
                                <path className="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0"
                                      d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                                <path className="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358"
                                      d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                            </g>
                        </g>
                    </svg>
                </main>
                <p>Processing your image, please wait...</p>
            </div>
        </PageContainer>
    );
};

export default ProcessingPage;