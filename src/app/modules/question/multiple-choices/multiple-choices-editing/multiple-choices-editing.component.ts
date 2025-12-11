import { Component } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { filter, isEmpty, isNull } from 'lodash-es';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-multiple-choices-editing',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MatIcon, MatButton],
  templateUrl: './multiple-choices-editing.component.html',
  styleUrl: './multiple-choices-editing.component.scss',
})
export class MultipleChoicesEditingComponent extends AbstractQuestionComponent {
  selectedOption: string | null = '';

  override ngOnInit() {
    if (!isEmpty(this.question.correctAnswer)) {
      this.selectedOption = this.question.correctAnswer[0];
    }
  }

  onSelectSingleCorrectAnswer(option: string) {
    this.selectedOption = this.selectedOption === option ? null : option;
    if (isNull(this.selectedOption)) {
      this.question.correctAnswer = [];
    } else {
      this.question.correctAnswer = [option];
    }
  }

  onSelectMultipleCorrectAnswer(event: MouseEvent, choiceId: string) {
    if (
      !this.question.correctAnswer.includes(choiceId) &&
      this.isReachedMaxAnswers(this.question.correctAnswer.length)
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.question.correctAnswer.includes(choiceId)) {
      this.question.correctAnswer = filter(
        this.question.correctAnswer,
        (ans) => ans !== choiceId,
      );
    } else {
      this.question.correctAnswer.push(choiceId);
    }
  }

  private isReachedMaxAnswers(numberOfSelectdChoice: number) {
    return Number(this.question.numberOfChoices) === numberOfSelectdChoice;
  }
}
