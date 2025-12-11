import { Component, OnInit } from '@angular/core';
import { AbstractQuizPartComponent } from '../../../../shared/abstract/abstract-quiz-part.component';
import { Reading } from '../../../../shared/models/reading.model';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { each } from 'lodash-es';
import { Choice } from '../../../../shared/models/choice.model';
import { ChoiceContentPipe } from '../choice-content.pipe';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-matching-header-readonly',
  standalone: true,
  imports: [
    AngularEditorModule,
    FormsModule,
    MatButton,
    MatIcon,
    MatCard,
    NgClass,
    ChoiceContentPipe,
    TextSelectionDirective,
  ],
  templateUrl: './matching-header-readonly.component.html',
  styleUrl: './matching-header-readonly.component.scss',
})
export class MatchingHeaderReadonlyComponent extends AbstractQuizPartComponent<Reading> {}
