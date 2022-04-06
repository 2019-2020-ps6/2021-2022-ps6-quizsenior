import { QuestionDmla } from './questionDmla.model';

export interface QuizDmla {
  id: string;
  name: string;
  theme?: string;
  questions: QuestionDmla[];
  repetition: string;
  nbRepetition: string;
}
