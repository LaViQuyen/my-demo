import { Input, Pipe, PipeTransform } from '@angular/core';
import { Question } from '../../../shared/models/question.model';

@Pipe({
  name: 'isCheckCell',
  standalone: true,
})
export class IsCheckCellPipe implements PipeTransform {
  @Input() choiceId: string = '';
  transform(question: Question, ...args: any[]) {
    return (question.answer.includes(this.choiceId) &&
      question.correctAnswer.includes(this.choiceId)) ||
      question.correctAnswer.includes(this.choiceId)
      ? '<mat-icon color="primary">check</mat-icon>'
      : '';
  }
}
