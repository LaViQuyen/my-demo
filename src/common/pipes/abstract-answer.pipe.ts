import { PipeTransform } from '@angular/core';

export class AbstractAnswerPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value;
  }
}
