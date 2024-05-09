import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faFrown, faMeh, faSmile, faGrinStars } from '@fortawesome/free-regular-svg-icons';
import '../css/FeedbackPage.css';

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [socialMediaUsage, setSocialMediaUsage] = useState(50);
    const [privacyConcern, setPrivacyConcern] = useState(50);
    const [deepfakeAwareness, setDeepfakeAwareness] = useState(50);
    const [surprise, setSurprise] = useState(50);
    const [discomfort, setDiscomfort] = useState(50);
    const [perceptionChange, setPerceptionChange] = useState(50);
    const [awarenessImpact, setAwarenessImpact] = useState(50);
    const [improvementSuggestion, setImprovementSuggestion] = useState('');
    const [rating, setRating] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const feedbackData = {
            age, gender, socialMediaUsage, privacyConcern, deepfakeAwareness, surprise,
            discomfort, perceptionChange, awarenessImpact, improvementSuggestion, rating
        };
        console.log(feedbackData);
        navigate('/'); // Adjust as necessary for your routing
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
                    <div className="input-question">
                        <h2>Participant Information:</h2>
                        <label><b>Age:</b> <br></br>
                            <input type="number" min="0" max="100" value={age} onChange={e => setAge(e.target.value)} /></label>
                        <label><b>Gender:</b> <br></br>
                            <select value={gender} onChange={e => setGender(e.target.value)}>
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                        </label>
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
                                value={socialMediaUsage}
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
                        <h2>På en skala fra 1 til 5, hvor bekymret er du for personvern på internett?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={privacyConcern}
                                onChange={(e) => {
                                    setPrivacyConcern(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>1: Ikke bekymret</span>
                                <span>5: Ekstremt bekymret</span>
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
                                value={deepfakeAwareness}
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
                        <h2>På en skala fra 1 til 5, hvor overraskende var det manipulerte bildet du så?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={surprise}
                                onChange={(e) => {
                                    setSurprise(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>1: Ikke overraskende</span>
                                <span>5: Ekstremt overraskende</span>
                            </div>
                        </div>
                    </div>

                    <div className="slider-question">
                        <h2>På en skala fra 1 til 5, hvor ubehagelig var det å se deg selv i det manipulerte scenariet?</h2>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={discomfort}
                                onChange={(e) => {
                                    setDiscomfort(e.target.value);
                                    e.target.style.setProperty('--slider-percentage', `${e.target.value}%`);
                                }}
                            />
                            <div className="slider-labels">
                                <span>1: Ikke ubehagelig</span>
                                <span>5: Ekstremt ubehagelig</span>
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
                        <h2>Tror du at denne typen installasjon kan bidra til økt bevissthet om deepfakes blant folk generelt?</h2>
                        <select value={awarenessImpact} onChange={(e) => setAwarenessImpact(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="yes">Ja</option>
                            <option value="no">Nei</option>
                            <option value="unsure">Usikker</option>
                        </select>
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
                        <button type="submit" className="button">Submit Feedback</button>
                    </div>
                </form>
            </div>
        </PageContainer>
    );
};

export default FeedbackPage;
