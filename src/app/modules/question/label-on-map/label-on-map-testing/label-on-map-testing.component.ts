import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { ReactiveFormsModule } from '@angular/forms';
import { isEmpty } from 'lodash-es';
import { LabelOnMapEditingComponent } from '../label-on-map-editing/label-on-map-editing.component';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-label-on-map-testing',
  standalone: true,
  imports: [
    MatIcon,
    AngularEditorModule,
    ReactiveFormsModule,
    TextSelectionDirective,
  ],
  templateUrl: './label-on-map-testing.component.html',
  styleUrl: '../label-on-map.component.scss',
})
export class LabelOnMapTestingComponent extends LabelOnMapEditingComponent {
  onSelectAnswer(questionIndex: number, choiceIndex: number) {
    const choiceId =
      this.question.subQuestions![questionIndex].choices[choiceIndex].id;
    const correctAnswer =
      this.question.subQuestions![questionIndex].correctAnswer;
    const answer = this.question.subQuestions![questionIndex].answer;
    if (!isEmpty(correctAnswer) && answer.includes(choiceId)) {
      this.question.subQuestions![questionIndex].answer = [];
    } else {
      this.question.subQuestions![questionIndex].answer = [choiceId];
    }
    this.selectedId.set(this.question.subQuestions![questionIndex].id);
    this.selectedQuestionIndex.set({
      id: this.question.subQuestions![questionIndex].id,
      isAnswer: !isEmpty(this.question.subQuestions![questionIndex].answer),
      isReview: false,
    });
    this.onAnswer.emit(this.question);
  }
}
