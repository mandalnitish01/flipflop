import React, { useState, useEffect, useRef } from "react";
import '../FlipClock.css'

const FlipClock = () => {
  const [time, setTime] = useState(new Date());


  const prevDigits = useRef({
    hours: null,
    minutes: null,
    seconds: null
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Get current digits
      const currentHours = ((now.getHours() + 11) % 12 + 1);
      const currentMinutes = now.getMinutes().toString().padStart(2, "0");
      const currentSeconds = now.getSeconds().toString().padStart(2, "0");

      // Compare with previous and animate only changed digits
      if (currentHours !== prevDigits.current.hours) {
        animateDigit('hours-digit');
      }
      if (currentMinutes !== prevDigits.current.minutes) {
        animateDigit('minutes-digit');
      }
      if (currentSeconds !== prevDigits.current.seconds) {
        animateDigit('seconds-digit');
      }

      // Update previous digits
      prevDigits.current = {
        hours: currentHours,
        minutes: currentMinutes,
        seconds: currentSeconds
      };
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const animateDigit = (id) => {
    const digit = document.getElementById(id);
    if (digit) {
      // Reset animation
      digit.style.animation = 'none';
      digit.offsetHeight; // Trigger reflow
      // Apply animation
      digit.style.animation = 'digit-flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  };

  const hours =((time.getHours() + 11) % 12 + 1);
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = (time.getHours() >= 12 ? "PM" : "AM");



  return (
    <div 
      className="flip-clock"
    >
      <div className="card time-card">
        <div className="label pulse">{ampm}</div>
        <div className="digit-container">
          <div 
            className="digit" 
            id="hours-digit"
            key={`hours-${hours}`} // Key helps React track changes
          >
            {hours}
          </div>
        </div>
      </div>
      
      <div className="dot">:</div>
      
      <div className="card min-sec">
        <div className="digit-container">
          <div 
            className="digit" 
            id="minutes-digit"
            key={`minutes-${minutes}`}
          >
            {minutes}
          </div>
        </div>
        <div className="dot">:</div>
        <div className="digit-container">
          <div 
            className="digit" 
            id="seconds-digit"
            key={`seconds-${seconds}`}
          >
            {seconds}
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default FlipClock;