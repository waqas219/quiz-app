import { isMainThread } from 'worker_threads';
import { Quiz, Questiontype } from './../Types/quiz-type';

export const shufflearray = (array: any[]) => 
[...array].sort(()=>Math.random() - 0.5)

export const getQuizDetails = async (totalQuestions: number, level: string): Promise<Questiontype[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    let { results } = await res.json();

    const quiz:Questiontype[] = results.map((questionObj: Quiz) => {
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: shufflearray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quiz;
}