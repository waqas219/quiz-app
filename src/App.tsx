import React, { useEffect,useState } from 'react';
import './App.css';
import { getQuizDetails } from './Services/quiz_service';
import { Quiz,Questiontype } from './Types/quiz-type';
import QuestionPage from './Components/QuestionPage';
function App() {
  let [quiz, setQuiz] = useState<Questiontype[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  useEffect (()=> {
    async function fetchData () {
      const questions:Questiontype[] = await getQuizDetails(5, 'easy');
      console.log(questions);
      setQuiz(questions)
    }
    fetchData();
  },[])
  const handleSubmit = (e:React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (currentStep !== quiz.length-1)
      setCurrentStep(++currentStep)
    else alert("Quiz completed")  
  }
  if(!quiz.length) {
    return <h3>Loading...</h3>
  }
  return (
    <div className="App">
      <QuestionPage
      options={quiz[currentStep].option}
      question={quiz[currentStep].question} 
      callback={handleSubmit}
      />
    </div>
  );
}

export default App;
