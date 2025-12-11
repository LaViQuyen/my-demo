import { Component } from '@angular/core';
import { DragInTableEditingComponent } from '../drag-in-table-editing/drag-in-table-editing.component';
import { KeyValuePipe, NgClass } from '@angular/common';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { CorrectAnswerPipe } from '../../../../pipes/correct-answer.pipe';
import { Choice } from '../../../../shared/models/choice.model';
import { each } from 'lodash-es';

@Component({
  selector: 'app-drag-in-table-readonly',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgClass,
    IsInputPipe,
    ExtractIdPipe,
    CorrectAnswerPipe,
  ],
  templateUrl: './drag-in-table-readonly.component.html',
  styleUrl: './drag-in-table-readonly.component.scss',
})
export class DragInTableReadonlyComponent extends DragInTableEditingComponent {
  mapAnswerById: Record<string, Choice> = {};

  override ngOnInit() {
    super.ngOnInit();
    each(this.question.answers, (answer) => {
      this.mapAnswerById[answer.id] = answer;
    });
  }
}
