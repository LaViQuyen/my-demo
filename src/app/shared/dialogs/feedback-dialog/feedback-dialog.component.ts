import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    MatError,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.scss',
})
export class FeedbackDialog {
  @Input() rating = 0;
  @Input() content = '';
  @Input() isReadonly = false;
  hoveredStars: number = 0;
  isFeedback = false;
  ratingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FeedbackDialog>,
  ) {
    this.ratingForm = this.formBuilder.group({
      rating: [0, Validators.required],
      feedback: ['', Validators.required],
    });
  }

  get selectedStars() {
    return Math.round(this.rating);
  }

  get stars() {
    return Array(5).fill(0);
  }

  emitRating(rating: number) {
    if (this.isReadonly) {
      return;
    }
    this.isFeedback = true;
    this.rating = rating;
  }

  onSubmit() {
    const feedbackText = this.ratingForm.get('feedback')?.value;
    if (this.ratingForm.valid || this.rating >= 3) {
      this.ratingForm.reset();
      this.hoveredStars = 0;
      const feedback = {
        rating: this.rating,
        content: feedbackText,
      };
      this.dialogRef.close(feedback);
    }
  }
}
