
export interface QuizGame {
  _id: string;
  correctAnswers: string;
  incorrectAnswers: string;
  quizId: string;
  userId: string;
  type: string;

  nbRepetition?: string;
}
