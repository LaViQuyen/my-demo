import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { filter, isEmpty, isNull } from 'lodash-es';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-multiple-choices-testing',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, TextSelectionDirective],
  templateUrl: './multiple-choices-testing.component.html',
  styleUrl: './multiple-choices-testing.component.scss',
})
export class MultipleChoicesTestingComponent extends AbstractQuestionComponent {
  selectedOption: string | null = '';

  override ngOnInit() {
    super.ngOnInit();
    if (
      !isEmpty(this.question.answer) &&
      Number(this.question.numberOfChoices) < 2
    ) {
      this.selectedOption = this.question.answer[0];
    }
  }

  onSelectSingleAnswer(option: string) {
    this.selectedOption = this.selectedOption === option ? null : option;
    if (isNull(this.selectedOption)) {
      this.question = {
        ...this.question,
        answer: [],
        isAnswer: false,
      };
    } else {
      this.question = {
        ...this.question,
        answer: [option],
        isAnswer: true,
      };
    }
    this.selectedId.set(this.question.id);
    this.onAnswer.emit(this.question);
  }

  onSelectMultipleAnswer(event: MouseEvent, choiceId: string) {
    this.selectedId.set(null);
    if (
      !this.question.answer.includes(choiceId) &&
      this.isReachedMaxAnswers(this.question.answer.length)
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.question.answer.includes(choiceId)) {
      this.question = {
        ...this.question,
        answer: filter(this.question.answer, (ans) => ans !== choiceId),
      };
    } else {
      (this.question.answer as string[]).push(choiceId);
      this.question = {
        ...this.question,
      };
    }
    this.onAnswer.emit(this.question);
  }

  private isReachedMaxAnswers(numberOfSelectdChoice: number) {
    return Number(this.question.numberOfChoices) === numberOfSelectdChoice;
  }
}
