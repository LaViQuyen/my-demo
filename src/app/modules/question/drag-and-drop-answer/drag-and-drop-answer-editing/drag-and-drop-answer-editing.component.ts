import { Component } from '@angular/core';
import { Choice } from '../../../../shared/models/choice.model';
import { FillInTheGapEditingComponent } from '../../fill-in-the-gap/fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isUndefined } from 'lodash-es';
import { CommonUtils } from '../../../../utils/common-utils';
import { ExtractIdPipe } from "../../../../pipes/extract-id.pipe";

@Component({
  selector: 'app-drag-and-drop-answer-editing',
  standalone: true,
  imports: [
    FormsModule,
    AngularEditorModule,
    AngularEditorModule,
    IsInputPipe,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    ExtractIdPipe,
  ],
  templateUrl: './drag-and-drop-answer-editing.component.html',
  styleUrl: './drag-and-drop-answer-editing.component.scss',
})
export class DragAndDropAnswerEditingComponent extends FillInTheGapEditingComponent {
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
}
