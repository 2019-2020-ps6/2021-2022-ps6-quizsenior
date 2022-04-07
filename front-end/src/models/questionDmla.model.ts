export interface AnswerDmla {
  type?: string;
  value: string;
  isCorrect: boolean;
  index: number;
}

export interface QuestionDmla {
  id: string;
  label: string;
  answers: AnswerDmla[];
}
