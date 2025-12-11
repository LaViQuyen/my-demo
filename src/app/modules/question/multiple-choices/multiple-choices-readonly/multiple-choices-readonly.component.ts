import { Component } from '@angular/core';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MultipleChoicesTestingComponent } from '../multiple-choices-testing/multiple-choices-testing.component';
import { CorrectChoicesPipe } from '../../../../pipes/correct-choices.pipe';

@Component({
  selector: 'app-multiple-choices-readonly',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MatIcon, CorrectChoicesPipe],
  templateUrl: './multiple-choices-readonly.component.html',
  styleUrl: './multiple-choices-readonly.component.scss',
})
export class MultipleChoicesReadonlyComponent extends MultipleChoicesTestingComponent {
  override ngOnInit() {
    super.ngOnInit();
    if (this.isReadOnly) {
      this.selectedOption = this.question.answer[0];
    } else {
      this.selectedOption = this.question.correctAnswer[0];
    }
  }
}
