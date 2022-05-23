import {Answer, Question} from './question.model';

export interface QuizGame {
  _id: string;
  correctAnswers: string;
  incorrectAnswers: string;
  quizId: string;
  userId: string;
  type: string;

  answers: QuizGameAnswers[];
  creationDate: string;
  nbRepetition?: string;
}

export interface QuizGameAnswers {
  _id: string;
  quizGameId: string;
  questionRep: Question;
  answerRep: Answer;
  time: string;
}
