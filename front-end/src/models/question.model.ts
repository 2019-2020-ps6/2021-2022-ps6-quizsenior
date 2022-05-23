export interface Answer {
  _id: string;
  value: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  label: string;
  answers: Answer[];
  imageUrl?: string;
}
