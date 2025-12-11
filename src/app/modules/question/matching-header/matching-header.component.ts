import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { AbstractQuizPartComponent } from '../../../shared/abstract/abstract-quiz-part.component';
import { Choice } from '../../../shared/models/choice.model';
import { Reading } from '../../../shared/models/reading.model';
import { MultipleQuestionComponent } from '../multiple-question/multiple-question.component';
import { ChoiceContentPipe } from './choice-content.pipe';
import { MatchingHeaderReadonlyComponent } from './matching-header-readonly/matching-header-readonly.component';
import { MatchingHeaderTestingComponent } from './matching-header-testing/matching-header-testing.component';
import { MatchingHeaderEditingComponent } from './matching-header-editing/matching-header-editing.component';

@Component({
  selector: 'app-matching-header',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    AngularEditorModule,
    MultipleQuestionComponent,
    DragDropModule,
    ChoiceContentPipe,
    MatchingHeaderReadonlyComponent,
    MatchingHeaderTestingComponent,
    MatchingHeaderEditingComponent,
  ],
  templateUrl: './matching-header.component.html',
  styleUrl: './matching-header.component.scss',
})
export class MatchingHeaderComponent extends AbstractQuizPartComponent<Reading> {
  @Input() answers: Choice[] = [];
  @Output() onAnswer = new EventEmitter();
  results: string[] = [];
}
