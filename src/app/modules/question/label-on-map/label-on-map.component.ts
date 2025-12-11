import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { each, isEmpty, last } from 'lodash-es';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { Choice } from '../../../shared/models/choice.model';
import { CorrectChoicesPipe } from '../../../pipes/correct-choices.pipe';
import { CommonUtils } from '../../../utils/common-utils';
import { CHOICE_INDEX } from '../../../utils/constant';
import { IsCheckCellPipe } from './is-check-cell.pipe';
import { ShortAnswerEditingComponent } from '../short-answer/short-answer-editing/short-answer-editing.component';
import { ShortAnswerReadonlyComponent } from '../short-answer/short-answer-readonly/short-answer-readonly.component';
import { ShortAnswerTestingComponent } from '../short-answer/short-answer-testing/short-answer-testing.component';
import { LabelOnMapEditingComponent } from './label-on-map-editing/label-on-map-editing.component';
import { LabelOnMapTestingComponent } from './label-on-map-testing/label-on-map-testing.component';
import { LabelOnMapReadonlyComponent } from './label-on-map-readonly/label-on-map-readonly.component';

@Component({
  selector: 'app-label-on-map',
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
    MatTableModule,
    CorrectChoicesPipe,
    IsCheckCellPipe,
    ShortAnswerEditingComponent,
    ShortAnswerReadonlyComponent,
    ShortAnswerTestingComponent,
    LabelOnMapEditingComponent,
    LabelOnMapTestingComponent,
    LabelOnMapReadonlyComponent,
  ],
  templateUrl: './label-on-map.component.html',
  styleUrl: './label-on-map.component.scss',
})
export class LabelOnMapComponent extends AbstractQuestionComponent {}
