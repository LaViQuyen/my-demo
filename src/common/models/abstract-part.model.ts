import { Question } from './question.model';

export interface AbstractPart {
  id: string;
  content: string;
  timeout: number | undefined;
  questions: Question[];
  wordCount: number;
  testDate: string;
}
