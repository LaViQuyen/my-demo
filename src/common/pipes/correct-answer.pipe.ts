import { Pipe } from '@angular/core';
import { isUndefined } from 'lodash-es';
import { Choice } from '../models/choice.model';
import { AbstractAnswerPipe } from './abstract-answer.pipe';

@Pipe({
  name: 'isCorrectAnswer',
  standalone: true,
})
export class CorrectAnswerPipe extends AbstractAnswerPipe {
  override transform(choice: Choice, ...args: any[]): any {
    return (
      choice.answer !== '' &&
      !isUndefined(choice.answer) &&
      !isUndefined(choice.correctAnswer) &&
      (choice.answer?.trim() === choice.correctAnswer?.trim() ||
        choice.correctAnswer?.split('/').includes(choice.answer?.trim()))
    );
  }
}
