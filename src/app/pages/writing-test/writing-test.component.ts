import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { cloneDeep, debounce, filter } from 'lodash-es';
import { Subscription } from 'rxjs';
import { Writing } from '../../shared/models/writing.model';
import { CommonUtils } from '../../utils/common-utils';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { WritingService } from './writing-test.service';

@Component({
  selector: 'app-writing-test',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
  ],
  providers: [WritingService],
  templateUrl: './writing-test.component.html',
  styleUrl: './writing-test.component.scss',
})
export class WritingTestComponent implements OnDestroy {
  writings: Writing[] = [];
  writingResults: Writing[] = [];
  searchString: string = '';

  subscriptions: Subscription[] = [];

  onSearch = debounce(() => this.search(), 500);
  onSearchResult = debounce(($event) => this.searchResult($event), 500);

  constructor(
    private writingService: WritingService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.writingService.getAll().subscribe((writings) => {
      this.writings = writings;
    });

    this.writingService.getAllResults().subscribe((results) => {
      this.writingResults = results;
    });
  }

  search() {
    this.writingService
      .searchByName(this.searchString)
      .subscribe((writings) => {
        this.writings = writings;
      });
  }

  searchResult(studentName: string) {
    this.writingService
      .searchResultByStudentName(studentName)
      .subscribe((results) => {
        this.writingResults = results;
      });
  }

  test(id: string) {
    this.router.navigate(['/test-writing', id], {
      state: { isTesting: true },
    });
  }

  addNewQuiz() {
    this.router.navigate(['add-writing'], { state: { isEditing: true } });
  }

  view(id: string) {
    this.router.navigate(['result-writing', id], {
      state: { isReadOnly: true },
    });
  }

  continue(resultId: string) {
    this.router.navigate(['continue-test-writing', resultId], {
      state: { isTesting: true, resultId: resultId },
    });
  }

  edit(id: string) {
    this.router.navigate(['edit-writing', id], { state: { isEditing: true } });
  }

  duplicate(writing: Writing) {
    let cloneQuiz = cloneDeep(writing);
    cloneQuiz = {
      ...cloneQuiz,
      id: CommonUtils.generateRandomId(),
    };
    this.writingService.create(cloneQuiz).subscribe(() => {
      this.writings.push(cloneQuiz);
    });
  }

  onDeleteClick(quiz: Writing) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
    });

    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.message = 'Confirm to delete this?';
    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.deleteQuiz(quiz);
      }
    });
  }

  onDeleteResult(result: Writing) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
    });

    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.message = 'Confirm to delete this?';
    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.writingService.deleteResult(result.id).subscribe(() => {
          this.writingResults = filter(
            this.writingResults,
            (r) => result.id !== r.id,
          );
        });
      }
    });
  }

  deleteQuiz(writing: Writing) {
    this.writingService.delete(writing.id).subscribe(() => {
      this.writings = filter(this.writings, (item) => writing.id !== item.id);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
