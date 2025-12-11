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
  @Input() selectedPart = 1;
  @Output() selectedPartChange = new EventEmitter();
  @Input() parts: AbstractPart[] = [];
  @Output() onPartChange = new EventEmitter();

  onPartClick(index: number) {
    this.selectedPart = index;
    this.selectedPartChange.emit(this.selectedPart);
    this.scrollToTop();
  }

  scrollToTop() {
    window.scroll({ top: 0, behavior: 'instant' });
  }
}
