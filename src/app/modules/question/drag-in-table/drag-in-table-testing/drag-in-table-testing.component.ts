import { Component } from '@angular/core';
import { FillInTheTableEditingComponent } from '../../fill-in-the-table/fill-in-the-table-editing/fill-in-the-table-editing.component';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toArray } from 'lodash-es';
import { MatCard } from '@angular/material/card';
import { DragAndDropAnswerTestingComponent } from '../../drag-and-drop-answer/drag-and-drop-answer-testing/drag-and-drop-answer-testing.component';
import { Choice } from '../../../../shared/models/choice.model';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-drag-in-table-testing',
  standalone: true,
  imports: [
    ExtractIdPipe,
    IsInputPipe,
    KeyValuePipe,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    MatCard,
    TextSelectionDirective,
  ],
  templateUrl: './drag-in-table-testing.component.html',
  styleUrl: './drag-in-table-testing.component.scss',
})
export class DragInTableTestingComponent extends DragAndDropAnswerTestingComponent {
  headerColSpan = 1;
}
