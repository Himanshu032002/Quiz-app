import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { data } from '../assets/data';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);

  const handleAnswer = (optionIndex) => {
    if (optionIndex === data[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handleDownload = () => {
    if (resultRef.current === null) {
      return;
    }

    toPng(resultRef.current)
      .then((dataUrl) => {
        download(dataUrl, 'quiz-result.png');
      })
      .catch((err) => {
        console.error('Failed to generate image', err);
      });
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div>
          <div ref={resultRef} className="result">
            <h1>Quiz Results</h1>
            <p>Your Score: {score} / {data.length}</p>
          </div>
          <button className="download-button" onClick={handleDownload}>Download Result</button>
        </div>
      ) : (
        <div>
          <h2 className="question">{data[currentQuestion].question}</h2>
          <div className="options">
            <button className="option-button" onClick={() => handleAnswer(1)}>{data[currentQuestion].option1}</button>
            <button className="option-button" onClick={() => handleAnswer(2)}>{data[currentQuestion].option2}</button>
            <button className="option-button" onClick={() => handleAnswer(3)}>{data[currentQuestion].option3}</button>
            <button className="option-button" onClick={() => handleAnswer(4)}>{data[currentQuestion].option4}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
