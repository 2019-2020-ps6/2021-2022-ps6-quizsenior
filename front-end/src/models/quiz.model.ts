import {Question} from './question.model';

export interface Quiz {
  _id: string;
  name: string;
  theme: string;
  questions: Question[];
  nbRepetition: string;
}
