import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AbstractQuestionComponent } from '../../common/abstract-question.component';
import { DropdownChoicesComponent } from '../dropdown-choices/dropdown-choices.component';
import { FillInTheGapComponent } from '../fill-in-the-gap/fill-in-the-gap.component';
import { LabelOnMapComponent } from '../label-on-map/label-on-map.component';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    MatIconModule,
    MultipleChoicesComponent,
    ShortAnswerComponent,
    DropdownChoicesComponent,
    LabelOnMapComponent,
    FillInTheGapComponent,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent extends AbstractQuestionComponent {}
