import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import AgeSelector  from "../components/AgeSelector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faFrown, faMeh, faSmile, faGrinStars } from '@fortawesome/free-regular-svg-icons';
import '../css/FeedbackPage.css';

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState(30);
    const [gender, setGender] = useState('');
    const [socialMediaUsage, setSocialMediaUsage] = useState(null);
    const [privacyConcern, setPrivacyConcern] = useState(null);
    const [deepfakeAwareness, setDeepfakeAwareness] = useState(null);
    const [surprise, setSurprise] = useState(null);
    const [discomfort, setDiscomfort] = useState(null);
    const [perceptionChange, setPerceptionChange] = useState('');
    const [awarenessImpact, setAwarenessImpact] = useState(null);
    const [improvementSuggestion, setImprovementSuggestion] = useState('');
    const [rating, setRating] = useState(null);

    const isFormValid = () => {
        return age !== null && gender !== '' && socialMediaUsage !== null && privacyConcern !== null &&
            deepfakeAwareness !== null && surprise !== null && discomfort !== null &&
            perceptionChange !== '' && awarenessImpact !== null && improvementSuggestion !== '' &&
            rating !== null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        const feedbackData = {
            age, gender, socialMediaUsage, privacyConcern, deepfakeAwareness, surprise,
            discomfort, perceptionChange, awarenessImpact, improvementSuggestion, rating
        };
        try {
            const response = await fetch('https://178.232.54.31:8189/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedbackData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            navigate('/'); // Adjust as necessary for your routing
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const ratingIcons = [
        { value: 'Terrible', icon: faAngry, color: '#FF073A' },
        { value: 'Bad', icon: faFrown, color: '#FF7E41' },
        { value: 'So-so', icon: faMeh, color: '#FFFF36' },
        { value: 'Good', icon: faSmile, color: '#a2ff00' },
        { value: 'Superb', icon: faGrinStars, color: '#0F0' },
    ];

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
        { label: "Prefer not to say", value: "prefer_not_to_say" }
    ];

    const awarenessOptions = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
        { label: "Uncertain", value: "unsure" },
    ];

    return (
        <PageContainer>
            <div className="pages-container" style={{ margin: 0, padding: 0}}>
                <div className="feedback-container">
                    <div className="header-container">
                        <h1>Participant feedback</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-question">
                            <h2>Participant Information:</h2>
                            <h2>Age:</h2>
                            <AgeSelector onChange={(newAge) => setAge(newAge)}/>
                            <h2>Gender:</h2>
                            <div className="button-container">
                                {genderOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setGender(option.value);
                                        }}
                                        className={`select-button ${gender === option.value ? 'selected' : ''}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2>How was your overall experience?</h2>
                            <div className="rating">
                                {ratingIcons.map((item, index) => (
                                    <label key={index}>
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            size="3x"
                                            color={rating === item.value ? item.color : 'gray'}
                                            onClick={() => setRating(item.value)}
                                            className={`rating-icon rating-icon-${index}`}
                                        />
                                        <span>{item.value}</span>
                                    </label>
                                ))}
                            </div>
                    </div>

                    <div className="slider-question">
                        <h2>How often do you use social media?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={socialMediaUsage}
                                style={{ '--slider-percentage': `${socialMediaUsage}%` }}
                                onChange={(e) => {
                                    setSocialMediaUsage(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Rarely or never</span>
                                <span>Several times a day</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>How concerned are you about privacy on the internet?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={privacyConcern}
                                style={{ '--slider-percentage': `${privacyConcern}%` }}
                                onChange={(e) => {
                                    setPrivacyConcern(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Not worried</span>
                                <span>Extremely worried</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>What is your previous experience or knowledge about deepfakes?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={deepfakeAwareness}
                                style={{ '--slider-percentage': `${deepfakeAwareness}%` }}
                                onChange={(e) => {
                                    setDeepfakeAwareness(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>No knowledge</span>
                                <span>Very good knowledge</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>How surprising was the manipulated image you saw?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={surprise}
                                style={{ '--slider-percentage': `${surprise}%` }}
                                onChange={(e) => {
                                    setSurprise(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Not surprising</span>
                                <span>Extremely surprising</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>How uncomfortable was it to see yourself in the manipulated scenario?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={discomfort}
                                style={{ '--slider-percentage': `${discomfort}%` }}
                                onChange={(e) => {
                                    setDiscomfort(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>Not uncomfortable</span>
                                <span>Extremely uncomfortable</span>
                            </div>
                        </div>
                    </div>

                    <div className="input-question">
                        <h2>How has this experience affected your perception of the risks of sharing personal information online?</h2>
                        <textarea
                            value={perceptionChange}
                            onChange={(e) => setPerceptionChange(e.target.value)}
                            placeholder="Type your feedback here..."
                            required
                        />
                    </div>

                    <div className="input-question">
                        <h2>Do you think this type of installation can contribute to increased awareness of deepfakes among people in general?</h2>
                        <div className="button-container">
                            {awarenessOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setAwarenessImpact(option.value);
                                    }}
                                    className={`select-button ${awarenessImpact === option.value ? 'selected' : ''}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-question">
                        <h2>Do you have any suggestions for improvements or changes to the prototype?</h2>
                        <textarea
                            value={improvementSuggestion}
                            onChange={(e) => setImprovementSuggestion(e.target.value)}
                            placeholder="Type your feedback here..."
                            required
                        />
                    </div>

                    <div className="button-container">
                        <button className="form-button" type={"submit"}>Submit Feedback</button>
                    </div>
                </form>
            </div>
            </div>
        </PageContainer>
    );
};

export default FeedbackPage;
