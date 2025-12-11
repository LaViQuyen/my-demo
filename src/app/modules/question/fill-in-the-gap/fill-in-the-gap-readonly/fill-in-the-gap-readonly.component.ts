import { Component, Input } from "@angular/core";
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { INPUT_PATTERN } from '../../../../utils/constant';
import { CorrectAnswerPipe } from '../../../../pipes/correct-answer.pipe';
import { MatIcon } from '@angular/material/icon';
import { FillInTheGapEditingComponent } from '../fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { FitContentDirective } from "../fit-content.directive";
import { IsInputPipe } from "../is-input.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { KeyValuePipe, NgClass } from "@angular/common";
import { ExtractIdPipe } from "../../../../pipes/extract-id.pipe";

@Component({
  selector: 'app-fill-in-the-gap-readonly',
  standalone: true,
  imports: [
    CorrectAnswerPipe,
    MatIcon,
    FitContentDirective,
    IsInputPipe,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    ExtractIdPipe,
  ],
  templateUrl: './fill-in-the-gap-readonly.component.html',
  styleUrl: './fill-in-the-gap-readonly.component.scss',
})
export class FillInTheGapReadonlyComponent extends FillInTheGapEditingComponent {}
