import { Input, Pipe, PipeTransform } from '@angular/core';
import { Choice } from '../shared/models/choice.model';
import { ExtractIdPipe } from "./extract-id.pipe";

@Pipe({
  name: 'choiceMap',
  standalone: true,
})
export class ChoiceMapPipe implements PipeTransform {
  @Input() mapChoiceById: Record<string, Choice> = {};

  transform(content: string, ...args: unknown[]): Choice {
    return this.mapChoiceById[ExtractIdPipe.prototype.transform(content)];
  }
}
