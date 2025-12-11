import { Component } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { IsCheckCellPipe } from '../is-check-cell.pipe';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CHOICE_INDEX } from '../../../../utils/constant';
import { each, isEmpty, last } from 'lodash-es';
import { Choice } from '../../../../shared/models/choice.model';
import { CommonUtils } from '../../../../utils/common-utils';

@Component({
  selector: 'app-label-on-map-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    IsCheckCellPipe,
    MatButton,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './label-on-map-editing.component.html',
  styleUrl: '../label-on-map.component.scss',
})
export class LabelOnMapEditingComponent extends AbstractQuestionComponent {
  choiceIndex = CHOICE_INDEX;

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

  onSelectCorrectAnswer(questionIndex: number, choiceIndex: number) {
    const choiceId =
      this.question.subQuestions![questionIndex].choices[choiceIndex].id;
    const correctAnswer =
      this.question.subQuestions![questionIndex].correctAnswer;
    if (!isEmpty(correctAnswer) && correctAnswer.includes(choiceId)) {
      this.question.subQuestions![questionIndex].correctAnswer = [];
    } else {
      this.question.subQuestions![questionIndex].correctAnswer = [choiceId];
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
