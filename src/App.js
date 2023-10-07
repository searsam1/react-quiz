import { useState } from 'react';
import { questions } from './questions';
import './App.css';

function App() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    const correctAnswer = questions[questionIdx].correctAnswer;
    return answer === correctAnswer && !questions[questionIdx].attempted;
  };

  const updateScore = () => {
    setScore(score + 1);
    questions[questionIdx].attempted = true;
  };

  const nextQuestion = () => {
    if (checkAnswer()) {
      updateScore();
    }
    setAnswer('');
    setQuestionIdx(questionIdx + 1);

    if (questionIdx === questions.length - 1) {
      alert(score);
      setQuestionIdx(0);
      setScore(0);
    }
  };

  const previousQuestion = () => {
    setQuestionIdx(questionIdx - 1);
  };

  const currentQuestion = questions[questionIdx];

  return (
    <div className='Page'>
      <div className="Quiz">
        <h2>{currentQuestion.question} ( {questionIdx + 1} )</h2>
        <form>
          {currentQuestion.answers.map((ans, idx) => (
            <div key={idx}>
              <input
                type="radio"
                id={`answer${idx}`}
                name="answer"
                value={ans}
                onChange={({ target }) => setAnswer(target.value)}
                checked={answer === ans}
              />
              <label htmlFor={`answer${idx}`}>{ans}</label>
            </div>
          ))}
        </form>
        <button disabled={questionIdx === 0} onClick={previousQuestion}>
          Previous
        </button>
        <button disabled={questionIdx === questions.length - 1} onClick={nextQuestion}>
          Next
        </button>
        <p className='score'>
          Score: <span>{score}</span> / {questions.length}
        </p>
      </div>
    </div>
  );
}

export default App;
