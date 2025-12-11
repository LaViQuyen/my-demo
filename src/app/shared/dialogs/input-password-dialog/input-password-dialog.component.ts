import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-input-password-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './input-password-dialog.component.html',
  styleUrl: './input-password-dialog.component.scss',
})
export class InputPasswordDialogComponent {
  isWrongPassword = false;
  formGroup!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<InputPasswordDialogComponent>);
  readonly formBuilder = inject(FormBuilder);
  constructor() {
    this.formGroup = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isWrongPassword =
        environment.password !== this.formGroup.get('password')?.value;
      if (!this.isWrongPassword) {
        this.dialogRef.close(true);
      }
    }
  }
}
