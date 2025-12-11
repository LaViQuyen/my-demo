import { Pipe } from '@angular/core';
import { differenceWith, isEqual } from 'lodash-es';
import { Question } from '../models/question.model';
import { AbstractAnswerPipe } from './abstract-answer.pipe';

@Pipe({
  name: 'isCorrectChoices',
  standalone: true,
})
export class CorrectChoicesPipe extends AbstractAnswerPipe {
  override transform(question: Question, ...args: any[]): boolean {
    return (
      question.answer.length > 0 &&
      differenceWith(question.answer, question.correctAnswer, isEqual)
        .length === 0
    );
  }
}
