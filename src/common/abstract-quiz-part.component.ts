import { HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularEditorConfig, UploadResponse } from '@wfpena/angular-wysiwyg';
import { clone, cloneDeep, debounce, each, isNull, mapValues } from 'lodash-es';
import { map, Subscription } from 'rxjs';
import { FileService } from '../app/file.service';
import { environment } from '../environments/environment';
import { CommonUtils } from '../utils/common-utils';
import { BASE64_IMAGE_REGEX } from '../utils/constant';
import { QuestionType } from './enums/question-type.enum';
import { AbstractPart } from './models/abstract-part.model';
import { Question } from './models/question.model';

@Component({
  template: '',
})
export abstract class AbstractQuizPartComponent<T extends AbstractPart>
  implements OnChanges, OnDestroy
{
  @Input() data!: T;
  @Output() dataChange = new EventEmitter();
  @Input() isTesting: boolean = false;
  @Input() isEditing: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() isSaved: boolean = false;
  @Input() isStart: boolean = false;
  @Output() onStartChange = new EventEmitter();
  @Output() onTimeout = new EventEmitter();
  @Output() onSave = new EventEmitter();

  currentQuestion: Question = {
    id: '',
    content: '',
    type: null,
    choices: [],
    answer: [],
    correctAnswer: [],
  };
  mapQuestionEditting: Record<string, boolean> = {};
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
      mapValues(this.mapQuestionEditting, () => false);
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
      default:
        break;
    }
    this.data.questions.push({ ...this.currentQuestion });
    this.data = { ...this.data };
    this.onEditQuestion(id);
  }

  onSaveQuestion(id: string) {
    this.mapQuestionEditting[id] = false;
    this.onSave.emit();
  }

  onEditQuestion(id: string) {
    this.saveOthersEditting();
    this.mapQuestionEditting[id] = true;
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
    this.data.questions.push(cloneQuestion);
    this.onSave.emit();
  }

  removeQuestion(questionIdex: number) {
    this.data.questions.splice(questionIdex, 1);
  }

  saveOthersEditting() {
    for (const key in this.mapQuestionEditting) {
      this.mapQuestionEditting[key] = false;
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
