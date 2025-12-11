import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { AbstractQuestionComponent } from '../../common/abstract-question.component';
import { FileService } from '../file.service';
import { isArray } from 'lodash-es';
import { CHOICE_INDEX } from '../../utils/constant';
import { CorrectChoicesPipe } from '../../common/pipes/correct-choices.pipe';
import { TextSelectionDirective } from "../shared/directives/text-selection.directive";
@Component({
  selector: 'app-multiple-choices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule,
    MatIconModule,
    MatCardModule,
    CorrectChoicesPipe,
    TextSelectionDirective,
  ],
  providers: [FileService],
  templateUrl: './multiple-choices.component.html',
  styleUrl: './multiple-choices.component.scss',
})
export class MultipleChoicesComponent extends AbstractQuestionComponent {
  selectedAnswer: string = '';
  mapSelectedChoice: Record<number, boolean> = {};

  CHOICE_INDEX: string[] = CHOICE_INDEX;

  onSelectChoice(index: number) {
    if (this.isReadOnly) {
      return;
    }

    this.mapSelectedChoice[index] = !this.mapSelectedChoice[index];

    if (this.isEditing) {
      const id = this.question.choices[index].id;
      if (!this.question.correctAnswer?.includes(id)) {
        this.question.correctAnswer.push(id);
      } else {
        this.question.correctAnswer = this.question.correctAnswer.filter(
          (correctAnswerId) => correctAnswerId !== id,
        );
      }
    }

    if (this.isTesting) {
      if (isArray(this.question.answer)) {
        const id = this.question.choices[index].id;

        if (!this.question.answer?.includes(id)) {
          this.question.answer.push(id);
        } else {
          this.question.answer = this.question.answer.filter(
            (answerId) => answerId !== id,
          );
        }
      }
    }
  }
}
