import { Component } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { isEmpty } from 'lodash-es';

@Component({
  selector: 'app-dropdown-choices-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    MatButton,
    MatExpansionModule,
    FormsModule,
    MatIcon,
  ],
  templateUrl: './dropdown-choices-editing.component.html',
  styleUrl: './dropdown-choices-editing.component.scss',
})
export class DropdownChoicesEditingComponent extends AbstractQuestionComponent {
  selectedChoice: string | null = null;

  override ngOnInit() {
    super.ngOnInit();
    if (!isEmpty(this.question.correctAnswer)) {
      this.selectedChoice = this.question.correctAnswer[0];
    }
  }

  onSelectCorrectAnswer(choiceId: string) {
    if (this.question.correctAnswer.includes(choiceId)) {
      this.question.correctAnswer = [];
      this.selectedChoice = null;
    } else {
      this.question.correctAnswer = [choiceId];
      this.selectedChoice = choiceId;
    }
  }
}
