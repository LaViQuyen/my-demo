import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Folder } from '../../common/models/folder.model';
import { FolderService } from './folder.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditFolderComponent } from '../quizzes/add-or-edit-folder/add-or-edit-folder.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule, MatButtonModule],
  providers: [FolderService],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
})
export class FolderComponent {
  @Input() folder: Folder = {
    name: '',
  };
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();
  @Output() onDuplicate = new EventEmitter();

  folderService = inject(FolderService);
  router = inject(Router);
  dialog = inject(MatDialog);

  goToFolder(folderId: string) {
    this.router.navigate(['/mock-test', folderId]);
  }

  onDeleteClick(folder: Folder) {
    this.openConfirmDialog()
      .afterClosed()
      .subscribe((isConfirm) => {
        if (isConfirm) {
          this.folderService.deleteFolder(folder.id!).subscribe(() => {
            this.onDelete.emit(folder);
          });
        }
      });
  }

  onEditClick(folder: Folder) {
    const dialogRef = this.dialog.open(AddOrEditFolderComponent);
    dialogRef.componentInstance.folder = folder;
    dialogRef.afterClosed().subscribe((folder) => {
      this.onUpdate.emit(folder);
    });
  }

  onDuplicateClick(folder: Folder) {}

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Warning';
    dialogRef.componentInstance.message = 'Delete this folder?';
    return dialogRef;
  }
}
