import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { QuizService } from '../quizzes/quizzes.service';
import { ReadingService } from '../reading/reading.service';
import { TestService } from '../test/test.service';

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
  providers: [QuizService, TestService, ReadingService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
