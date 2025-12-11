import { Component } from '@angular/core';
import { CorrectAnswerPipe } from '../../../../pipes/correct-answer.pipe';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';

@Component({
  selector: 'app-short-answer-readonly',
  standalone: true,
  imports: [CorrectAnswerPipe],
  templateUrl: './short-answer-readonly.component.html',
  styleUrl: '../short-answer.component.scss',
})
export class ShortAnswerReadonlyComponent extends AbstractQuestionComponent {}
