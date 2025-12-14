import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // Dùng Signal để cập nhật giao diện nhanh
  isExamMode = signal(false);
  timerDisplay = signal('');
  studentName = signal('');

  reset() {
    this.isExamMode.set(false);
    this.timerDisplay.set('');
    this.studentName.set('');
  }
}