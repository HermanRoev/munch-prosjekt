import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/ProcessingPage.css'; // Make sure the CSS file is in the same directory

const ProcessingPage = ({ mockImage }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [processedImage, setProcessedImage] = useState(null);

    const image = mockImage || state?.image;

    useEffect(() => {
        // Simulate sending the image to the backend and receiving a processed image
        const processImage = async () => {
            const formData = new FormData();
            formData.append('image', image); // Use the mock image if it's provided

            try {
                const response = await fetch('https://your-backend-url.com/process', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setProcessedImage(result.processedImage); // Assuming the response contains the processed image
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        processImage();
    }, [image, navigate]);

    // Add a new useEffect hook for the delay and navigation
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/showcase'); // replace '/feedback' with the actual path to the FeedbackPage
        }, 10000); // 10 seconds

        // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
        return () => clearTimeout(timer);
    }, [navigate]); // dependency array

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