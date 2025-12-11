import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep, debounce, isEmpty, isUndefined } from 'lodash-es';
import { Subscription } from 'rxjs';
import { Folder } from '../../shared/models/folder.model';
import { Quiz } from '../../shared/models/quiz.model';
import { SelectedPipe } from '../../pipes/selected.pipe';
import { CommonUtils } from '../../utils/common-utils';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { FileService } from '../../file.service';
import { FolderComponent } from '../folder/folder.component';
import { FolderService } from '../folder/folder.service';
import { ListeningComponent } from '../../tabs/listening/listening.component';
import { AddOrEditFolderDialog } from '../../shared/dialogs/add-or-edit-folder-dialog/add-or-edit-folder-dialog.component';
import { MoveToFolderDialogComponent } from '../../shared/dialogs/move-to-folder-dialog/move-to-folder-dialog.component';
import { QuizService } from './quizzes.service';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ListeningComponent,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    FolderComponent,
    SelectedPipe,
    CdkDropList,
    CdkDrag,
  ],
  providers: [QuizService, FileService, FolderService],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
})
export class QuizzesComponent implements OnDestroy {
  folderId = '';
  quizzes: Quiz[] = [];
  folders: Folder[] = [];
  searchString: string = '';
  selectedQuizzes: WritableSignal<Quiz[]> = signal([]);
  isEmptySelectedQuiz = computed(() => {
    return this.selectedQuizzes().length === 0;
  });

  onSearch = debounce(() => this.search(), 500);

  subscription: Subscription[] = [];
  isMultipleSelection = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private folderService: FolderService,
  ) {
    this.folderId = this.route.snapshot.params['folderId'];
    if (!isEmpty(this.folderId)) {
      this.quizService
        .getAllQuizzesByFolderId(this.folderId)
        .subscribe((quizzes) => {
          this.quizzes = quizzes;
        });
    } else {
      this.folderService.getFolders().subscribe((folders) => {
        this.folders = folders;
      });
      this.quizService.getAll().subscribe((quizzes) => {
        this.quizzes = quizzes
          .filter(
            (quiz: Quiz) =>
              isEmpty(quiz.folderId) || isUndefined(quiz.folderId),
          )
          .sort((a: Quiz, b: Quiz) => a.order! - b.order!);
      });
    }
  }

  drop(event: CdkDragDrop<Quiz[]>) {
    moveItemInArray(this.quizzes, event.previousIndex, event.currentIndex);
    setTimeout(() => {
      this.quizService
        .updateIndex(this.quizzes.map((quiz) => quiz.id))
        .subscribe();
    }, 500);
  }

  search() {
    this.quizService.searchByName(this.searchString).subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  test(id: string) {
    const newResult = {
      id: CommonUtils.generateRandomId(),
      quizId: id,
    };
    this.router.navigate(['/test', newResult.id], { state: newResult });
  }

  addNewQuiz() {
    this.router.navigate(['add-quiz']);
  }

  onAddFolderClick() {
    const dialogRef = this.dialog.open(AddOrEditFolderDialog, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((folder) => {
      this.saveOrUpdateFolder(folder);
    });
  }

  onClickMultipleChoice() {
    this.isMultipleSelection = true;
  }

  onCancelMultipleChoice() {
    this.isMultipleSelection = false;
  }

  onSelectQuiz(isSelect: boolean, selectedQuiz: Quiz) {
    if (isSelect) {
      this.selectedQuizzes.update((quizzes) => [...quizzes, selectedQuiz]);
    } else {
      this.selectedQuizzes.update((quizzes) =>
        quizzes.filter((quiz) => quiz.id !== selectedQuiz.id),
      );
    }
  }

  saveOrUpdateFolder(folder: Folder) {
    if (folder.id) {
      this.folderService.updateFolder(folder.id, folder).subscribe((folder) => {
        this.folders = this.folders.map((f) =>
          f.id === folder.id ? folder : f,
        );
      });
    } else {
      folder = { ...folder, id: CommonUtils.generateRandomId() };
      this.folderService.createFolder(folder).subscribe((res: any) => {
        this.folders = [...this.folders, res];
      });
    }
  }

  onDuplicateFolder() {}

  onDeleteFolder(deletedFolder: Folder) {
    this.folders = this.folders.filter(
      (folder) => folder.id !== deletedFolder.id,
    );
  }

  edit(id: string) {
    this.router.navigate(['edit-quiz', id]);
  }

  onMoveQuizClick(quizzes: Quiz[]) {
    const dialogRef = this.dialog.open(MoveToFolderDialogComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.folderId = this.folderId;

    dialogRef.afterClosed().subscribe((folder: Folder) => {
      if (!isUndefined(folder)) {
        this.moveQuizToFolder(
          quizzes.map((quiz) => quiz.id),
          folder.id ?? '',
        );
      }
    });
  }

  moveQuizToFolder(movedQuizzes: string[], folderId: string | undefined) {
    this.isMultipleSelection = false;
    this.selectedQuizzes.set([]);
    this.quizService
      .moveToFolder(movedQuizzes, folderId)
      .subscribe((quizzes) => {
        this.quizzes = this.quizzes.filter(
          (quiz) => !quizzes.map((q) => q.id).includes(quiz.id),
        );
      });
  }

  duplicate(quiz: Quiz) {
    let cloneQuiz = cloneDeep(quiz);
    cloneQuiz = {
      ...cloneQuiz,
      id: CommonUtils.generateRandomId(),
      name: `Copy of ${cloneQuiz.name}`,
    };
    this.quizService.create(cloneQuiz).subscribe(() => {
      this.quizzes.push(cloneQuiz);
    });
  }

  onDeleteClick(quiz: Quiz) {
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

  deleteQuiz(deleteQuiz: Quiz) {
    this.quizService.delete(deleteQuiz.id).subscribe(() => {
      this.quizzes = this.quizzes.filter((quiz) => quiz.id !== deleteQuiz.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
