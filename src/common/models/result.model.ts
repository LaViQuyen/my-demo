import { Quiz } from './quiz.model';

export interface Result extends Quiz {
  studentName: string;
  correctListeningPoint: number;
  totalListeningPoint: number;
  correctReadingPoint: number;
  totalReadingPoint: number;
  testDate: string;
  quizId: string;
  isSubmit: boolean;
  currentTab?: number;
  feedback?: Feedback;
}

export interface Feedback {
  rating: number;
  content: string;
}
