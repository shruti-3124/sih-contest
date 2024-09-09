import React from 'react';

const MCQ = ({ question, options, onAnswer }) => {
  let i=0;
  return (
    <div className="mcq-card">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
