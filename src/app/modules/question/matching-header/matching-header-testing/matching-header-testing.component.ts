import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { ChoiceContentPipe } from '../choice-content.pipe';
import { each, filter, map, sortBy } from 'lodash-es';
import { MatchingHeaderEditingComponent } from '../matching-header-editing/matching-header-editing.component';
import { Choice } from '../../../../shared/models/choice.model';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { NgClass } from '@angular/common';
import { Question } from '../../../../shared/models/question.model';

const DATA_TRANSFER_KEY = 'answerId';
const DROP_OVER_CLASS = 'drop-over';
const CONTAINER_RIGHT_ID = 'container-right';

@Component({
  selector: 'app-matching-header-testing',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelect,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon,
    AngularEditorModule,
    NgClass,
    ChoiceContentPipe,
  ],
  templateUrl: './matching-header-testing.component.html',
  styleUrl: './matching-header-testing.component.scss',
})
export class MatchingHeaderTestingComponent
  extends MatchingHeaderEditingComponent
  implements OnInit
{
  answers: Choice[] = [];
  @Output() onAnswer = new EventEmitter();

  ngOnInit(): void {
    const answeredIds = this.data.questions.map((question) => question.answer);
    this.answers = this.data.answers!.filter(
      (answer) => !answeredIds.includes(answer.id),
    );
    this.initMapEditAnswer();
    if (this.isTesting) {
      this.remapDroppedAnswers();
    }
  }

  remapDroppedAnswers() {
    const answerIds = map(this.data.questions, (question) => question.answer);
    this.answers = sortBy(
      filter(this.answers, (answer) => !answerIds.includes(answer.id)),
    );
  }

  onDragOver(event: DragEvent, questionId: string) {
    event.preventDefault();
    this.addDropOverClass(questionId);
  }

  removeDropOver(event: DragEvent, questionId: string) {
    event.preventDefault();
    this.removeDropOverClass(questionId);
  }

  onDropAnswer(event: DragEvent, question: Question) {
    event.preventDefault();
    const choice = ChoiceContentPipe.prototype.transform(
      event.dataTransfer!.getData(DATA_TRANSFER_KEY),
      this.data.answers!,
    );
    if (choice) {
      this.removeDuplicateChoiceInOthers(choice);
      each(this.data.questions, (dataQuestion) => {
        if (dataQuestion.id === question.id) {
          dataQuestion.answer = choice.id;
        }
      });
      this.answers = filter(this.data.answers, (a) => a.id !== choice.id);
      this.removeDropOverClass(question.id);
      this.remapDroppedAnswers();
      this.onAnswer.emit(question);
    }
  }

  removeDuplicateChoiceInOthers(choice: Choice) {
    each(this.data.questions, (question) => {
      if (question.answer && question.answer === choice.id) {
        question.answer = '';
      }
    });
  }

  onDragStart(event: DragEvent, answerId: string) {
    event.dataTransfer!.dropEffect = 'move';
    event.dataTransfer!.setData(DATA_TRANSFER_KEY, answerId);
    event.dataTransfer!.setDragImage(event.target as HTMLElement, 0, 0);
  }

  onAnswerBackDragOver(event: DragEvent) {
    event.preventDefault();
    this.addDropOverClass(CONTAINER_RIGHT_ID);
  }

  onAnswerBackDragLeave(event: DragEvent) {
    event.preventDefault();
    this.removeDropOverClass(CONTAINER_RIGHT_ID);
  }

  onAnswerBackDrop(event: DragEvent) {
    event.preventDefault();
    const answer = ChoiceContentPipe.prototype.transform(
      event.dataTransfer!.getData(DATA_TRANSFER_KEY),
      this.data.answers!,
    );
    if (answer) {
      each(this.data.questions, (question) => {
        if (question.answer === answer.id) {
          question.answer = '';
          this.onAnswer.emit(question);
        }
      });
      if (!map(this.answers, (answer) => answer.id).includes(answer.id)) {
        this.answers.push(answer);
        this.answers = sortBy(this.answers, ['id']);
      }
      this.removeDropOverClass(CONTAINER_RIGHT_ID);
    }
  }

  addDropOverClass(elementId: string) {
    const dropZone = document.getElementById(elementId) as HTMLElement;
    dropZone.classList.add(DROP_OVER_CLASS);
  }

  removeDropOverClass(elementId: string) {
    const dropZone = document.getElementById(elementId) as HTMLElement;
    dropZone.classList.remove(DROP_OVER_CLASS);
  }
}
