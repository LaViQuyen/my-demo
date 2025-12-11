import { HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularEditorConfig, UploadResponse } from '@wfpena/angular-wysiwyg';
import { clone, cloneDeep, debounce, each, isNull, mapValues } from 'lodash-es';
import { map, Subscription } from 'rxjs';
import { FileService } from '../../file.service';
import { environment } from '../../../environments/environment';
import { CommonUtils } from '../../utils/common-utils';
import { BASE64_IMAGE_REGEX } from '../../utils/constant';
import { QuestionType } from '../enums/question-type.enum';
import { AbstractPart } from '../models/abstract-part.model';
import { Question } from '../models/question.model';
import { QuestionIndex } from '../../pages/full-test/full-test.component';
import { ExtractIdPipe } from '../../pipes/extract-id.pipe';
import { IsInputPipe } from '../../modules/question/fill-in-the-gap/is-input.pipe';

@Component({
  template: '',
})
export abstract class AbstractQuizPartComponent<T extends AbstractPart>
  implements OnChanges, OnDestroy
{
  @Input() data!: T;
  @Input() isTesting: boolean = false;
  @Input() isEditing: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isSaved: boolean = false;
  @Input() isStart: boolean = false;
  selectedId = model('');
  selectedQuestionIndex = model();
  @Output() onStartChange = new EventEmitter();
  @Output() onTimeout = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() dataChange = new EventEmitter();
  @Output() onAddQuestion = new EventEmitter();
  @Output() onPartAnswerQuestion = new EventEmitter();
  @Output() onPartAnswerChoice = new EventEmitter();
  questionType = QuestionType;
  currentQuestion: Question = {
    id: '',
    content: '',
    type: null,
    choices: [],
    answer: [],
    correctAnswer: [],
  };
  mapQuestionEditing: Record<string, boolean> = {};
  subscriptions: Subscription[] = [];
  onPaste = debounce((event) => this.uploadQuestionBase64Images(event), 1000);
  config: AngularEditorConfig = {
    editable: true,
    sanitize: true,
    toolbarHiddenButtons: [
      [
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertHorizontalRule',
        'insertVideo',
        'subscript',
        'superscript',
        'undo',
        'redo',
        'toggleEditorMode',
      ],
      [],
    ],
    upload: (file: File) => {
      return this.fileService.uploadFile(file).pipe(
        map((response) => {
          const imageUrl = `${environment.api}/api/file/upload/${response.fileName}`;
          return {
            ...response,
            body: { imageUrl: imageUrl },
          } as HttpResponse<UploadResponse>;
        }),
      );
    },
  };
  wordCount: number = 0;
  fileService = inject(FileService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isSaved']?.currentValue) {
      mapValues(this.mapQuestionEditing, () => false);
    }
  }

  ngOnDestroy(): void {
    each(this.subscriptions, (sub) => {
      sub.unsubscribe();
    });
  }

  onWritingChange(value: string) {
    this.data.wordCount = value.trim().split(/\s+/).length;
  }

  defaultChoices(numberOfChocies: number) {
    const choices = [];
    for (let i = 0; i < numberOfChocies; i++) {
      const choice = {
        id: CommonUtils.generateRandomId(),
        content: '',
      };
      choices.push(choice);
    }
    return choices;
  }

  addQuestion(type: number) {
    const id = CommonUtils.generateRandomId();
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE:
        this.currentQuestion = {
          id: id,
          content: '',
          type: type,
          choices: this.defaultChoices(4),
          answer: [],
          correctAnswer: [],
          numberOfChoices: 1,
        };
        break;
      case QuestionType.SHORT_ANSWER:
        this.currentQuestion = {
          id: id,
          content: '',
          type: type,
          choices: [],
          answer: [],
          correctAnswer: [],
        };
        break;
      case QuestionType.MULTIPLE_QUESTIONS:
        this.currentQuestion = {
          id: id,
          content: '',
          type: type,
          choices: [],
          answer: [],
          correctAnswer: [],
          subQuestions: [],
        };
        break;
      case QuestionType.DROPDOWN_ANSWER:
        this.currentQuestion = {
          id: id,
          content: '',
          type: type,
          choices: this.defaultChoices(3),
          answer: [],
          correctAnswer: [],
          numberOfChoices: 1,
        };
        break;
      case QuestionType.LABEL_ON_MAP:
        this.currentQuestion = {
          id: id,
          content: '',
          type: type,
          choices: this.defaultChoices(4),
          answer: [],
          correctAnswer: [],
          subQuestions: [],
        };
        break;
      case QuestionType.FILL_IN_THE_GAP:
      case QuestionType.MATCHING_HEADER:
      case QuestionType.DRAG_AND_DROP_ANSWER:
        this.currentQuestion = {
          id: id,
          content: '',
          arrayContent: [],
          type: type,
          choices: [],
          answer: [],
          correctAnswer: [],
          subQuestions: [],
        };
        break;
      case QuestionType.FILL_IN_THE_TABLE:
      case QuestionType.DRAG_IN_TABLE:
        this.currentQuestion = {
          id: id,
          content: '',
          name: 'Table title',
          tableContent: {
            tr0: {
              td0: [['Text']],
              td1: [['Text']],
            },
            tr1: {
              td0: [['Text']],
              td1: [['Text']],
            },
            tr2: {
              td0: [['Text']],
              td1: [['Text']],
            },
          },
          type: type,
          choices: [],
          answer: [],
          correctAnswer: [],
          subQuestions: [],
        };
        break;
      default:
        break;
    }
    this.data.questions.push({ ...this.currentQuestion });
    this.data = { ...this.data };
    this.onAddQuestion.emit(this.currentQuestion);
    this.onEditQuestion(id);
  }

  onSaveQuestion(id: string) {
    this.mapQuestionEditing[id] = false;
    this.onSave.emit();
  }

  onEditQuestion(id: string) {
    this.saveOthersEditting();
    this.mapQuestionEditing[id] = true;
  }

  moveQuestionUp(index: number) {
    const tempQuestion = clone(this.data.questions[index - 1]);
    this.data.questions[index - 1] = this.data.questions[index];
    this.data.questions[index] = tempQuestion;
    this.onSave.emit();
  }

  moveQuestionDown(index: number) {
    const tempQuestion = clone(this.data.questions[index + 1]);
    this.data.questions[index + 1] = this.data.questions[index];
    this.data.questions[index] = tempQuestion;
    this.onSave.emit();
  }

  duplicateQuestion(question: Question) {
    let cloneQuestion = cloneDeep(question);
    cloneQuestion = {
      ...cloneQuestion,
      id: CommonUtils.generateRandomId(),
      content: `Copy of ${cloneQuestion.content}`,
    };
    this.changeChoiceId(cloneQuestion);
    this.data.questions.push(cloneQuestion);
    this.onSave.emit();
  }

  private changeChoiceId(question: Question) {
    const correctAnswers = clone(question.correctAnswer);
    question.correctAnswer = [];
    if (question.correctAnswer) {
      if (question.type === QuestionType.LABEL_ON_MAP) {
        each(question.subQuestions, (subQuestion) => {
          const newId = CommonUtils.generateRandomId();
          if (correctAnswers.includes(subQuestion.id)) {
            subQuestion.correctAnswer.push(subQuestion.id);
          }
          subQuestion.id = newId;
        });
      }
      each(question.choices, (choice) => {
        const newChoiceId = CommonUtils.generateRandomId();
        if (correctAnswers.includes(choice.id)) {
          question.correctAnswer.push(newChoiceId);
        }
        if (
          question.type === QuestionType.FILL_IN_THE_GAP ||
          question.type === QuestionType.DRAG_AND_DROP_ANSWER
        ) {
          this.changeIdLineFillInTheGap(question, choice.id, newChoiceId);
        }
        if (
          question.type === QuestionType.DRAG_IN_TABLE ||
          question.type === QuestionType.FILL_IN_THE_TABLE
        ) {
          this.changeIdInLine(question, choice.id, newChoiceId);
        }
        choice.id = newChoiceId;
      });
    }
  }

  private changeIdInLine(
    question: Question,
    oldChoiceId: string,
    newChoiceId: string,
  ) {
    if (question.tableContent) {
      each(question.tableContent, (row) => {
        each(row, (column) => {
          each(column, (line) => {
            for (let i = 0; i < line.length; i++) {
              if (
                IsInputPipe.prototype.transform(line[i]) &&
                ExtractIdPipe.prototype.transform(line[i]) === oldChoiceId
              ) {
                line[i] = `<${newChoiceId}>`;
              }
            }
          });
        });
      });
    }
  }

  private changeIdLineFillInTheGap(
    question: Question,
    oldChoiceId: string,
    newChoiceId: string,
  ) {
    if (question.arrayContent) {
      for (
        let lineIndex = 0;
        lineIndex < question.arrayContent.length;
        lineIndex++
      ) {
        for (
          let textIndex = 0;
          textIndex < question.arrayContent[lineIndex].length;
          textIndex++
        ) {
          if (
            IsInputPipe.prototype.transform(
              question.arrayContent[lineIndex][textIndex],
            ) &&
            oldChoiceId ===
              ExtractIdPipe.prototype.transform(
                question.arrayContent[lineIndex][textIndex],
              )
          ) {
            question.arrayContent[lineIndex][textIndex] = `<${newChoiceId}>`;
          }
        }
      }
    }
  }

  removeQuestion(questionIdex: number) {
    this.data.questions.splice(questionIdex, 1);
  }

  saveOthersEditting() {
    for (const key in this.mapQuestionEditing) {
      this.mapQuestionEditing[key] = false;
    }
  }

  extractBase64Image(content: string) {
    return BASE64_IMAGE_REGEX.exec(content);
  }

  uploadQuestionBase64Images(content: string) {
    const base64Image = this.extractBase64Image(content);
    if (!isNull(base64Image) && base64Image[1].startsWith('data')) {
      const imageSrc = base64Image[1];
      const fileName = `${this.data.id}_${new Date().getMilliseconds()}.png`;
      const imageFile: File = CommonUtils.base64ToFile(imageSrc, fileName);
      this.fileService.uploadFile(imageFile).subscribe((response) => {
        this.data.content = this.data.content?.replace(
          `"${imageSrc}"`,
          `"${environment.api}/upload/${response.fileName}" width="100%"`,
        );
      });
    }
  }

  onSaveClick() {
    this.onSave.emit();
  }
}
