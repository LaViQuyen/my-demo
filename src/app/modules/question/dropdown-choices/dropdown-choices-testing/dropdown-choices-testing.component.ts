import { Component } from '@angular/core';
import { DropdownChoicesEditingComponent } from '../dropdown-choices-editing/dropdown-choices-editing.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { isEmpty } from 'lodash-es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextSelectionDirective } from "../../../../tabs/reading/text-selection.directive";

@Component({
  selector: 'app-dropdown-choices-testing',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    TextSelectionDirective,
  ],
  templateUrl: './dropdown-choices-testing.component.html',
  styleUrl: './dropdown-choices-testing.component.scss',
})
export class DropdownChoicesTestingComponent extends DropdownChoicesEditingComponent {
  override ngOnInit() {
    super.ngOnInit();
    if (!isEmpty(this.question.answer)) {
      this.selectedChoice = this.question.answer[0];
    }
  }

  onChangeAnswer(answer: string) {
    this.question.answer = answer;
    this.onAnswer.emit(this.question);
  }

  onSelectChoice() {
    this.selectedQuestionIndex.set(null);
    this.selectedId.set(this.question.id);
  }
}
