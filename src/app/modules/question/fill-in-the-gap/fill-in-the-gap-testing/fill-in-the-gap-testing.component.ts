import { Component, SimpleChanges } from "@angular/core";
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { IsInputPipe } from '../is-input.pipe';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FillInTheGapEditingComponent } from '../fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { toArray } from 'lodash-es';
import { NgClass } from "@angular/common";
import { ExtractIdPipe } from "../../../../pipes/extract-id.pipe";
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-fill-in-the-gap-testing',
  standalone: true,
  imports: [
    AngularEditorModule,
    IsInputPipe,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    ExtractIdPipe,
    TextSelectionDirective,
  ],
  templateUrl: './fill-in-the-gap-testing.component.html',
  styleUrl: './fill-in-the-gap-testing.component.scss',
})
export class FillInTheGapTestingComponent extends FillInTheGapEditingComponent {
  onInputAnswer(answer: string, choiceId: string) {
    this.mapChoiceById[choiceId].answer = answer;
    this.onAnswer.emit({
      ...this.question,
      choices: toArray(this.mapChoiceById),
    });
  }
}
