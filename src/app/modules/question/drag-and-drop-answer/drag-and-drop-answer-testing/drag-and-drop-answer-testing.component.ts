import { Component } from '@angular/core';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FillInTheGapTestingComponent } from '../../fill-in-the-gap/fill-in-the-gap-testing/fill-in-the-gap-testing.component';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { Choice } from '../../../../shared/models/choice.model';
import {
  clone,
  each,
  filter,
  isEmpty,
  map,
  orderBy,
  sortBy,
  uniqBy,
} from 'lodash-es';
import { NgClass } from '@angular/common';
import { ChoiceContentPipe } from '../../matching-header/choice-content.pipe';
import { MatCard } from '@angular/material/card';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

const DATA_TRANSFER_KEY = 'answerId';
const DROP_OVER_CLASS = 'drop-over';
const CONTAINER_RIGHT_ID = 'container-right';

@Component({
  selector: 'app-drag-and-drop-answer-testing',
  standalone: true,
  imports: [
    AngularEditorModule,
    IsInputPipe,
    MatCard,
    ReactiveFormsModule,
    FormsModule,
    ExtractIdPipe,
    NgClass,
    TextSelectionDirective,
  ],
  templateUrl: './drag-and-drop-answer-testing.component.html',
  styleUrl: './drag-and-drop-answer-testing.component.scss',
})
export class DragAndDropAnswerTestingComponent extends FillInTheGapTestingComponent {
  answers: Choice[] = [];
  mapAnswerById: Record<string, Choice> = {};

  override ngOnInit() {
    super.ngOnInit();
    const answerIds = this.question.choices.map((choice) => choice.answer);
    this.answers =
      this.question.answers?.filter(
        (answer) => !answerIds.includes(answer.id),
      ) ?? [];
    each(this.question.answers, (answer) => {
      this.mapAnswerById[answer.id] = answer;
    });
  }

  onDragStart(event: DragEvent, answerId: string) {
    event.dataTransfer!.dropEffect = 'move';
    event.dataTransfer!.setData(DATA_TRANSFER_KEY, answerId);
    event.dataTransfer!.setDragImage(event.target as HTMLElement, 0, 0);
  }

  onDragOver(event: DragEvent, choiceId: string) {
    event.preventDefault();
    this.addDropOverClass(choiceId);
  }

  removeDropOver(event: DragEvent, id: string) {
    event.preventDefault();
    this.removeDropOverClass(id);
  }

  onDropAnswer(event: DragEvent, choice: Choice) {
    event.preventDefault();
    const answer =
      this.mapAnswerById[event.dataTransfer!.getData(DATA_TRANSFER_KEY)];
    this.clearPreviousAnswer(answer);
    if (this.mapChoiceById[choice.id]) {
      this.mapChoiceById[choice.id].answer = answer.id;
    }
    // this.answers = filter(this.answers, (a) => a.id !== choice.id);
    this.updateAnswersList();
    this.removeDropOverClass(choice.id);
    this.onAnswerChoice.emit(choice);
    this.onAnswer.emit(this.question);
  }

  private clearPreviousAnswer(dropChoice: Choice) {
    each(this.question.choices, (choice) => {
      if (choice.id !== dropChoice.id) {
        if (choice.answer === dropChoice.id) {
          choice.answer = '';
        }
      }
    });
  }

  private updateAnswersList() {
    const answeredChoices = filter(
      this.question.choices,
      (choice) => !isEmpty(choice.answer),
    ).map((choice) => choice.answer);
    this.answers = sortBy(
      filter(
        this.question.answers,
        (answer) => !answeredChoices.includes(answer.id),
      ),
      'id',
    );
  }

  onAnswerBackDrop(event: DragEvent) {
    event.preventDefault();
    const answer = ChoiceContentPipe.prototype.transform(
      event.dataTransfer!.getData(DATA_TRANSFER_KEY),
      this.question.answers!,
    );
    let answerChoice;
    if (answer) {
      each(this.question.choices, (choice) => {
        if (choice.answer === answer.id) {
          choice.answer = '';
          answerChoice = choice;
        }
      });
      this.onAnswerChoice.emit(answerChoice);
      if (!map(this.answers, (answer) => answer.id).includes(answer.id)) {
        this.answers.push(answer);
        this.answers = sortBy(this.answers, ['id']);
      }
      this.removeDropOverClass(CONTAINER_RIGHT_ID);
    }
    this.onAnswer.emit(this.question);
  }

  onAnswerBackDragOver(event: DragEvent) {
    event.preventDefault();
    this.addDropOverClass(CONTAINER_RIGHT_ID);
  }

  onAnswerBackDragLeave(event: DragEvent) {
    event.preventDefault();
    this.removeDropOverClass(CONTAINER_RIGHT_ID);
  }

  addDropOverClass(elementId: string) {
    const dropZone = document.getElementById(elementId) as HTMLElement;
    if (dropZone) {
      dropZone.classList.add(DROP_OVER_CLASS);
    }
  }

  removeDropOverClass(elementId: string) {
    const dropZone = document.getElementById(elementId) as HTMLElement;
    if (dropZone) {
      dropZone.classList.remove(DROP_OVER_CLASS);
    }
  }
}
