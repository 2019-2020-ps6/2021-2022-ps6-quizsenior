export interface AnswerDmla {
  value: string;
  isCorrect: boolean;
}

export interface QuestionDmla {
  _id: string;
  label: string;
  answers: AnswerDmla[];
}
