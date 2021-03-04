
import {Quiz,Question_types} from './../Types/quiz_types';
const shuffleArray = (array: any[]) =>
[...array].sort(() => Math.random() - 0.5)
export const  QuizData= async(QuestionNumber:number,QuestionLevel:string):Promise<Question_types[]>=>{

  


    const res = await fetch(`https://opentdb.com/api.php?amount=${QuestionNumber}&difficulty=${QuestionLevel}&type=multiple`)

    let  {results} = await res.json();

    const quiz:Question_types[] = results.map((questionobj:Quiz)=>{
        return{
            question:questionobj.question,
            answer:questionobj.correct_answer,
            correct_answer: questionobj.correct_answer,
            option:shuffleArray(questionobj.incorrect_answers.concat(questionobj.correct_answer))
        }

    })
    return quiz;
}