import { Component } from '@angular/core';
import { FillInTheGapEditingComponent } from '../../fill-in-the-gap/fill-in-the-gap-editing/fill-in-the-gap-editing.component';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { ExtractIdPipe } from '../../../../pipes/extract-id.pipe';
import { FormsModule } from '@angular/forms';
import { IsInputPipe } from '../../fill-in-the-gap/is-input.pipe';
import { MatIcon } from '@angular/material/icon';
import { KeyValuePipe, NgClass } from '@angular/common';
import { each, filter, keys, mapValues, omit, toArray } from 'lodash-es';
import { INPUT_PATTERN } from '../../../../utils/constant';
import { CommonUtils } from '../../../../utils/common-utils';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-fill-in-the-table-editing',
  standalone: true,
  imports: [
    AngularEditorModule,
    ExtractIdPipe,
    FormsModule,
    IsInputPipe,
    MatIcon,
    KeyValuePipe,
    NgClass,
    MatButton,
  ],
  templateUrl: './fill-in-the-table-editing.component.html',
  styleUrl: './fill-in-the-table-editing.component.scss',
})
export class FillInTheTableEditingComponent extends FillInTheGapEditingComponent {
  headerColSpan = 1;
  mapEditingByCell: Record<string, Record<number, Record<number, boolean>>> = {
    tr0td0: {
      0: { 0: false },
      1: { 0: false },
    },
  };

