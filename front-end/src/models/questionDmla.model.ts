export interface AnswerDmla {
  type?: string;
  value: string;
  isCorrect: boolean;
}

export interface QuestionDmla {
  id: string;
  label: string;
  answers: AnswerDmla[];
}
