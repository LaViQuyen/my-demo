import { AsyncPipe } from '@angular/common';
import { Component, inject, Inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../../models/folder.model';
import { FolderService } from '../../../modules/folder/folder.service';

@Component({
  selector: 'app-move-to-folder-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    AsyncPipe,
  ],
  providers: [FolderService],
  templateUrl: './move-to-folder-dialog.component.html',
  styleUrl: './move-to-folder-dialog.component.scss',
})
export class MoveToFolderDialogComponent {
  @Input() folderId = '';
  folders!: Folder[];
  folderForm!: FormGroup;
  rootFolder: Folder = {
    id: '',
    name: '',
  };

  folderService = inject(FolderService);
  route = inject(ActivatedRoute);
  constructor(
    public dialogRef: MatDialogRef<MoveToFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { folders: Folder[] },
    private formBuilder: FormBuilder,
  ) {
    this.folderForm = this.formBuilder.group({
      selectedFolder: [null, Validators.required],
    });
    this.folderService.getFolders().subscribe((folders) => {
      this.folders = folders.filter((folder) => folder.id !== this.folderId);
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.folderForm.get('selectedFolder')?.value);
  }

  onClose() {
    this.dialogRef.close();
  }
}
