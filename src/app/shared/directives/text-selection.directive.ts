import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[textSelection]',
  standalone: true,
})
export class TextSelectionDirective {
  @Input() appTextSelection: string = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseup') onMouseUp() {
    const selectedText = this.getSelectedText();
    if (selectedText) {
      this.highlightSelection(this.appTextSelection);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the clicked target is a highlighted text (span element)
    if (
      target.tagName === 'SPAN' &&
      target.style.backgroundColor === 'yellow'
    ) {
      const parent = target.parentNode;
      if (parent) {
        // Remove the input field if it exists
        const nextSibling = target.nextSibling;
        if (nextSibling) {
          parent.removeChild(nextSibling);
        }
        // Replace the span with its text content to remove the highlight
        const selectedText = target.textContent;
        if (selectedText) {
          const textNode = document.createTextNode(selectedText);
          parent.replaceChild(textNode, target);
        }
      }
    }
  }

  private getSelectedText(): string {
    const selection = window.getSelection();
    return selection!.toString();
  }

  private highlightSelection(color: string) {
    const selection = window.getSelection();
    if (selection !== null && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.backgroundColor = color;
      span.className = 'highlighted';
      const input = document.createElement('input');
      const button = document.createElement('div');
      button.textContent = '❌';
      range.surroundContents(span);
      range.collapse(false);
      range.insertNode(input);
      selection.removeAllRanges(); // Clear selection
    }
  }
}
