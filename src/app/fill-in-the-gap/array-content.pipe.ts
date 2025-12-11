import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'arrayContent',
})
export class ArrayContentChoice implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value.split('|');
  }
}
