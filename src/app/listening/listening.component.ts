import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { AbstractQuizPartComponent } from '../../common/abstract-quiz-part.component';
import { Listening } from '../../common/models/listening.model';
import { FileService } from '../file.service';
import { QuestionComponent } from '../question/question.component';
import { ListeningService } from './listening.service';
import { TextSelectionDirective } from "../shared/directives/text-selection.directive";

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
    TextSelectionDirective,
  ],
  providers: [ListeningService, FileService],
  templateUrl: './listening.component.html',
  styleUrl: './listening.component.scss',
})
export class ListeningComponent extends AbstractQuizPartComponent<Listening> {
  isDisableStartButton = false;

  subscription: Subscription[] = [];
}
