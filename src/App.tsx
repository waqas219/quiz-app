import React, { useEffect,useState } from 'react';
import './App.css';
import { getQuizDetails } from './Services/quiz_service';
import { Quiz,Questiontype } from './Types/quiz-type';
import QuestionPage from './Components/QuestionPage';
function App() {
  let [quiz, setQuiz] = useState<Questiontype[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  useEffect (()=> {
    async function fetchData () {
      const questions:Questiontype[] = await getQuizDetails(5, 'easy');
      console.log(questions);
      setQuiz(questions)
    }
    fetchData();
  },[])
  const handleSubmit = (e:React.FormEvent<EventTarget>, userAns:string) => {
    e.preventDefault();

    const currentQuestion = quiz[currentStep];
    console.log("correct Ans: "+ currentQuestion.correct_answer +" user Selection: "+ userAns);
    if (userAns === currentQuestion.correct_answer) {
      setScore(++score);
    }
    if (currentStep !== quiz.length-1)
      setCurrentStep(++currentStep)
    else {
      setShowResult(true);
    }  
  }
  if(!quiz.length) {
    return <h3>Loading...</h3>
  }
  if(showResult) {
    return (<div className='question-container result-container'>
      <h3>Result</h3>

      <p className='result-text'>
        Your score is <b>{score}</b> out of <b>{quiz.length}</b> 
      </p>
    </div>)
  }
  return (
    <div className="App">

      <h1>Quiz App</h1>
      <QuestionPage
      options={quiz[currentStep].option}
      question={quiz[currentStep].question} 
      callback={handleSubmit}
      />
    </div>
  );
}

export default App;
