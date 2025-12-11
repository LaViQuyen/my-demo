import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import {
  clone,
  each,
  flatMap,
  isEmpty,
  isUndefined,
  mapValues,
  toArray,
} from 'lodash-es';
import { interval, Subscription } from 'rxjs';
import { Quiz } from '../../shared/models/quiz.model';
import { Result } from '../../shared/models/result.model';
import { CommonUtils } from '../../utils/common-utils';
import { ExportUtils } from '../../utils/export.utils';
import { ScoreUtils } from '../../utils/score-utils';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { FileService } from '../../file.service';
import { ListeningComponent } from '../../tabs/listening/listening.component';
import { PartNavigationComponent } from '../../shared/components/part-navigation/part-navigation.component';
import { QuizService } from '../../modules/quizzes/quizzes.service';
import { ReadingComponent } from '../../tabs/reading/reading.component';
import { WritingComponent } from '../../tabs/writing/writing.component';
import { FullTestService } from './full-test.service';
import { FeedbackDialog } from '../../shared/dialogs/feedback-dialog/feedback-dialog.component';
import {
  Time,
  TimerComponent,
} from '../../shared/components/timer/timer.component';
import { Tab } from '../../shared/enums/tab.enum';
import { QuestionNavigationComponent } from '../../modules/question/question-navigation/question-navigation.component';
import { AbstractPart } from '../../shared/models/abstract-part.model';
import { Question } from '../../shared/models/question.model';
import { QuestionType } from '../../shared/enums/question-type.enum';
import { Choice } from '../../shared/models/choice.model';

const SAVE_INTERVAL = 120000;
const SECOND_INTERVAL = 1000;
const DEFAULT_START_TIMEOUT = {
  minutes: 5,
  seconds: 0,
};

