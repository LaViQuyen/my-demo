import { Component } from '@angular/core';
import { FillInTheGapEditingComponent } from '../../fill-in-the-gap/fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { CorrectAnswerPipe } from '../../../../pipes/correct-answer.pipe';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { KeyValuePipe, NgClass } from '@angular/common';
import { FillInTheTableEditingComponent } from '../fill-in-the-table-editing/fill-in-the-table-editing.component';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-fill-in-the-table-readonly',
  standalone: true,
  imports: [
    CorrectAnswerPipe,
    ExtractIdPipe,
    IsInputPipe,
    NgClass,
    KeyValuePipe,
    FormsModule,
  ],
  templateUrl: './fill-in-the-table-readonly.component.html',
  styleUrl: './fill-in-the-table-readonly.component.scss',
})
export class FillInTheTableReadonlyComponent extends FillInTheTableEditingComponent {}
