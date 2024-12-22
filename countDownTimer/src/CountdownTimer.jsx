import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes }) => {
    const [time, setTime] = useState(initialMinutes * 60); // Convert minutes to seconds
    const [isActive, setIsActive] = useState(true);
    console.log("countdown component render")
    useEffect(() => {
        // Load the timer from local storage if it exists
        const savedEndTime = localStorage.getItem('countdownEndTime');
        if (savedEndTime) {
            const endTime = parseInt(savedEndTime, 10);
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = endTime - currentTime;
            if (remainingTime > 0) {
                setTime(remainingTime);
            } else {
                setTime(0);
                setIsActive(false);
            }
        } else {
            // If there's no saved end time, set a new one
            const endTime = Math.floor(Date.now() / 1000) + time;
            localStorage.setItem('countdownEndTime', endTime);
        }
    }, [time]);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time <= 0) {
            clearInterval(interval);
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <div>{formatTime(time)}</div>
        </div>
    );
};

export default CountdownTimer;
