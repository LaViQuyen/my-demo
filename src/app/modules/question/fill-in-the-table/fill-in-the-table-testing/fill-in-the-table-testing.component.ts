import { Component } from '@angular/core';
import { FillInTheGapEditingComponent } from '../../fill-in-the-gap/fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FillInTheTableEditingComponent } from '../fill-in-the-table-editing/fill-in-the-table-editing.component';
import { toArray } from 'lodash-es';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-fill-in-the-table-testing',
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
    TextSelectionDirective,
  ],
  templateUrl: './fill-in-the-table-testing.component.html',
  styleUrl: './fill-in-the-table-testing.component.scss',
})
export class FillInTheTableTestingComponent extends FillInTheTableEditingComponent {
  onInputAnswer(answer: string, choiceId: string) {
    this.mapChoiceById[choiceId].answer = answer;
    this.onAnswer.emit({
      ...this.question,
      choices: toArray(this.mapChoiceById),
    });
  }
}
