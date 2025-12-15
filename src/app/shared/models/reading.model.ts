import { AbstractPart } from './abstract-part.model';
import { Choice } from './choice.model'; // Nhớ import Choice

export interface Reading extends AbstractPart {
  name?: string;           // Dùng name? (optional) cho an toàn, hoặc name (required) tùy logic của bạn
  isMatchHeader?: boolean;
  answers?: Choice[];      // <-- THÊM DÒNG NÀY ĐỂ FIX LỖI
}