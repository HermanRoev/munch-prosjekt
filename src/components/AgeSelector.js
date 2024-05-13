import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../css/AgeSelector.css';

const AgeSelector = ({ onChange }) => {
    const [age, setAge] = useState(30); // Initial age set to 30 for demonstration
    const lastY = useRef(0);
    const initialAge = useRef(30);

    const handleMouseDown = (e) => {
        lastY.current = e.clientY;
        initialAge.current = age;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const diff = lastY.current - e.clientY;
        const newAge = initialAge.current + Math.floor(diff / 10);
        if (newAge >= 0 && newAge <= 100) {
            setAge(newAge);
            onChange(newAge);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const increaseAge = (e) => {
        e.preventDefault();
        setAge(prevAge => {
            const newAge = Math.min(prevAge + 1, 100);
            onChange(newAge);
            return newAge;
        });
    };

    const decreaseAge = (e) => {
        e.preventDefault();
        setAge(prevAge => {
            const newAge = Math.max(prevAge - 1, 0);
            onChange(newAge);
            return newAge;
        });
    };

    return (
        <div className="age-selector" onMouseDown={handleMouseDown}>
            <div className="age-display">
                <FontAwesomeIcon icon={faMinus} onClick={decreaseAge} className="age-icon" size="xl"/>
                <div style={{fontSize: '100px', textAlign: 'center'}}>{age}</div>
                <FontAwesomeIcon icon={faPlus} onClick={increaseAge} className="age-icon" size="xl"/>
            </div>
        </div>
    );
};

export default AgeSelector;