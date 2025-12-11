import { Choice } from './choice.model';

export interface Question {
  id: string;
  name?: string;
  content?: string;
  arrayContent?: string[][];
  tableContent?: Record<string, Record<string, string[][]>>;
  type?: number | null;
  answer: string[] | string;
  correctAnswer: string[];
  choices: Choice[];
  subQuestions?: Question[];
  numberOfChoices?: number;
  isAnswer?: boolean;
  answers?: Choice[]
}
