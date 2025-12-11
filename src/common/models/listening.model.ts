import { AbstractPart } from './abstract-part.model';

export interface Listening extends AbstractPart {
  name: string;
  audioName?: string;
}
