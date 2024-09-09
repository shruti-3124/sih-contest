import React from 'react';
import './Progress.css'; 

const Progress = ({ currentQuestion, totalQuestions }) => {
  return (
    <div className="progress-indicator">
      <p>Question {currentQuestion} of {totalQuestions}</p>
    </div>
  );
};
export default Progress;
