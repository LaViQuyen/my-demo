import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { QuizzesComponent } from '../quizzes/quizzes.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-mock-test',
  standalone: true,
  imports: [MatTabsModule, ResultComponent, QuizzesComponent],
  templateUrl: './mock-test.component.html',
  styleUrl: './mock-test.component.scss',
})
export class MockTestComponent {}
