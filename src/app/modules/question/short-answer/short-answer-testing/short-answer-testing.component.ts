import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { isEmpty } from 'lodash-es';

@Component({
  selector: 'app-short-answer-testing',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MatButton, MatIcon, NgIf],
  templateUrl: './short-answer-testing.component.html',
  styleUrl: './short-answer-testing.component.scss',
})
export class ShortAnswerTestingComponent extends AbstractQuestionComponent {}
