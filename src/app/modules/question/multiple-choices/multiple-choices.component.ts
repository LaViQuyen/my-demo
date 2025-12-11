import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { FileService } from '../../../file.service';
import { CorrectChoicesPipe } from '../../../pipes/correct-choices.pipe';
import { MatRadioGroup } from '@angular/material/radio';
import { MultipleChoicesEditingComponent } from './multiple-choices-editing/multiple-choices-editing.component';
import { MultipleChoicesTestingComponent } from './multiple-choices-testing/multiple-choices-testing.component';
import { MultipleChoicesReadonlyComponent } from './multiple-choices-readonly/multiple-choices-readonly.component';

@Component({
  selector: 'app-multiple-choices',
  standalone: true,
  imports: [
    MatIconModule,
    MultipleChoicesEditingComponent,
    MultipleChoicesTestingComponent,
    MultipleChoicesReadonlyComponent,
  ],
  providers: [FileService],
  templateUrl: './multiple-choices.component.html',
  styleUrl: './multiple-choices.component.scss',
})
export class MultipleChoicesComponent extends AbstractQuestionComponent {}
