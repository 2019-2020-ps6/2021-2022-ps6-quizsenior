import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    id: '1',
    label: 'Jean Gabin a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};

/*export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questionsDmla: [],
    },
    {
        id: '2',
        name: 'Les technos WEB',
        questionsDmla: [],
    }
];

export const QUIZ: Quiz = {
      name: 'Jours de la semaine',
      theme: 'Week',
      id: '1',
      questionsDmla: []
};*/
