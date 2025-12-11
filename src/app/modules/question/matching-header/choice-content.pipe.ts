import { Pipe, PipeTransform } from '@angular/core';
import { find, isEmpty } from 'lodash-es';
import { Choice } from '../../../shared/models/choice.model';

@Pipe({
  name: 'choiceContent',
  standalone: true,
})
export class ChoiceContentPipe implements PipeTransform {
  transform(answer: string | string[], answers: Choice[]): Choice | undefined {
    return find(answers, (item) => !isEmpty(answer) && item.id === answer);
  }
}
