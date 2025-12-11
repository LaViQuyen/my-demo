import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { FillInTheGapEditingComponent } from './fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { FillInTheGapTestingComponent } from './fill-in-the-gap-testing/fill-in-the-gap-testing.component';
import { FillInTheGapReadonlyComponent } from './fill-in-the-gap-readonly/fill-in-the-gap-readonly.component';

@Component({
  selector: 'app-fill-in-the-gap',
  standalone: true,
  imports: [
    MatIconModule,
    FillInTheGapEditingComponent,
    FillInTheGapTestingComponent,
    FillInTheGapReadonlyComponent,
  ],
  templateUrl: './fill-in-the-gap.component.html',
  styleUrl: './fill-in-the-gap.component.scss',
})
export class FillInTheGapComponent extends AbstractQuestionComponent {
  protected readonly console = console;
}
