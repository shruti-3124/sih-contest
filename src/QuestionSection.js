import React, { useState } from 'react';
import Story from './components/Story';  
import MCQ from './components/MCQ';      
import Progress from './components/Progress'; 
import Results from './components/Results';  
import Leaderboard from './components/Leaderboard'; 
import './App.css';


const App = () => {
  const questions = [
    {
      question: "Who was the chairman of the Drafting Committee of the Indian Constitution?",
      options: ["B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel", "Rajendra Prasad"],
      correct: "B. R. Ambedkar",
      explanation: "B. R. Ambedkar was the chairman of the Drafting Committee of the Indian Constitution."
    },
    {
      question: "When was the Constitution of India adopted?",
      options: ["26th January 1950", "15th August 1947", "26th November 1949", "2nd October 1947"],
      correct: "26th November 1949",
      explanation: "The Constitution of India was adopted on 26th November 1949 and came into effect on 26th January 1950."
    },
    {
      question: "What is the preamble of the Indian Constitution?",
      options: ["A declaration of independence", "A summary of fundamental rights", "An introduction to the Constitution", "A list of amendments"],
      correct: "An introduction to the Constitution",
      explanation: "The preamble serves as an introduction to the Constitution, outlining the objectives and principles of the document."
    },
    {
      question: "How many schedules are there in the Indian Constitution?",
      options: ["8", "10", "12", "14"],
      correct: "12",
      explanation: "The Indian Constitution initially had 8 schedules, but currently, it has 12 schedules."
    },
    {
      question: "Which part of the Indian Constitution deals with Fundamental Rights?",
      options: ["Part I", "Part II", "Part III", "Part IV"],
      correct: "Part III",
      explanation: "Part III of the Indian Constitution deals with Fundamental Rights."
    },
    {
      question: "Which article of the Indian Constitution abolishes untouchability?",
      options: ["Article 14", "Article 17", "Article 21", "Article 25"],
      correct: "Article 17",
      explanation: "Article 17 of the Indian Constitution abolishes untouchability."
    },
    {
      question: "What is the minimum age required to become the President of India?",
      options: ["25 years", "30 years", "35 years", "40 years"],
      correct: "35 years",
      explanation: "The minimum age required to become the President of India is 35 years."
    },
    {
      question: "Which part of the Indian Constitution deals with the Directive Principles of State Policy?",
      options: ["Part II", "Part III", "Part IV", "Part V"],
      correct: "Part IV",
      explanation: "Part IV of the Indian Constitution deals with the Directive Principles of State Policy."
    },
    {
      question: "The Indian Constitution is divided into how many parts?",
      options: ["20", "22", "25", "30"],
      correct: "25",
      explanation: "The Indian Constitution is divided into 25 parts."
    },
    {
      question: "Which amendment to the Indian Constitution is known as the 'Mini Constitution'?",
      options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "74th Amendment"],
      correct: "42nd Amendment",
      explanation: "The 42nd Amendment is often referred to as the 'Mini Constitution' because of the extensive changes it made."
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (selectedOption) => {
    setUserAnswers([...userAnswers, selectedOption]);

    if (selectedOption === questions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="app">
      <Story />
      {showResults ? (
        <>
          <Results
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            totalQuestions={questions.length}
          />
          <Leaderboard score={score} />
        </>
      ) : (
        <>
          <Progress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
          <MCQ 
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
};

export default App;