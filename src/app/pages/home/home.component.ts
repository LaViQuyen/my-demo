import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { QuizService } from '../../modules/quizzes/quizzes.service';
import { ReadingService } from '../../tabs/reading/reading.service';
import { FullTestService } from '../full-test/full-test.service';

enum Tab {
  tests,
  results,
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,

  ],
  providers: [QuizService, FullTestService, ReadingService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
