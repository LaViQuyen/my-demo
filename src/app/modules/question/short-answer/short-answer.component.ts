import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { FileService } from '../../../file.service';
import { CorrectAnswerPipe } from '../../../pipes/correct-answer.pipe';
import { ShortAnswerReadonlyComponent } from './short-answer-readonly/short-answer-readonly.component';
import { ShortAnswerTestingComponent } from './short-answer-testing/short-answer-testing.component';
import { ShortAnswerEditingComponent } from './short-answer-editing/short-answer-editing.component';

@Component({
  selector: 'app-short-answer',
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
    CorrectAnswerPipe,
    ShortAnswerReadonlyComponent,
    ShortAnswerTestingComponent,
    ShortAnswerEditingComponent,
  ],
  providers: [FileService],
  templateUrl: './short-answer.component.html',
  styleUrl: './short-answer.component.scss',
})
export class ShortAnswerComponent extends AbstractQuestionComponent {
  @Input() hasIndex: boolean = true;
}
