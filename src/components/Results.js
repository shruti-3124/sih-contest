import React from 'react';

const Results = ({ questions, userAnswers, score, totalQuestions }) => {
  return (
    <div className="results">
      <h2>Your Results</h2>
      <p>You scored {score} out of {totalQuestions}</p>

      <div className="answers-review">
        {questions.map((question, index) => (
          <div key={index} className="answer-review">
            <p><strong>Question {index + 1}:</strong> {question.question}</p>
            <p><strong>Your Answer:</strong> {userAnswers[index]}</p>
            <p><strong>Correct Answer:</strong> {question.correct}</p>
            {userAnswers[index] === question.correct ? (
              <p className="correct">Correct!</p>
            ) : (
              <p className="incorrect">Incorrect. {question.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;

