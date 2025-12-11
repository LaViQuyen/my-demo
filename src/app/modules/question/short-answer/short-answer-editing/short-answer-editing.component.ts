import { Component } from '@angular/core';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';

@Component({
  selector: 'app-short-answer-editing',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MatButton, MatIcon, NgIf],
  templateUrl: './short-answer-editing.component.html',
  styleUrl: './short-answer-editing.component.scss',
})
export class ShortAnswerEditingComponent extends AbstractQuestionComponent {
}