export interface QuestionIndex {
  index: number;
  id?: string;
  isAnswer: boolean;
  answer: string[];
  isReviewed: boolean;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    ListeningComponent,
    ReadingComponent,
    WritingComponent,
    PartNavigationComponent,
    TimerComponent,
    QuestionNavigationComponent,
  ],
  providers: [QuizService, FullTestService],
  templateUrl: './full-test.component.html',
  styleUrl: './full-test.component.scss',
})
export class FullTestComponent implements OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  @HostListener('document:keydown.control.s', ['$event'])
  onCtrlSaveHandler() {
    this.onCtrlSave();
  }

  tabs = Tab;
  mapQuestionPart: Record<string, number> = {};
  selectedListeningPart = 0;
  selectedReadingPart = 0;
  selectedWritingPart = 0;
  mapSavedPart: Record<string, Record<number, boolean>> = {
    listening: {},
    reading: {},
    writing: {},
  };
  result: Result = {
    id: '',
    name: '',
    studentName: '',
    correctReadingPoint: 0,
    totalReadingPoint: 0,
    correctListeningPoint: 0,
    totalListeningPoint: 0,
    testDate: '',
    quizId: '',
    listeningParts: [],
    readingParts: [],
    writingParts: [],
    isSubmit: false,
    feedback: {
      rating: 0,
      content: '',
    },
  };
  quiz: Quiz = {
    id: '',
    name: '',
    listeningParts: [],
    readingParts: [],
    writingParts: [],
  };
  testTime: Time = {
    minutes: 0,
    seconds: 0,
  };
  startTime: Time = clone(DEFAULT_START_TIMEOUT);
  totalSeconds: number = 0;
  testTimeoutIntervalSub!: Subscription;
  testTimeoutInterval: number = 0;
  startTimeoutInterval: number = SECOND_INTERVAL;
  isReady: boolean = false;
  isStart: boolean = false;
  currentTab = 0;
  mapDisablePart: Record<number, boolean> = {
    0: false,
    1: true,
    2: true,
  };
  mapAnsweredQuestionId: Record<string, QuestionIndex[]> = {};
  selectedId = signal<string>('');
  selectedQuestionIndex = signal<QuestionIndex | null>(null);
  mapAnswerByChoiceId: { [key: string]: string } = {};
  selectedChoiceId = '';
  subscriptions: Subscription = new Subscription();
  saveQuestionSub: Subscription = new Subscription();

  constructor(
    private quizService: QuizService,
    private router: Router,
    private dialog: MatDialog,
    private fileService: FileService,
    protected testService: FullTestService,
  ) {
    const quizId = this.router.getCurrentNavigation()?.extras.state?.['quizId'];
    if (quizId) {
      this.quizService.getById(quizId).subscribe((quiz) => {
        quiz.audioTime = 0;
        this.quiz = quiz;
        this.result = { ...quiz };
        this.totalSeconds = this.result.listeningTimeout! * 60;
        this.audioPlayer.nativeElement.load();
        this.getTestTimeout();
        this.generateMapAnswered();
      });
      this.startAutoSave();
    }
    const testId = this.router.getCurrentNavigation()?.extras.state?.['testId'];
    if (testId) {
      this.subscriptions.add(
        this.testService.getResultById(testId).subscribe((result) => {
          this.result = result;
          this.totalSeconds = this.result.listeningTimeout! * 60;
          this.audioPlayer.nativeElement.currentTime = this.result.audioTime!;
          this.audioPlayer.nativeElement.load();
          if (this.result.currentTab) {
            this.currentTab = this.result.currentTab;
            this.disableOthersTab();
            this.mapDisablePart[this.currentTab] = false;
          }
          this.getTestTimeout();
          this.generateMapAnswered();
        }),
      );
      this.isReady = true;
      this.startAutoSave();
    }
  }

  ngOnDestroy(): void {
    if (this.testTimeoutIntervalSub) {
      this.testTimeoutIntervalSub.unsubscribe();
    }
  }

  startAutoSave() {
    const saveInterval = interval(SAVE_INTERVAL).subscribe(() => {
      this.onCtrlSave();
    });
    this.subscriptions.add(saveInterval);
  }

  onChangeTab(tab: number) {
    this.currentTab = tab;
    this.isStart = false;
    this.getTestTimeout();
  }

  getTestTimeout() {
    if (this.currentTab === this.tabs.LISTENING) {
      this.totalSeconds = this.result.listeningTimeout! * 60;
    }
    if (this.currentTab === this.tabs.READING) {
      this.totalSeconds = this.result.readingTimeout! * 60;
    }
    if (this.currentTab === this.tabs.WRITING) {
      this.totalSeconds = this.result.writingTimeout! * 60;
    }
    this.testTime = {
      minutes: Math.floor(this.totalSeconds / 60),
      seconds: this.totalSeconds % 60,
    };
  }

  onStartTest() {
    this.isReady = true;
    this.result.id = CommonUtils.generateRandomId();
    this.testService.submitTest(this.result).subscribe();
  }

  onCtrlSave() {
    if (this.saveQuestionSub != null) {
      this.saveQuestionSub.unsubscribe();
    }
    this.saveTimeout();
    this.result.testDate = CommonUtils.getCurrentDate();
    this.result.currentTab = this.currentTab;
    this.saveQuestionSub = this.testService
      .saveCurrentTest(this.result)
      .subscribe();
  }

  saveTimeout() {
    const timeout = this.testTime.minutes + this.testTime.seconds / 60;
    if (this.currentTab === this.tabs.LISTENING) {
      this.result.listeningTimeout = timeout;
    }
    if (this.currentTab === this.tabs.READING) {
      this.result.readingTimeout = timeout;
    }
    if (this.currentTab === this.tabs.WRITING) {
      this.result.writingTimeout = timeout;
    }
  }

  onStartPart() {
    if (this.currentTab === 0 && this.audioPlayer) {
      this.audioPlayer.nativeElement.play().then(() => {});
    }
    this.isStart = true;
    this.startTimeoutInterval = 0;
    this.testTimeoutInterval = SECOND_INTERVAL;
    this.testTimeoutIntervalSub = interval(SECOND_INTERVAL).subscribe(() => {
      if (this.currentTab === 0) {
        this.result.audioTime! += 1;
      }
    });
  }

  showTimeOutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Information';
    dialogRef.componentInstance.message = "Time's up";
    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.updateTab();
        this.afterSubmit();
      }
    });
  }

  updateTab() {
    this.startTimeoutInterval = SECOND_INTERVAL;
    this.startTime = clone(DEFAULT_START_TIMEOUT);
    this.testTimeoutInterval = 0;
    this.disableOthersTab();
    this.mapDisablePart[this.currentTab + 1] = false;
    this.mapAnsweredQuestionId = {};
    this.currentTab = this.currentTab + 1;
    this.generateMapAnswered();
  }

  onTestTimeout() {
    this.testTimeoutInterval = 0;
    if (this.currentTab === 0) {
      this.audioPlayer.nativeElement.pause();
    }
    this.testTimeoutIntervalSub.unsubscribe();
    this.showTimeOutDialog();
  }

  onStartTimeOut() {
    this.startTimeoutInterval = 0;
    this.isStart = true;
    this.testTimeoutInterval = SECOND_INTERVAL;
  }

  afterSubmit() {
    let htmlString = '';
    if (this.currentTab === this.tabs.LISTENING + 1) {
      this.audioPlayer.nativeElement.pause();
      htmlString += ExportUtils.exportListening(this.result);
      this.subscriptions.add(
        this.fileService
          .generatePdfFile(
            'Listening',
            htmlString,
            this.result.studentName,
            this.result.name,
          )
          .subscribe(),
      );
      this.generateMapAnswered();
    }
    if (this.currentTab === this.tabs.READING + 1) {
      htmlString += ExportUtils.exportReading(this.result);
      this.subscriptions.add(
        this.fileService
          .generatePdfFile(
            'Reading',
            htmlString,
            this.result.studentName,
            this.result.name,
          )
          .subscribe(),
      );
      this.generateMapAnswered();
    }
    if (this.currentTab === this.tabs.WRITING + 1) {
      htmlString += ExportUtils.exportWriting(this.result);
      this.subscriptions.add(
        this.fileService
          .generatePdfFile(
            'Writing',
            htmlString,
            this.result.studentName,
            this.result.name,
          )
          .subscribe(),
      );
      this.showFeedbackDialog();
    }
    if (this.testTimeoutIntervalSub) {
      this.testTimeoutIntervalSub.unsubscribe();
    }
    this.result = { ...this.result, currentTab: this.currentTab };
    this.saveQuestionSub = this.testService
      .saveCurrentTest(this.result)
      .subscribe();
  }

  onSubmitPartClick() {
    this.showSubmitDialog();
  }

  showSubmitDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Information';
    dialogRef.componentInstance.message = 'Submit this test?';
    dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) {
        this.updateTab();
        this.afterSubmit();
      }
    });
  }

  showFeedbackDialog() {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((feedback) => {
      this.result.feedback = feedback;
      let htmlString = ExportUtils.exportFeedback(this.result);
      this.subscriptions.add(
        this.fileService
          .generatePdfFile(
            'Feedback',
            htmlString,
            this.result.studentName,
            this.result.name,
          )
          .subscribe(),
      );
      this.submit();
    });
  }

  submit() {
    if (!this.audioPlayer.nativeElement.paused) {
      this.audioPlayer.nativeElement.pause();
    }
    this.calculateListeningPoint();
    this.calculateReadingPoint();
    this.result.isSubmit = true;
    this.onCtrlSave();
    this.router.navigate(['mock-test']);
  }

  private disableOthersTab() {
    this.mapDisablePart = mapValues(this.mapDisablePart, () => true);
  }

  private calculateListeningPoint() {
    let correctPoint = 0;
    let totalPoint = 0;
    each(this.result.listeningParts, (part) => {
      each(part.questions, (question) => {
        const scoreResult = ScoreUtils.calculateQuestionPoint(question);
        correctPoint += scoreResult.correct;
        totalPoint += scoreResult.total;
      });
    });
    this.result.correctListeningPoint = correctPoint;
    this.result.totalListeningPoint = totalPoint;
  }

  private calculateReadingPoint() {
    let correctPoint = 0;
    let totalPoint = 0;
    each(this.result.readingParts, (part) => {
      if (part.isMatchHeader) {
        each(part.questions, (question) => {
          totalPoint++;
          const score = ScoreUtils.forDropdown(question);
          correctPoint += score.correct;
        });
      } else {
        each(part.questions, (question) => {
          each(question.subQuestions, (subQuestion) => {
            const scoreResult = ScoreUtils.calculateQuestionPoint(subQuestion);
            correctPoint += scoreResult.correct;
            totalPoint += scoreResult.total;
          });
        });
      }
    });
    this.result.correctReadingPoint = correctPoint;
    this.result.totalReadingPoint = totalPoint;
  }

  generateQuestionMap() {
    let parts: AbstractPart[] = [];
    switch (this.currentTab) {
      case Tab.LISTENING:
        parts = this.result.listeningParts;
        break;
      case Tab.READING:
        parts = this.result.readingParts;
        break;
      case Tab.WRITING:
        parts = this.result.writingParts;
        break;
      default:
        break;
    }
    each(parts, (part, index: number) => {
      if (part.isMatchHeader) {
        this.mapQuestionPart[part.id] = index;
      } else {
        each(part.questions, (question) => {
          this.mapQuestionPart[question.id] = index;
        });
      }
    });
  }

  navigateToQuestion(id: string) {
    const part = this.mapQuestionPart[id];
    switch (this.currentTab) {
      case Tab.LISTENING:
        this.selectedListeningPart = part;
        break;
      case Tab.READING:
        this.selectedReadingPart = part;
        break;
      case Tab.WRITING:
        this.selectedWritingPart = part;
        break;
      default:
        break;
    }
  }

  generateMapAnswered() {
    this.mapAnsweredQuestionId = {};
    this.mapQuestionPart = {};
    this.generateQuestionMap();
    this.selectedQuestionIndex.set(null);
    if (this.currentTab === Tab.LISTENING) {
      this.generatePartQuestionIndex(this.result.listeningParts);
    }
    if (this.currentTab === Tab.READING) {
      this.generatePartQuestionIndex(this.result.readingParts);
    }
  }

  private generatePartQuestionIndex(parts: AbstractPart[]) {
    let index = 0;
    each(parts, (part) => {
      if (part.isMatchHeader) {
        if (isUndefined(this.mapAnsweredQuestionId[part.id])) {
          this.mapAnsweredQuestionId[part.id] = [];
        }
        each(part.questions, (question) => {
          this.mapAnsweredQuestionId[part.id].push({
            index: index,
            id: question.id,
            answer: [question.answer as string],
            isAnswer:
              !isEmpty(question.answer) && !isUndefined(question.answer),
            isReviewed: false,
          });
          index++;
        });
      } else {
        each(part.questions, (question) => {
          if (isUndefined(this.mapAnsweredQuestionId[question.id])) {
            this.mapAnsweredQuestionId[question.id] = [];
          }
          switch (question.type) {
            case QuestionType.SHORT_ANSWER:
            case QuestionType.DRAG_AND_DROP_ANSWER:
            case QuestionType.FILL_IN_THE_GAP:
            case QuestionType.FILL_IN_THE_TABLE:
            case QuestionType.DRAG_IN_TABLE:
              each(question.choices, (choice) => {
                this.mapAnsweredQuestionId[question.id].push({
                  index: index,
                  id: choice.id,
                  answer: [choice.answer as string],
                  isAnswer:
                    !isEmpty(choice.answer) && !isUndefined(choice.answer),
                  isReviewed: false,
                });
                this.mapAnswerByChoiceId[choice.id] = '';
                this.selectedChoiceId = choice.id;
                index++;
              });
              break;
            case QuestionType.LABEL_ON_MAP:
              each(question.subQuestions, (subQuestion) => {
                this.mapAnsweredQuestionId[question.id].push({
                  index: index,
                  id: subQuestion.id,
                  answer: [],
                  isAnswer: !isEmpty(subQuestion.answer),
                  isReviewed: false,
                });
                index++;
              });
              break;
            case QuestionType.MULTIPLE_CHOICE:
              for (let i = 0; i < question.numberOfChoices!; i++) {
                this.generateMultipleChoiceIndex(question, index);
                index++;
              }
              break;
            case QuestionType.DROPDOWN_ANSWER:
              this.generateDropdownChoiceIndex(question, index);
              index++;
              break;
          }
        });
      }
    });
  }

  generateMultipleChoiceIndex(question: Question, index: number) {
    this.mapAnsweredQuestionId[question.id].push({
      id: question.id,
      index: index,
      answer: question.answer as string[],
      isAnswer: false,
      isReviewed: false,
    });
    if (!isEmpty(question.answer)) {
      for (let i = 0; i < question.answer.length; i++) {
        if (this.mapAnsweredQuestionId[question.id][i]) {
          this.mapAnsweredQuestionId[question.id][i].isAnswer = true;
        }
      }
    }
  }

  private generateDropdownChoiceIndex(question: Question, index: number) {
    this.mapAnsweredQuestionId[question.id].push({
      id: question.id,
      index: index,
      answer: question.answer as string[],
      isAnswer: !isEmpty(question.answer),
      isReviewed: false,
    });
  }

  onMapAnsweredQuestion(question: Question) {
    if (this.mapAnsweredQuestionId[question.id]) {
      switch (question.type) {
        case QuestionType.FILL_IN_THE_GAP:
        case QuestionType.FILL_IN_THE_TABLE:
        case QuestionType.DRAG_AND_DROP_ANSWER:
        case QuestionType.DRAG_IN_TABLE:
          each(question.choices, (choice) => {
            this.mapAnswerByChoiceId[choice.id] = clone(choice.answer!);
          });
          each(this.mapAnsweredQuestionId[question.id], (questionIndex) => {
            questionIndex.answer = [
              this.mapAnswerByChoiceId[questionIndex.id as string],
            ];
            questionIndex.isAnswer =
              !isEmpty(this.mapAnswerByChoiceId[questionIndex.id!]) &&
              !isUndefined(this.mapAnswerByChoiceId[questionIndex.id!]);
          });
          break;
        case QuestionType.MULTIPLE_CHOICE:
          this.updateSelectedForMultipleChoice(question);
          this.updateQuestionForMultipleChoice(question);
          break;
        case QuestionType.DROPDOWN_ANSWER:
          this.updateSelectedForDropDownChoice(question);
          break;
        case QuestionType.MATCHING_HEADER:
          this.updateSelectedForMultipleChoice(question);
          break;
        case QuestionType.LABEL_ON_MAP:
          const mapAnsweredBySubQuestionId: Record<string, boolean> = {};
          each(question.subQuestions, (subQuestion) => {
            mapAnsweredBySubQuestionId[subQuestion.id] = !isEmpty(
              subQuestion.answer,
            );
          });
          each(this.mapAnsweredQuestionId[question.id], (questionIndex) => {
            questionIndex.isAnswer =
              mapAnsweredBySubQuestionId[questionIndex.id!];
          });
          break;
      }
    }
  }

  onMapHeaderAnswered(question: Question, part: AbstractPart) {
    this.selectedId.set(question.id);
    each(this.mapAnsweredQuestionId[part.id], (questionIndex) => {
      if (questionIndex.id === question.id) {
        questionIndex.answer = [question.answer as string];
        questionIndex.isAnswer = !isEmpty(question.answer);
        this.selectedQuestionIndex.set(questionIndex);
      }
    });
    this.mapAnsweredQuestionId = { ...this.mapAnsweredQuestionId };
  }

  onMapAnswerChoice(choice: Choice) {
    if (choice) {
      this.selectedId.set(choice.id);
      this.selectedQuestionIndex.set(
        flatMap(toArray(this.mapAnsweredQuestionId)).find(
          (questionIndex) => questionIndex.id && questionIndex.id === choice.id,
        )!,
      );
    }
  }

  onMapReviewQuestion(reviewedQuestionIndex: QuestionIndex) {
    each(this.mapAnsweredQuestionId, (questionIndexes) => {
      each(questionIndexes, (questionIndex) => {
        if (questionIndex.id === reviewedQuestionIndex.id) {
          questionIndex.isReviewed = reviewedQuestionIndex.isReviewed;
        }
      });
    });
  }

  updateSelectedForDropDownChoice(question: Question) {
    const questionIndex = this.mapAnsweredQuestionId[question.id][0];
    if (questionIndex) {
      questionIndex.isAnswer = !isEmpty(question.answer);
    }
    this.selectedQuestionIndex.set(questionIndex);
  }

  updateSelectedForMultipleChoice(question: Question) {
    each(this.mapAnsweredQuestionId[question.id], (questionIndex) => {
      questionIndex.answer = question.answer as string[];
    });
    const questionIndexes = this.mapAnsweredQuestionId[question.id].map(
      (questionIndex) => {
        questionIndex = {
          ...questionIndex,
          id: question.id,
          answer: question.answer as string[],
          isAnswer: false,
        };
        return questionIndex;
      },
    );
    for (let i = 0; i < question.answer.length; i++) {
      questionIndexes[i].isAnswer = true;
    }
    this.mapAnsweredQuestionId[question.id] = questionIndexes;
    this.selectedQuestionIndex.set(
      questionIndexes[questionIndexes[0].answer.length - 1],
    );
  }

  updateQuestionForMultipleChoice(question: Question) {
    this.result.listeningParts.forEach((part) => {
      part.questions.forEach((q) => {
        if (q.id === question.id) {
          q.answer = question.answer as string[];
        }
      });
    });
    this.result.readingParts.forEach((part) => {
      part.questions.forEach((q) => {
        if (q.id === question.id) {
          q.answer = question.answer as string[];
        }
      });
    });
  }

  onTabChange(key: string, index: number) {
    this.mapSavedPart[key][index] = true;
  }
}
