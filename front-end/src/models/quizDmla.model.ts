import { QuestionDmla } from './questionDmla.model';

export interface QuizDmla {
  _id: string;
  name: string;
  theme: string;
  questions: QuestionDmla[];
}
