import { Component } from '@angular/core';
import { FillInTheTableEditingComponent } from '../../fill-in-the-table/fill-in-the-table-editing/fill-in-the-table-editing.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { isUndefined, toArray } from 'lodash-es';
import { CommonUtils } from '../../../../utils/common-utils';
import { Choice } from '../../../../shared/models/choice.model';

@Component({
  selector: 'app-drag-in-table-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    ExtractIdPipe,
    IsInputPipe,
    KeyValuePipe,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatButton,
  ],
  templateUrl: './drag-in-table-editing.component.html',
  styleUrl: './drag-in-table-editing.component.scss',
})
export class DragInTableEditingComponent extends FillInTheTableEditingComponent {
  mapEditingById: Record<string, boolean> = {};

  addAnswer() {
    if (isUndefined(this.question.answers)) {
      this.question.answers = [];
    }
    const id = CommonUtils.generateRandomId();
    const newAnswer: Choice = {
      id: id,
      content: '',
      correctAnswer: '',
    };
    this.question.answers?.push(newAnswer);
    this.mapEditingById[id] = true;
  }

  deleteAnswer(index: number) {
    this.question.answers?.splice(index, 1);
  }

  updateQuestionChoices() {
    this.question.choices = toArray(this.mapChoiceById);
  }
}
