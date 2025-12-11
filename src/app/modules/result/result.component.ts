import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, filter } from 'lodash-es';
import { Result } from '../../shared/models/result.model';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ListeningComponent } from '../../tabs/listening/listening.component';
import { MultipleChoicesComponent } from '../question/multiple-choices/multiple-choices.component';
import { QuizService } from '../quizzes/quizzes.service';
import { ShortAnswerComponent } from '../question/short-answer/short-answer.component';
import { BandScorePipe } from './band-score.pipe';
import { ResultService } from './result.service';
import { InputPasswordDialogComponent } from '../../shared/dialogs/input-password-dialog/input-password-dialog.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    MultipleChoicesComponent,
    ShortAnswerComponent,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ListeningComponent,
    MatMenuModule,
    MatIcon,
    BandScorePipe,
  ],
  providers: [QuizService, ResultService],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  results: Result[] = [];
  searchString: string = '';
  onSearchChange = debounce(() => this.search(), 500);

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.resultService.getAll().subscribe((results) => {
      this.results = results;
    });
  }

  search() {
    this.resultService
      .getByStudentName(this.searchString)
      .subscribe((results) => {
        this.results = results;
      });
  }

  view(id: string) {
    const dialogRef = this.dialog.open(InputPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((isMatch) => {
      if (isMatch) {
        this.router.navigate([`result-detail`, id]);
      }
    });
  }

  continue(id: string) {
    const test = {
      testId: id,
    };
    this.router.navigate(['continue-test', id], { state: test });
  }

  onDeleteResultClick(resultId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.isWarning = true;
    dialogRef.componentInstance.message = 'Confirm to delete this?';
    dialogRef.afterClosed().subscribe((isConfirm: boolean) => {
      if (isConfirm) {
        this.deleteResult(resultId);
      }
    });
  }

  deleteResult(resultId: string) {
    this.resultService.deleteById(resultId).subscribe(() => {
      this.results = filter(this.results, (result) => result.id !== resultId);
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
