import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AbstractQuizPartComponent } from '../../shared/abstract/abstract-quiz-part.component';
import { Listening } from '../../shared/models/listening.model';
import { FileService } from '../../file.service';
import { QuestionComponent } from '../../modules/question/question.component';
import { ListeningService } from './listening.service';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { TextSelectionDirective } from "../reading/text-selection.directive";

@Component({
  selector: 'app-listening',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    QuestionComponent,
    MatIconModule,
    AngularEditorModule,
    TextSelectionDirective,
  ],
  providers: [ListeningService, FileService],
  templateUrl: './listening.component.html',
  styleUrl: './listening.component.scss',
})
export class ListeningComponent extends AbstractQuizPartComponent<Listening> {}
