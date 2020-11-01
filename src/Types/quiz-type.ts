import { type } from "os"
import React from 'react';
export type Quiz = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}


export type Questiontype = {
    question: string
    answer: string
    option: string[]
}

export type questionPropsType = {
    question: string,
    options: string[]
    callback: (e:React.FormEvent<EventTarget>)=>void
}