import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { CorrectAnswerChoicePipe } from '../../../pipes/correct-answer-choice.pipe';
import { CorrectDropdownPipe } from '../../../pipes/correct-dropdown.pipe';
import { AnswerChoicePipe } from '../../../pipes/answer-choice.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { DropdownChoicesEditingComponent } from "./dropdown-choices-editing/dropdown-choices-editing.component";
import { DropdownChoicesTestingComponent } from "./dropdown-choices-testing/dropdown-choices-testing.component";
import { DropdownChoicesReadonlyComponent } from "./dropdown-choices-readonly/dropdown-choices-readonly.component";

@Component({
  selector: 'app-dropdown-choices',
  standalone: true,
  imports: [
    MatIconModule,
    DropdownChoicesEditingComponent,
    DropdownChoicesTestingComponent,
    DropdownChoicesReadonlyComponent,
  ],
  templateUrl: './dropdown-choices.component.html',
  styleUrl: './dropdown-choices.component.scss',
})
export class DropdownChoicesComponent extends AbstractQuestionComponent {
}
