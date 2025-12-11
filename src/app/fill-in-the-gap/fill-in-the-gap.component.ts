import { NgClass } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import {
  clone,
  each,
  filter,
  isEmpty,
  mapValues,
  omit,
  toArray,
} from 'lodash-es';
import { AbstractQuestionComponent } from '../../common/abstract-question.component';
import { Choice } from '../../common/models/choice.model';
import { CorrectAnswerPipe } from '../../common/pipes/correct-answer.pipe';
import { CommonUtils } from '../../utils/common-utils';
import { INPUT_PATTERN } from '../../utils/constant';
import { ArrayContentChoice } from './array-content.pipe';
import { FitContentDirective } from './fit-content.directive';
import { IsInputPipe } from './is-input.pipe';
import { TextSelectionDirective } from "../shared/directives/text-selection.directive";

@Component({
  selector: 'app-fill-in-the-gap',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    AngularEditorModule,
    MatIconModule,
    IsInputPipe,
    FitContentDirective,
    CorrectAnswerPipe,
    TextSelectionDirective
  ],
  templateUrl: './fill-in-the-gap.component.html',
  styleUrl: './fill-in-the-gap.component.scss',
})
export class FillInTheGapComponent extends AbstractQuestionComponent {
  inputPattern = INPUT_PATTERN;
  mapSaveTextByIndex: Record<number, Record<number, boolean>> = {};
  mapChoiceById: Record<string, Choice> = {};
  mapShowActionByIndex: Record<number, Record<number, boolean>> = {};

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (!changes['isEditing']?.currentValue) {
      this.saveAllEditing();
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.initMapSaveText();
    this.initChoiceContent();
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
  }

  onDeleteLine(lineIndex: number) {
    const inputId = this.getInputId(this.question.arrayContent![lineIndex])[0];
    if (inputId) {
      this.question.choices = filter(
        this.question.choices,
        (choice) => choice.id !== inputId,
      );
    }
    each(this.question.arrayContent![lineIndex], (_content, contentIndex) => {
      this.updateMapChoiceId(lineIndex, contentIndex);
    });
    this.question.arrayContent!.splice(lineIndex, 1);
    this.initMapSaveText();
  }

  private getInputId(line: string[]) {
    return line
      .map((item) => {
        const match = item.match(INPUT_PATTERN);
        return match ? match[1] : null;
      })
      .filter(Boolean);
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
  }

  onSaveText(lineIndex: number, contentIndex: number) {
    if (isEmpty(this.question.arrayContent![lineIndex])) {
      this.question.arrayContent!.splice(lineIndex, 1);
      return;
    }
    this.mapSaveTextByIndex[lineIndex][contentIndex] = true;

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
        contentIndex,
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
        return { ...mapValues(line, () => true) };
      }),
    };
  }
}
