import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Folder } from '../../models/folder.model';

@Component({
  selector: 'app-add-or-edit-folder',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-or-edit-folder-dialog.component.html',
  styleUrl: './add-or-edit-folder-dialog.component.scss',
})
export class AddOrEditFolderDialog implements OnInit {
  @Input() folder!: Folder;
  nameControl = new FormControl('', [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<AddOrEditFolderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.folder) {
      this.nameControl.setValue(this.folder.name);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({
      id: this.folder ? this.folder.id : undefined,
      name: this.nameControl.value,
    });
  }
}
