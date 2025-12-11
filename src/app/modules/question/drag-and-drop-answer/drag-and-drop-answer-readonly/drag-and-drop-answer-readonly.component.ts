import { Component } from '@angular/core';
import { CorrectAnswerPipe } from '../../../../pipes/correct-answer.pipe';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { FillInTheGapReadonlyComponent } from '../../fill-in-the-gap/fill-in-the-gap-readonly/fill-in-the-gap-readonly.component';
import { JsonPipe, NgClass } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { Choice } from '../../../../shared/models/choice.model';
import { each } from 'lodash-es';
import { ChoiceContentPipe } from "../../matching-header/choice-content.pipe";

@Component({
  selector: 'app-drag-and-drop-answer-readonly',
  standalone: true,
  imports: [
    CorrectAnswerPipe,
    IsInputPipe,
    NgClass,
    MatCard,
    ExtractIdPipe,
    JsonPipe,
    ChoiceContentPipe,
  ],
  templateUrl: './drag-and-drop-answer-readonly.component.html',
  styleUrl: './drag-and-drop-answer-readonly.component.scss',
})
export class DragAndDropAnswerReadonlyComponent extends FillInTheGapReadonlyComponent {
  mapAnswerById: Record<string, Choice> = {};

  override ngOnInit() {
    super.ngOnInit();
    each(this.question.answers, (answer) => {
      this.mapAnswerById[answer.id] = answer;
    });
  }
}
