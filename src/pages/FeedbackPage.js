import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import AgeSelector  from "../components/AgeSelector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faFrown, faMeh, faSmile, faGrinStars } from '@fortawesome/free-regular-svg-icons';
import '../css/FeedbackPage.css';

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState('');
    const [socialMediaUsage, setSocialMediaUsage] = useState(0);
    const [privacyConcern, setPrivacyConcern] = useState(0);
    const [deepfakeAwareness, setDeepfakeAwareness] = useState(0);
    const [surprise, setSurprise] = useState(0);
    const [discomfort, setDiscomfort] = useState(0);
    const [perceptionChange, setPerceptionChange] = useState('');
    const [awarenessImpact, setAwarenessImpact] = useState(0);
    const [improvementSuggestion, setImprovementSuggestion] = useState('');
    const [rating, setRating] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const feedbackData = {
            age, gender, socialMediaUsage, privacyConcern, deepfakeAwareness, surprise,
            discomfort, perceptionChange, awarenessImpact, improvementSuggestion, rating
        };
        try {
            const response = await fetch('http://178.232.54.31:8189/submit', {
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
        { label: "Ja", value: "yes" },
        { label: "Nei", value: "no" },
        { label: "Usikker", value: "unsure" },
    ];

    return (
        <PageContainer>
            <div className="pages-container" style={{ margin: 0, padding: 0 }}>
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
                        <h2>Hvor ofte bruker du sosiale medier?</h2>
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
                                <span>Sjelden eller aldri</span>
                                <span>Flere ganger om dagen</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>Hvor bekymret er du for personvern på internett?</h2>
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
                                <span>Ikke bekymret</span>
                                <span>Ekstremt bekymret</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>Hva er din tidligere erfaring eller kunnskap om deepfakes?</h2>
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
                                <span>Ingen kunnskap</span>
                                <span>Veldig god kunnskap</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>Hvor overraskende var det manipulerte bildet du så?</h2>
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
                                <span>Ikke overraskende</span>
                                <span>Ekstremt overraskende</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>Hvor ubehagelig var det å se deg selv i det manipulerte scenariet?</h2>
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
                                <span>Ikke ubehagelig</span>
                                <span>Ekstremt ubehagelig</span>
                            </div>
                        </div>
                    </div>

                    <div className="input-question">
                        <h2>Hvordan har denne opplevelsen påvirket din oppfatning av risikoene ved å dele personlig informasjon på nettet?</h2>
                        <textarea
                            value={perceptionChange}
                            onChange={(e) => setPerceptionChange(e.target.value)}
                            placeholder="Type your feedback here..."
                        />
                    </div>

                    <div className="input-question">
                        <h2>Tror du at denne typen installasjon kan bidra til økt bevissthet om deepfakes blant folk
                            generelt?</h2>
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
                        <h2>Har du noen forslag til forbedringer eller endringer i prototypen?</h2>
                        <textarea
                            value={improvementSuggestion}
                            onChange={(e) => setImprovementSuggestion(e.target.value)}
                            placeholder="Type your feedback here..."
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
