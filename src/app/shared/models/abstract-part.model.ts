import { Question } from './question.model';

export interface AbstractPart {
  id: string;
  content: string;
  timeout: number | undefined;
  questions: Question[];
  wordCount?: number;     // Giữ nguyên cái này đã sửa
  testDate: string;
  isMatchHeader?: boolean; // <--- THÊM DÒNG NÀY (Để sửa lỗi TS2339)
}