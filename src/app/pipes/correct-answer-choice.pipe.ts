import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../shared/models/question.model';

@Pipe({
  standalone: true,
  name: 'correctAnswerChoice',
})
export class CorrectAnswerChoicePipe implements PipeTransform {
  transform(question: Question): string {
    const selectedChoice = question.choices.find(
      (choice) => choice.id === question.correctAnswer.toString(),
    );
    if (selectedChoice) {
      return selectedChoice.content;
    }
    return '';
  }
}
