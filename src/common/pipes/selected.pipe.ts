import { Input, Pipe, PipeTransform } from '@angular/core';
import { Quiz } from '../models/quiz.model';

@Pipe({
  name: 'selected',
  standalone: true,
})
export class SelectedPipe implements PipeTransform {
  @Input() quizzes: Quiz[] = [];
  transform(value: string, ...args: any[]): any {
    return this.quizzes.map((quiz) => quiz.id).includes(value.trim());
  }
}
