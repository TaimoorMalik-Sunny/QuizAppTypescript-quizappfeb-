import React, {useEffect, useState} from 'react';

import './App.css';

import {QuizData} from './Services/Quiz_Service';
import {Question_types} from './Types/quiz_types'
import QuestionCard from './Components/QuestionCard';


function App() {

  let [quiz, setQuiz] = useState<Question_types[]>([])
  let [currentstep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)


  useEffect(()=>{ async function fetchData() {
      const questions:Question_types[]= await QuizData(5,'easy');
      console.log(questions);
      

      setQuiz(questions)

      
      
    }
    fetchData();
    

    

  },[]);

  const restartQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
        
    
}
  const handlesubmite =(e:React.FormEvent<EventTarget> , userAns:string) =>{
    e.preventDefault();

    const currentQuestion:Question_types = quiz[currentstep];
    console.log("Correct Ans =" +currentQuestion.correct_answer+"--user slected ans ="+ userAns)
      
    if (userAns === currentQuestion.correct_answer){
      setScore(++score);
  
    }
    if (currentstep!==quiz.length-1)
    setCurrentStep(++currentstep);
    else{
     // alert("Your final score is : "+ score + "out of : "+ quiz.length)
      // setCurrentStep(0);
      // setScore(0);
      setShowResult(true);
    }

  }
if(!quiz.length)
return  <h3>Loading...</h3>


if (
  showResult){
  return(
    <div className="Result-container">
      <h2>Result</h2>
      <p>Your final score is : 
        <b>{score} </b>+ out of : <b>{quiz.length}</b></p>

      <input type="submit" onClick={restartQuiz}></input>
    </div>
  )
}



  return (
    
    <div className="App">
       
<h1>Quiz App</h1>
      <QuestionCard
      
      options = {quiz[currentstep].option}
      question = {quiz[currentstep].question}
      answer = {quiz[currentstep].answer}
      callback = {handlesubmite}
      />
      
    </div>
  );
}

export default App;
