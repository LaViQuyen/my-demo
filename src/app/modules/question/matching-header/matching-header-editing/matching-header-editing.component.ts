import { Component, SimpleChanges } from '@angular/core';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AbstractQuizPartComponent } from '../../../../shared/abstract/abstract-quiz-part.component';
import { Reading } from '../../../../shared/models/reading.model';
import { MatIcon } from '@angular/material/icon';
import { CommonUtils } from '../../../../utils/common-utils';
import { Question } from '../../../../shared/models/question.model';
import { QuestionType } from '../../../../shared/enums/question-type.enum';
import { each, isUndefined, mapValues, omit } from 'lodash-es';
import { Choice } from '../../../../shared/models/choice.model';
import { JsonPipe, NgClass } from "@angular/common";

@Component({
  selector: 'app-matching-header-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    FormsModule,
    MatButton,
    MatCardModule,
    MatIcon,
    NgClass,
    JsonPipe,
  ],
  templateUrl: './matching-header-editing.component.html',
  styleUrl: './matching-header-editing.component.scss',
})
export class MatchingHeaderEditingComponent extends AbstractQuizPartComponent<Reading> {
  mapEditingById: Record<string, boolean> = {};
  mapAnswerById: Record<string, Choice> = {};

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
}
