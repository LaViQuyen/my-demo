import { AbstractPart } from './abstract-part.model';
import { Choice } from './choice.model'; // Nhớ import Choice

export interface Reading extends AbstractPart {
  name?: string;
  isMatchHeader?: boolean; // Chỉ giữ 1 dòng này
  answers?: Choice[];      // <-- THÊM DÒNG NÀY ĐỂ FIX LỖI
}
