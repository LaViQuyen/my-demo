import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractPart } from '../../models/abstract-part.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './part-navigation.component.html',
  styleUrl: './part-navigation.component.scss',
})
export class PartNavigationComponent {
  @Input() selectedPart = 0; // Mặc định bắt đầu từ 0
  @Output() selectedPartChange = new EventEmitter<number>();
  @Input() parts: AbstractPart[] = [];
  @Output() onPartChange = new EventEmitter<number>();

  onPartClick(index: number) {
    this.selectedPart = index;
    // Gửi sự kiện để TestComponent cập nhật dữ liệu
    this.selectedPartChange.emit(this.selectedPart);
    this.onPartChange.emit(index); 
    this.scrollToTop();
  }

  scrollToTop() {
    window.scroll({ top: 0, behavior: 'instant' });
  }
}