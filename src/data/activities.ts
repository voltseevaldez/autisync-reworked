import { IBadge } from './badges';
import { ICategory } from './categories';

export interface IChoices {
  choice: string;
  isCorrect: boolean;
}

export interface IQuestion {
  imageLink: string;
  question: string;
  choices: IChoices[];
}

export interface IActivity {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: ICategory['name'];
  description?: string;
  title?: string;
  questions: IQuestion[];
  badges?: IBadge[];
}

export const activities: IActivity[] = [
  {
    id: '1',
    difficulty: 'easy',
    category: 'Academic',
    description: 'Counting Activity',
    title: 'Counting stuff',
    questions: [
      {
        imageLink: '/assets/images/sheeps.png',
        question: 'How many Sheep can you see?',
        choices: [
          {
            choice: 'ONE',
            isCorrect: false,
          },
          {
            choice: 'TWO',
            isCorrect: false,
          },
          {
            choice: 'THREE',
            isCorrect: true,
          },
          {
            choice: 'FOUR',
            isCorrect: false,
          },
        ],
      },

      {
        imageLink: '/assets/images/sheeps.png',
        question: '2nd Question',
        choices: [
          {
            choice: 'ONE',
            isCorrect: false,
          },
          {
            choice: 'TWO',
            isCorrect: false,
          },
          {
            choice: 'THREE',
            isCorrect: true,
          },
          {
            choice: 'FOUR',
            isCorrect: false,
          },
        ],
      },
    ],
  },
];
