import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faFrown, faMeh, faSmile, faGrinStars } from '@fortawesome/free-regular-svg-icons';
import '../css/FeedbackPage.css'; // Make sure the CSS file is in the same directory

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(null);
    const [reflection, setReflection] = useState(50);
    const [clarity, setClarity] = useState(50);
    const [userInput, setUserInput] = useState(''); // New state variable for the user input

    const handleSubmit = (event) => {
        event.preventDefault();
        const feedbackData = { rating, reflection, clarity, userInput };
        console.log(feedbackData); // Replace with a POST request to your server
        navigate('/'); // Navigate to a thank you page or back home
    };

    const ratingIcons = [
        { value: 'Terrible', icon: faAngry, color: 'red' },
        { value: 'Bad', icon: faFrown, color: 'orange' },
        { value: 'So-so', icon: faMeh, color: 'yellow' },
        { value: 'Good', icon: faSmile, color: 'lightgreen' },
        { value: 'Superb', icon: faGrinStars, color: 'green' },
    ];

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Rate Your Experience</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <p>How was your overall experience?</p>
                        <div className="rating">
                            {ratingIcons.map((item, index) => (
                                <label key={index}>
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        size="3x" // Adjust the size of the icon
                                        color={rating === item.value ? item.color : 'gray'}
                                        onClick={() => setRating(item.value)}
                                        className={`rating-icon rating-icon-${index}`}
                                    />
                                    <span>{item.value}</span> {/* Add this line */}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="slider-question">
                        <p>Did it make you reflect on image misusage and deepfake manipulation?</p>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={reflection}
                                step="10" // This sets the slider to move in increments of 10%
                                onChange={(e) => {
                                    setReflection(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Not at all!</span>
                                <span>Very much!</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <p>How likely are you to discuss this topic with friends or family?</p>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={clarity}
                                step="10" // This sets the slider to move in increments of 10%
                                onChange={(e) => {
                                    setClarity(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Not at all!</span>
                                <span>Very much!</span>
                            </div>
                        </div>
                    </div>

                    <div className="input-question">
                        <p>How did it feel to see yourself depicted in scenarios you never participated in?</p>
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your feedback here..."
                        />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="button">SUBMIT!</button>
                    </div>
                </form>
            </div>
        </PageContainer>
    );
};

export default FeedbackPage;