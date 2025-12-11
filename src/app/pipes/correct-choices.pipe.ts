import { Pipe, PipeTransform } from '@angular/core';
import { differenceWith, isEqual } from 'lodash-es';
import { Question } from '../shared/models/question.model';

@Pipe({
  name: 'isCorrectChoices',
  standalone: true,
})
export class CorrectChoicesPipe implements PipeTransform {
  transform(question: Question): boolean {
    return (
      question.answer.length > 0 &&
      differenceWith(question.answer, question.correctAnswer, isEqual)
        .length === 0
    );
  }
}
