import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractPart } from '../../common/models/abstract-part.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './part-navigation.component.html',
  styleUrl: './part-navigation.component.scss',
})
export class PartNavigationComponent {
  @Input() selectedPart = 0; // Đổi từ 1 về 0 để đồng bộ với mảng (0-indexed)
  @Output() selectedPartChange = new EventEmitter<number>();
  @Input() parts: AbstractPart[] = [];
  @Output() onPartChange = new EventEmitter<number>();

  onPartClick(index: number) {
    this.selectedPart = index;
    // Cập nhật Two-way binding
    this.selectedPartChange.emit(this.selectedPart);
    // BÁO CHO PARENT (TestComponent) CẬP NHẬT DỮ LIỆU
    this.onPartChange.emit(index); 
    this.scrollToTop();
  }

  scrollToTop() {
    window.scroll({ top: 0, behavior: 'instant' });
  }
}
