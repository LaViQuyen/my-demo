import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[fitContentInput]',
  standalone: true,
})
export class FitContentDirective implements OnChanges {
  private minWidth = 200;
  @Input() content = '';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing']) {
      this.setInputWidth();
    }
  }

  @HostListener('input')
  onInput(): void {
    this.setInputWidth();
  }

  @HostListener('focus')
  onFocus(): void {
    this.setInputWidth();
  }

  private setInputWidth(): void {
    const inputElement = this.element.nativeElement;
    const width = Math.max(this.minWidth, this.content.length * 8);
    this.renderer.setStyle(inputElement, 'width', `${width}px`);
  }
}