  override ngOnInit() {
    super.ngOnInit();
    if (this.question.tableContent) {
      this.headerColSpan = Object.keys(
        this.question.tableContent['tr0'],
      ).length;
      each(this.question.tableContent, (row, rowKey) => {
        each(row, (column, columnKey) => {
          this.mapEditingByCell[`${rowKey}${columnKey}`] = {};
          each(column, (line, lineIndex) => {
            if (!this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex]) {
              this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex] = {};
            }
            each(line, (_content, contentIndex) => {
              this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex][
                contentIndex
              ] = false;
            });
          });
        });
      });
    }
  }

  addNewRow() {
    if (this.question.tableContent) {
      let columnLength = 2;
      if (this.question.tableContent['tr0']) {
        columnLength = Object.keys(this.question.tableContent['tr0']).length;
      }
      let newRow: Record<string, string[][]> = {};
      const newRowIndex = keys(this.question.tableContent).length;
      for (let i = 0; i < columnLength; i++) {
        newRow[`td${i}`] = [['Text']];
        this.mapEditingByCell[`tr${newRowIndex}td${i}`] = {
          0: { 0: false },
        };
      }
      this.question.tableContent[`tr${newRowIndex}`] = newRow;
    }
  }

  deleteRow(index: number) {
    const omitted = omit(this.question.tableContent, [`tr${index}`]);
    this.deleteAllAnswerInRow(`tr${index}`);
    const sortedKeys: string[] = keys(omitted).sort((key1, key2) => {
      const num1 = parseInt(key1.replace('tr', ''), 10);
      const num2 = parseInt(key2.replace('tr', ''), 10);
      return num1 - num2;
    });
    const reorderRows: Record<string, Record<string, string[][]>> = {};
    sortedKeys.forEach((key: string, index: number) => {
      reorderRows[`tr${index}`] = omitted[key];
    });
    this.question.tableContent = reorderRows;
  }

  addNewColumn() {
    if (this.question.tableContent) {
      const columnLength = Object.keys(
        this.question.tableContent['tr0'],
      ).length;
      each(this.question.tableContent, (row, key) => {
        if (this.question.tableContent![`${key}`]) {
          this.question.tableContent![`${key}`][`td${columnLength}`] = [
            ['Text'],
          ];
          this.mapEditingByCell[`${key}td${columnLength}`] = {
            0: { 0: false },
          };
        }
      });
      this.headerColSpan = keys(this.question.tableContent['tr0']).length;
    }
  }

  deleteColumn(index: number) {
    this.deleteAllAnswerInColumn(index);
    each(this.question.tableContent, (row, key) => {
      if (this.question.tableContent![`${key}`]) {
        const omitted = omit(this.question.tableContent![`${key}`], [
          `td${index}`,
        ]);
        const sortedKeys: string[] = keys(omitted).sort((key1, key2) => {
          const num1 = parseInt(key1.replace('td', ''), 10);
          const num2 = parseInt(key2.replace('td', ''), 10);
          return num1 - num2;
        });
        const reorderColumns: Record<string, string[][]> = {};
        sortedKeys.forEach((key: string, index: number) => {
          reorderColumns[`td${index}`] = omitted[key];
        });
        this.question.tableContent![`${key}`] = reorderColumns;
      }
    });
    this.headerColSpan--;
  }

  addColumnText(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    this.question.tableContent![rowKey][columnKey][lineIndex] = [
      ...CommonUtils.pushAtIndex(
        this.question.tableContent![rowKey][columnKey][lineIndex],
        contentIndex + 1,
        '',
      ),
    ];
    this.enableEdit(rowKey, columnKey, lineIndex, contentIndex + 1);
  }

  editText(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    const foundContent = this.mapEditingByCell[`${rowKey}${columnKey}`];
    if (foundContent) {
      this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex][contentIndex] =
        true;
    }
    this.enableEdit(rowKey, columnKey, lineIndex, contentIndex);
  }

  saveColumnText(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    const foundContent = this.mapEditingByCell[`${rowKey}${columnKey}`];
    if (foundContent) {
      this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex][contentIndex] =
        false;
    }
    this.saveOthersEditing();
  }

  deleteColumnText(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    this.question.tableContent![rowKey][columnKey][lineIndex].splice(
      contentIndex,
      1,
    );
  }

  addColumnInput(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    const foundContent = this.mapEditingByCell[`${rowKey}${columnKey}`];
    if (foundContent) {
      const newChoice = {
        id: CommonUtils.generateRandomId(),
        content: '',
        correctAnswer: '',
        answer: '',
      };
      this.mapChoiceById[newChoice.id] = newChoice;
      this.question.tableContent![rowKey][columnKey][lineIndex] = [
        ...(CommonUtils.pushAtIndex(
          this.question.tableContent![rowKey][columnKey][lineIndex],
          contentIndex + 1,
          `<${newChoice.id}>`,
        ) as string[]),
      ];
      this.saveOthersEditing();
      this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex][
        contentIndex + 1
      ] = true;
    }
  }

  saveColumnInput() {
    this.question.choices = toArray(this.mapChoiceById);
    this.saveOthersEditing();
  }

  deleteColumnInput(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    const content =
      this.question.tableContent![rowKey][columnKey][lineIndex][contentIndex];
    this.question.tableContent![rowKey][columnKey][lineIndex].splice(
      contentIndex,
      1,
    );
    this.mapChoiceById = omit(
      this.mapChoiceById,
      RegExp(INPUT_PATTERN).exec(content)![1],
    );
  }

  private enableEdit(
    rowKey: string,
    columnKey: string,
    lineIndex: number,
    contentIndex: number,
  ) {
    this.saveOthersEditing();
    this.mapEditingByCell[`${rowKey}${columnKey}`][lineIndex][contentIndex] =
      true;
  }

  private saveOthersEditing() {
    this.mapEditingByCell = mapValues(this.mapEditingByCell, (cell) => {
      return {
        ...mapValues(cell, (line) => {
          return { ...mapValues(line, () => false) };
        }),
      };
    });
    this.onSave.emit();
  }

  private deleteAllAnswerInRow(rowKey: string) {
    each(this.question.tableContent![`${rowKey}`], (column, columnKey) => {
      each(column, (line) => {
        each(line, (content) => {
          this.removeChoiceFromMap(content);
        });
      });
    });
  }

  private deleteAllAnswerInColumn(columnIndex: number) {
    each(this.question.tableContent, (row, rowKey) => {
      each(
        this.question.tableContent![`${rowKey}`][`td${columnIndex}`],
        (line) => {
          each(line, (content) => {
            this.removeChoiceFromMap(content);
          });
        },
      );
    });
  }

  removeChoiceFromMap(content: string) {
    if (IsInputPipe.prototype.transform(content)) {
      this.mapChoiceById = omit(
        this.mapChoiceById,
        RegExp(INPUT_PATTERN).exec(content)![1],
      );
      this.question.choices = toArray(this.mapChoiceById);
    }
  }

  addNewLineInColumn(rowIndex: string, columnIndex: string, lineIndex: number) {
    this.question.tableContent![rowIndex][columnIndex] = [
      ...CommonUtils.pushAtIndex(
        this.question.tableContent![rowIndex][columnIndex],
        lineIndex + 1,
        ['Text'],
      ),
    ];
    this.mapEditingByCell[`${rowIndex}${columnIndex}`][lineIndex + 1] = {
      0: true,
    };
  }

  deleteLineInColumn(rowIndex: string, columnIndex: string, lineIndex: number) {
    const line = this.question.tableContent![rowIndex][columnIndex][lineIndex];
    const inputId = this.getInputId(line)[0];
    if (inputId) {
      this.question.choices = filter(
        this.question.choices,
        (choice) => inputId !== choice.id,
      );
    }
    this.removeAssociatedChoice(
      this.question.tableContent![rowIndex][columnIndex][lineIndex],
    );
    this.question.tableContent![rowIndex][columnIndex].splice(lineIndex, 1);
    this.initMapSaveText();
  }
}
