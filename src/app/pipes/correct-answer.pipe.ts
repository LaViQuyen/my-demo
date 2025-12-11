import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'lodash-es';
import { Choice } from '../shared/models/choice.model';

@Pipe({
  name: 'isCorrectAnswer',
  standalone: true,
})
export class CorrectAnswerPipe implements PipeTransform {
  transform(choice: Choice): boolean {
    return (
      choice.answer !== '' &&
      !isUndefined(choice.answer) &&
      !isUndefined(choice.correctAnswer) &&
      (choice.answer?.trim() === choice.correctAnswer?.trim() ||
        choice.correctAnswer?.split('/').includes(choice.answer?.trim()))
    );
  }
}
