import React, { useState, useRef } from 'react';
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
        // Calculate new age based on the total pixels moved
        // You can adjust the sensitivity with a divisor; here, every 10 pixels equals 1 year
        const newAge = initialAge.current + Math.floor(diff / 10);
        if (newAge >= 0 && newAge <= 100) { // Keeping the age within reasonable limits
            setAge(newAge);
            onChange(newAge);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="age-selector" onMouseDown={handleMouseDown}>
            <div style={{ fontSize: '100px', textAlign: 'center' }}>{age}</div>
        </div>
    );
};

export default AgeSelector;
