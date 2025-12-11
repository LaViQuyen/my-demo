import { Component, SimpleChanges } from '@angular/core';
import { AbstractQuestionComponent } from '../../../../shared/abstract/abstract-question.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { IsInputPipe } from '../is-input.pipe';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUtils } from '../../../../utils/common-utils';
import {
  clone,
  each,
  filter,
  isEmpty,
  mapValues,
  omit,
  toArray,
} from 'lodash-es';
import { INPUT_PATTERN } from '../../../../utils/constant';
import { Choice } from '../../../../shared/models/choice.model';
import { MatButton } from '@angular/material/button';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';

@Component({
  selector: 'app-fill-in-the-gap-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    IsInputPipe,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    ExtractIdPipe,
  ],
  templateUrl: './fill-in-the-gap-editing.component.html',
  styleUrl: './fill-in-the-gap-editing.component.scss',
})
export class FillInTheGapEditingComponent extends AbstractQuestionComponent {
  inputPattern = INPUT_PATTERN;
  mapChoiceById: Record<string, Choice> = {};
  mapSaveTextByIndex: Record<number, Record<number, boolean>> = {};
  mapShowActionByIndex: Record<number, Record<number, boolean>> = {};

  override ngOnInit(): void {
    super.ngOnInit();
    this.initMapSaveText();
    this.initChoiceContent();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (!changes['isEditing']?.currentValue) {
      this.saveAllEditing();
    }
  }

  initMapSaveText() {
    each(this.question.arrayContent, (line, lineIndex) => {
      this.mapSaveTextByIndex[lineIndex] = {};
      this.mapShowActionByIndex[lineIndex] = {};
      each(line, (_content, contentIndex) => {
        this.mapSaveTextByIndex[lineIndex][contentIndex] = true;
        this.mapShowActionByIndex[lineIndex][contentIndex] = false;
      });
    });
  }

  initChoiceContent() {
    each(this.question.choices, (choice) => {
      this.mapChoiceById[choice.id] = choice;
    });
  }

  addNewLine(index: number) {
    this.question.arrayContent = [
      ...CommonUtils.pushAtIndex(this.question.arrayContent!, index + 1, ['']),
    ];
    this.initMapSaveText();
    this.mapSaveTextByIndex[index + 1] = {
      0: false,
    };
    this.mapShowActionByIndex[index + 1][0] = true;
  }

  onDeleteLine(lineIndex: number) {
    const inputId = this.getInputId(this.question.arrayContent![lineIndex])[0];
    if (inputId) {
      this.question.choices = filter(
        this.question.choices,
        (choice) => choice.id !== inputId,
      );
    }
    this.removeAssociatedChoice(this.question.arrayContent![lineIndex]);
    this.question.arrayContent!.splice(lineIndex, 1);
    this.initMapSaveText();
  }

  protected removeAssociatedChoice(arrayContent: string[]) {
    each(arrayContent, (content) => {
      if (IsInputPipe.prototype.transform(content)) {
        this.mapChoiceById = omit(
          this.mapChoiceById,
          RegExp(INPUT_PATTERN).exec(content)![1],
        );
      }
    });
  }

  moveLineUp(index: number) {
    const tempQuestion = clone(this.question.arrayContent![index - 1]);
    this.question.arrayContent![index - 1] = this.question.arrayContent![index];
    this.question.arrayContent![index] = tempQuestion;
    this.initMapSaveText();
  }

  moveLineDown(index: number) {
    const tempQuestion = clone(this.question.arrayContent![index + 1]);
    this.question.arrayContent![index + 1] = this.question.arrayContent![index];
    this.question.arrayContent![index] = tempQuestion;
    this.initMapSaveText();
  }

  addText(lineIndex: number, contentIndex: number) {
    this.question.arrayContent![lineIndex] = [
      ...CommonUtils.pushAtIndex(
        this.question.arrayContent![lineIndex],
        contentIndex,
        '',
      ),
    ];
    this.saveAllEditing();
    this.mapSaveTextByIndex[lineIndex][contentIndex] = false;
    this.mapShowActionByIndex[lineIndex][contentIndex] = true;
  }

  onEditText(lineIndex: number, contentIndex: number) {
    if (!this.isEditing) {
      return;
    }
    this.saveAllEditing();
    this.mapSaveTextByIndex[lineIndex][contentIndex] = false;
    this.mapShowActionByIndex[lineIndex][contentIndex] = true;
  }

  onSaveText(lineIndex: number, contentIndex: number) {
    if (isEmpty(this.question.arrayContent![lineIndex])) {
      this.question.arrayContent!.splice(lineIndex, 1);
      return;
    }
    this.mapSaveTextByIndex[lineIndex][contentIndex] = true;
    this.mapShowActionByIndex[lineIndex][contentIndex] = false;
    if (
      IsInputPipe.prototype.transform(
        this.question.arrayContent![lineIndex][contentIndex],
      )
    ) {
      this.question.choices = toArray(this.mapChoiceById);
    }
    this.onSave.emit();
  }

  onDeleteText(lineIndex: number, contentIndex: number) {
    this.updateMapChoiceId(lineIndex, contentIndex);
    this.question.arrayContent![lineIndex].splice(contentIndex, 1);
    if (isEmpty(this.question.arrayContent![lineIndex])) {
      this.question.arrayContent![lineIndex].push('');
    }
    this.initMapSaveText();
    this.saveAllEditing();
    this.question.choices = toArray(this.mapChoiceById);
    this.onSave.emit();
  }

  addInput(lineIndex: number, contentIndex: number) {
    const newChoice = {
      id: CommonUtils.generateRandomId(),
      content: '',
    };
    this.question.choices.push(newChoice);
    this.mapChoiceById[newChoice.id] = newChoice;
    this.question.arrayContent![lineIndex] = [
      ...CommonUtils.pushAtIndex(
        this.question.arrayContent![lineIndex],
        contentIndex + 1,
        `<${newChoice.id}>`,
      ),
    ];
    this.saveAllEditing();
    this.mapSaveTextByIndex[lineIndex][contentIndex] = false;
    this.mapShowActionByIndex[lineIndex][contentIndex] = true;
  }

  onEditInput(lineIndex: number, contentIndex: number) {
    if (!this.isEditing) {
      return;
    }
    this.saveAllEditing();
    this.mapSaveTextByIndex[lineIndex][contentIndex] = false;
    this.mapShowActionByIndex[lineIndex][contentIndex] = true;
  }

  protected getInputId(line: string[]) {
    return line
      .map((item) => {
        const match = item.match(INPUT_PATTERN);
        return match ? match[1] : null;
      })
      .filter(Boolean);
  }

  private updateMapChoiceId(lineIndex: number, contentIndex: number) {
    const content = this.question.arrayContent![lineIndex][contentIndex];
    if (IsInputPipe.prototype.transform(content)) {
      this.mapChoiceById = omit(
        this.mapChoiceById,
        RegExp(INPUT_PATTERN).exec(content)![1],
      );
    }
  }

  private saveAllEditing() {
    this.mapSaveTextByIndex = {
      ...mapValues(this.mapSaveTextByIndex, (line) => {
        return { ...mapValues(line, () => true) };
      }),
    };
    this.mapShowActionByIndex = {
      ...mapValues(this.mapSaveTextByIndex, (line) => {
        return { ...mapValues(line, () => false) };
      }),
    };
  }
}
