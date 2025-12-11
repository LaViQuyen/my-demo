import { Pipe, PipeTransform } from '@angular/core';
import { INPUT_PATTERN } from '../utils/constant';

@Pipe({
  name: 'extractId',
  standalone: true,
})
export class ExtractIdPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const match = value.match(INPUT_PATTERN);
    if (match) {
      return match[1];
    }
    return '';
  }
}
