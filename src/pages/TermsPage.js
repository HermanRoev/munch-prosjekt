import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import '../css/TermsPage.css'; // make sure the CSS file is in the same directory

const TermsPage = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();

    const handleAgree = () => {
        setIsAgreed(!isAgreed);
    };

    const handleContinue = () => {
        if (isAgreed) {
            navigate('/capture'); // replace '/next-page' with the actual path
        } else {
            alert("Please agree to the terms and conditions to continue.");
        }
    };

    return (
        <PageContainer>
            <div className="pages-container">
                <div className="header-container">
                    <h1>Consent Form</h1>
                </div>

                <p>
                    Thank you for participating in our interactive art installation. Before we begin, we need your
                    consent for the use of your photograph during this exhibit. Please read the following terms and
                    conditions.
                </p>
                <div>
                    <ol>
                        <li><strong>Photo Use:</strong> Your photograph will be captured as part of an interactive
                            element within the art installation, potentially transformed or incorporated into artistic
                            representations within the exhibit's themes.
                        </li>
                        <li><strong>Purpose:</strong> The use of your photograph is intended to engage with themes of
                            identity, art, and technology.
                        </li>
                        <li><strong>Privacy and Anonymity:</strong> Efforts will be made to ensure your privacy. Your
                            photograph will be used exclusively within this exhibit and not for any other purposes
                            without further consent.
                        </li>
                        <li><strong>Temporary Storage:</strong> Your photograph will be stored locally and only for the
                            duration of the exhibit (a matter of minutes) before being permanently deleted. It will not
                            be shared with any third parties.
                        </li>
                        <li><strong>No Compensation:</strong> Participation is voluntary, without financial compensation
                            for the use of your photograph.
                        </li>
                    </ol>
                </div>
                <div className="consent-container">
                    <p>I am 13 years old or older and agree to the Terms and Conditions and Privacy Policy. By checking
                        this
                        box, I acknowledge that I have read, understood, and consent to the terms and policies
                        outlined.</p>
                    <label className="switch" htmlFor="checkbox">
                        <input type="checkbox" id="checkbox" checked={isAgreed} onChange={handleAgree}/>
                        <div className="slider round"></div>
                    </label>
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleContinue}>CONTINUE</button>
                </div>
            </div>
        </PageContainer>
    );
}

export default TermsPage;
