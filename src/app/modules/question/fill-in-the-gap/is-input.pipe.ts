import { Pipe, PipeTransform } from '@angular/core';
import { isUndefined } from 'lodash-es';

@Pipe({
  standalone: true,
  name: 'isInput',
})
export class IsInputPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (isUndefined(value)) {
      return false;
    }
    const pattern = /<([^>]+)>/;
    return pattern.test(value);
  }
}
