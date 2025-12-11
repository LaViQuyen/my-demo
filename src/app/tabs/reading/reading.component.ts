import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { each } from 'lodash-es';
import { AbstractQuizPartComponent } from '../../shared/abstract/abstract-quiz-part.component';
import { Choice } from '../../shared/models/choice.model';
import { Reading } from '../../shared/models/reading.model';
import { MatchingHeaderComponent } from '../../modules/question/matching-header/matching-header.component';
import { QuestionComponent } from '../../modules/question/question.component';
import { ReadingService } from './reading.service';
import { TextSelectionDirective } from './text-selection.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    QuestionComponent,
    MatIconModule,
    MatExpansionModule,
    AngularEditorModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatchingHeaderComponent,
    TextSelectionDirective,
    NgClass,
  ],
  providers: [ReadingService],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.scss',
})
export class ReadingComponent
  extends AbstractQuizPartComponent<Reading>
  implements OnInit
{
  @Input() isMatchingHeader = false;
  mapSavedQuestion: Record<string, boolean> = {};
  answers: WritableSignal<Choice[]> = signal([]);
  @Output() onMatchHeaderAnswer = new EventEmitter();

  ngOnInit(): void {
    if (this.data) {
      each(this.data.questions, (question) => {
        this.mapSavedQuestion[question.id] = true;
      });
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['data'] && this.data) {
      this.answers.set(this.data.answers!);
    }
  }

  override onSaveQuestion(id: string): void {
    super.onSaveQuestion(id);
    this.mapSavedQuestion[id] = true;
  }

  override onEditQuestion(id: string): void {
    super.onEditQuestion(id);
    this.mapSavedQuestion[id] = false;
  }
}
