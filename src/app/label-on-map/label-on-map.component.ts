import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { each, isEmpty, last } from 'lodash-es';
import { AbstractQuestionComponent } from '../../common/abstract-question.component';
import { Choice } from '../../common/models/choice.model';
import { CorrectChoicesPipe } from '../../common/pipes/correct-choices.pipe';
import { CommonUtils } from '../../utils/common-utils';
import { CHOICE_INDEX } from '../../utils/constant';
import { TextSelectionDirective } from "../shared/directives/text-selection.directive";

@Component({
  selector: 'app-label-on-map',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    TextSelectionDirective
  ],
  templateUrl: './label-on-map.component.html',
  styleUrl: './label-on-map.component.scss',
})
export class LabelOnMapComponent extends AbstractQuestionComponent {
  choiceIndexs = CHOICE_INDEX;
  selectedIndex = 0;

  addQuestion(questionType: number): void {
    const lastQuestion = last(this.question.subQuestions);
    let choices: Choice[] = [];
    if (lastQuestion) {
      choices = [...lastQuestion.choices];
    }
    this.question.subQuestions?.push({
      id: CommonUtils.generateRandomId(),
      content: '',
      type: questionType,
      choices: choices,
      answer: [],
      correctAnswer: [],
    });
  }

  onRowClick(questionIndex: number, choiceIndex: number) {
    const choiceId =
      this.question.subQuestions![questionIndex].choices[choiceIndex].id;
    const correctAnswer =
      this.question.subQuestions![questionIndex].correctAnswer;
    const answer = this.question.subQuestions![questionIndex].answer;

    if (this.isEditing) {
      if (!isEmpty(correctAnswer) && correctAnswer.includes(choiceId)) {
        this.question.subQuestions![questionIndex].correctAnswer = [];
      } else {
        this.question.subQuestions![questionIndex].correctAnswer = [choiceId];
      }
    }
    if (this.isTesting) {
      if (!isEmpty(correctAnswer) && answer.includes(choiceId)) {
        this.question.subQuestions![questionIndex].answer = [];
      } else {
        this.question.subQuestions![questionIndex].answer = [choiceId];
      }
    }
  }

  onAddColumn() {
    const newChoice = {
      id: CommonUtils.generateRandomId(),
      content: '',
    };
    each(this.question.subQuestions, (question) => {
      question.choices.push(newChoice);
    });
  }

  onRemoveColumn() {
    each(this.question.subQuestions, (question) => {
      question.choices.splice(question.choices.length - 1, 1);
    });
  }

  onRemoveRow(index: number) {
    this.question.subQuestions?.splice(index, 1);
  }
}
