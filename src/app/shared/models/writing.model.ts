import { AbstractPart } from './abstract-part.model';

export interface Writing extends AbstractPart {
  name?: string;
  studentName?: string;
  answer: string;
  parts?: Writing[];
  isSubmit?: boolean;
}
