import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import {
  each,
  filter,
  isUndefined,
  map,
  mapValues,
  omit,
  sortBy,
} from 'lodash-es';
import { AbstractQuizPartComponent } from '../../common/abstract-quiz-part.component';
import { QuestionType } from '../../common/enums/question-type.enum';
import { Choice } from '../../common/models/choice.model';
import { Question } from '../../common/models/question.model';
import { Reading } from '../../common/models/reading.model';
import { CommonUtils } from '../../utils/common-utils';
import { MultipleQuestionComponent } from '../multiple-question/multiple-question.component';
import { ChoiceContentPipe } from './choice-content.pipe';

const DATA_TRANSFER_KEY = 'answerId';
const DROP_OVER_CLASS = 'drop-over';
const CONTAINER_RIGHT_ID = 'container-right';

@Component({
  selector: 'app-matching-header',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    AngularEditorModule,
    MultipleQuestionComponent,
    DragDropModule,
    ChoiceContentPipe,
  ],
  templateUrl: './matching-header.component.html',
  styleUrl: './matching-header.component.scss',
})
export class MatchingHeaderComponent
  extends AbstractQuizPartComponent<Reading>
  implements OnInit
{
  @Input() answers: Choice[] = [];
  mapEditingById: Record<string, boolean> = {};
  mapAnswerById: Record<string, Choice> = {};

  ngOnInit(): void {
    this.initMapEditAnswer();
    if (this.isTesting) {
      this.remapDroppedAnswers();
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['data']?.currentValue) {
      this.initMapEditAnswer();
    }

    if (changes['isSaved']?.currentValue) {
      this.saveAllEditing();
    }
  }

  initMapEditAnswer() {
    each(this.data.answers, (answer) => {
      this.mapEditingById[answer.id] = false;
      this.mapAnswerById[answer.id] = answer;
    });
    each(this.data.questions, (question) => {
      this.mapEditingById[question.id] = false;
    });
  }

  remapDroppedAnswers() {
    const answerIds = map(this.data.questions, (question) => question.answer);
    this.answers = sortBy(
      filter(this.answers, (answer) => !answerIds.includes(answer.id)),
    );
  }

  removeDuplicateChoiceInOthers(choice: Choice) {
    each(this.data.questions, (question) => {
      if (question.answer && question.answer === choice.id) {
        question.answer = '';
      }
    });
  }

  addParagraph() {
    const id = CommonUtils.generateRandomId();
    const newQuestion: Question = {
      id: id,
      content: '',
      type: QuestionType.MATCHING_HEADER,
      choices: [],
      answer: [],
      correctAnswer: [],
    };
    this.data.questions.push(newQuestion);
    this.mapEditingById[id] = true;
  }

  editContent(id: string) {
    if (!this.mapEditingById[id]) {
      this.saveAllEditing();
    }
    this.mapEditingById[id] = !this.mapEditingById[id];
  }

  removeParagraph(index: number) {
    this.removeMapEditingId(this.data.questions[index].id);
    this.data.questions.splice(index, 1);
  }

  addAnswer() {
    if (isUndefined(this.data.answers)) {
      this.data.answers = [];
    }
    const id = CommonUtils.generateRandomId();
    const newAnswer: Choice = {
      id: id,
      content: '',
    };
    this.data.answers?.push(newAnswer);
    this.mapEditingById[id] = true;
  }

  removeAnswer(index: number) {
    this.removeMapEditingId(this.data.answers![index].id);
    this.data.answers?.splice(index, 1);
  }

  private removeMapEditingId(id: string) {
    this.mapEditingById = omit(this.mapEditingById, id);
  }

  private saveAllEditing() {
    this.mapEditingById = mapValues(this.mapEditingById, () => false);
  }

  onDragStart(event: DragEvent, answerId: string) {
    event.dataTransfer!.dropEffect = 'move';
    event.dataTransfer!.setData(DATA_TRANSFER_KEY, answerId);
    event.dataTransfer!.setDragImage(event.target as HTMLElement, 0, 0);
  }

  results: string[] = [];

  onDragOver(event: DragEvent, questionId: string) {
    event.preventDefault();
    this.addDropOverClass(questionId);
  }

  removeDropOver(event: DragEvent, questionId: string) {
    event.preventDefault();
    this.removeDropOverClass(questionId);
  }

  onDropAnswer(event: DragEvent, questionId: string) {
    event.preventDefault();
    const choice = ChoiceContentPipe.prototype.transform(
      event.dataTransfer!.getData(DATA_TRANSFER_KEY),
      this.data.answers!,
    );
    if (choice) {
      this.removeDuplicateChoiceInOthers(choice);
      each(this.data.questions, (question) => {
        if (question.id === questionId) {
          question.answer = choice.id;
        }
      });

      this.answers = filter(this.data.answers, (a) => a.id !== choice.id);
      this.removeDropOverClass(questionId);
      this.remapDroppedAnswers();
    }
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
