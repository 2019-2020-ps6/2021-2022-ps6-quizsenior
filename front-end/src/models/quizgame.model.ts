import { Quiz } from './quiz.model';

export interface QuizGame {
  id: string;
  user?: string;
  score: string;
  quiz: Quiz;
  answers: Map<string, string>;
}
