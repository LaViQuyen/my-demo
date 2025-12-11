import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isString } from 'lodash-es';
import { Question } from '../shared/models/question.model';

@Pipe({
  name: 'isCorrectDropdown',
  standalone: true,
})
export class CorrectDropdownPipe implements PipeTransform {
  transform(question: Question): boolean {
    if (isString(question.answer) && isString(question.correctAnswer)) {
      return question.answer === question.correctAnswer;
    }
    return (
      !isEmpty(question.answer) &&
      question.correctAnswer.includes(question.answer as string)
    );
  }
}
