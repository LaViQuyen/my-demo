import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { clone, each, mapValues } from 'lodash-es';
import { interval, Subscription } from 'rxjs';

import { Quiz } from '../../common/models/quiz.model';
import { Result } from '../../common/models/result.model';
import { CommonUtils } from '../../utils/common-utils';
import { ExportUtils } from '../../utils/export.utils';
import { ScoreUtils } from '../../utils/score-utils';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { FileService } from '../file.service';
import { ListeningComponent } from '../listening/listening.component';
import { PartNavigationComponent } from '../shared/components/part-navigation/part-navigation.component';
import { AddOrEditQuizComponent } from '../quizzes/add-or-edit-quiz/add-or-edit-quiz.component';
import { QuizService } from '../quizzes/quizzes.service';
import { ReadingComponent } from '../reading/reading.component';
import { WritingComponent } from '../writing/writing.component';
import { TestService } from './test.service';
import { FeedbackDialog } from '../shared/dialogs/feedback-dialog/feedback-dialog.component';
import { Time, TimerComponent } from '../shared/components/timer/timer.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, 
    MatTabsModule, MatIconModule, MatFormFieldModule, ListeningComponent, 
    ReadingComponent, WritingComponent, PartNavigationComponent, TimerComponent
  ],
  providers: [QuizService, TestService],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent extends AddOrEditQuizComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  @HostListener('document:keydown.control.s', ['$event'])
  override onKeydownHandler() { this.onCtrlSave(); }

  result: Result = {
    id: '', name: '', studentName: '',
    correctReadingPoint: 0, totalReadingPoint: 0,
    correctListeningPoint: 0, totalListeningPoint: 0,
    testDate: '', quizId: '', listeningParts: [], readingParts: [], writingParts: [],
    isSubmit: false, feedback: { rating: 0, content: '' },
  };

  quiz: Quiz = { id: '', name: '', listeningParts: [], readingParts: [], writingParts: [] };
  testTime: Time = { minutes: 0, seconds: 0 };
  startTime: Time = { minutes: 5, seconds: 0 };
  totalSeconds: number = 0;
  testTimeoutIntervalSub!: Subscription;
  testTimeoutInterval: number = 0;
  startTimeoutInterval: number = 1000;
  isReady: boolean = false;
  isStart: boolean = false;
  currentTab = 0;

  override selectedListeningPart = 0;
  override selectedReadingPart = 0;
  override selectedWritingPart = 0;

  mapDisablePart: Record<number, boolean> = { 0: false, 1: true, 2: true };
  private quizIdFromState: string | undefined;

  constructor(
    protected override quizService: QuizService,
    protected override fileService: FileService,
    protected override route: ActivatedRoute,
    protected override router: Router,
    protected override dialog: MatDialog,
    protected testService: TestService,
  ) {
    super(quizService, fileService, route, router, dialog);
    // Phải lấy quizId từ Router State ngay trong Constructor
    const navigation = this.router.getCurrentNavigation();
    this.quizIdFromState = navigation?.extras.state?.['quizId'];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const quizId = params.get('quizId') || this.quizIdFromState;
      if (quizId) {
        // Ép kiểu (quizId as any) để bỏ qua lỗi TS2345 nếu service yêu cầu number
        const sub = this.quizService.getById(quizId as any).subscribe((quiz) => {
          this.quiz = quiz;
          this.result = clone(quiz);
          if (!this.result.listeningTimeout) { this.result.listeningTimeout = 38; }
          this.getTestTimeout();
          // Đảm bảo audio được nạp lại sau khi dữ liệu đã sẵn sàng
          setTimeout(() => { 
            if (this.audioPlayer) {
              this.audioPlayer.nativeElement.load();
            }
          }, 200);
        });
        this.subscriptions.push(sub);
        this.startAutoSave();
      }
    });

    const testId = this.router.getCurrentNavigation()?.extras.state?.['testId'];
    if (testId) {
      const resSub = this.testService.getResultById(testId).subscribe((result) => {
        this.result = result;
        if (this.result.currentTab) {
          this.currentTab = this.result.currentTab;
          this.mapDisablePart[this.currentTab] = false;
        }
        this.getTestTimeout();
      });
      this.subscriptions.push(resSub);
      this.isReady = true;
      this.startAutoSave();
    }
  }

  override ngOnDestroy(): void {
    if (this.testTimeoutIntervalSub) { this.testTimeoutIntervalSub.unsubscribe(); }
    super.ngOnDestroy();
  }

  startAutoSave() {
    const saveInterval = interval(120000).subscribe(() => { this.onCtrlSave(); });
    this.subscriptions.push(saveInterval);
  }

  onChangeTab(tab: number) {
    this.currentTab = tab;
    this.isStart = false;
    this.getTestTimeout();
  }

  getTestTimeout() {
    if (this.currentTab === 0) this.totalSeconds = (this.result.listeningTimeout || 0) * 60;
    if (this.currentTab === 1) this.totalSeconds = (this.result.readingTimeout || 0) * 60;
    if (this.currentTab === 2) this.totalSeconds = (this.result.writingTimeout || 0) * 60;

    this.testTime = {
      minutes: Math.floor(this.totalSeconds / 60),
      seconds: Math.floor(this.totalSeconds % 60),
    };
  }

  onStartTest() {
    this.isReady = true;
    this.result.id = CommonUtils.generateRandomId();
    const sub = this.testService.submitTest(this.result).subscribe();
    this.subscriptions.push(sub);
  }

  onCtrlSave() {
    this.saveTimeout();
    this.result.testDate = CommonUtils.getCurrentDate();
    this.result.currentTab = this.currentTab;
    const saveSub = this.testService.saveCurrentTest(this.result).subscribe();
    this.subscriptions.push(saveSub);
  }

  saveTimeout() {
    const timeout = this.testTime.minutes + this.testTime.seconds / 60;
    if (this.currentTab === 0) this.result.listeningTimeout = timeout;
    if (this.currentTab === 1) this.result.readingTimeout = timeout;
    if (this.currentTab === 2) this.result.writingTimeout = timeout;
  }

  onStartPart() {
    if (this.currentTab === 0 && this.audioPlayer) {
      this.audioPlayer.nativeElement.play().catch(e => console.error("Audio error", e));
    }
    this.isStart = true;
    this.startTimeoutInterval = 0;
    this.testTimeoutInterval = 1000;
    if (this.testTimeoutIntervalSub) this.testTimeoutIntervalSub.unsubscribe();
    this.testTimeoutIntervalSub = interval(1000).subscribe(() => {
      if (this.currentTab === 0 && this.result.audioTime !== undefined) {
        this.result.audioTime += 1;
      }
    });
  }

  onTestTimeout() {
    this.testTimeoutInterval = 0;
    if (this.currentTab === 0 && this.audioPlayer) { this.audioPlayer.nativeElement.pause(); }
    if (this.testTimeoutIntervalSub) this.testTimeoutIntervalSub.unsubscribe();
    this.showTimeOutDialog();
  }

  showTimeOutDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { disableClose: true });
    dialogRef.componentInstance.title = 'Information';
    dialogRef.componentInstance.message = "Time's up";
    dialogRef.componentInstance.isWarning = true;
    const sub = dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) { this.updateTab(); this.afterSubmit(); }
    });
    this.subscriptions.push(sub);
  }

  updateTab() {
    this.startTimeoutInterval = 1000;
    this.startTime = { minutes: 5, seconds: 0 };
    this.testTimeoutInterval = 0;
    this.mapDisablePart = mapValues(this.mapDisablePart, () => true);
    if (this.currentTab < 2) {
      this.mapDisablePart[this.currentTab + 1] = false;
      this.currentTab = this.currentTab + 1;
    }
  }

  onStartTimeOut() {
    this.startTimeoutInterval = 0;
    this.onStartPart();
  }

  afterSubmit() {
    let htmlString = '';
    if (this.currentTab === 1) {
      if (this.audioPlayer) this.audioPlayer.nativeElement.pause();
      htmlString = ExportUtils.exportListening(this.result);
      const sub = this.fileService.generatePdfFile('Listening', htmlString, this.result.studentName, this.result.name).subscribe();
      this.subscriptions.push(sub);
    }
    if (this.currentTab === 2) {
      htmlString = ExportUtils.exportReading(this.result);
      const sub = this.fileService.generatePdfFile('Reading', htmlString, this.result.studentName, this.result.name).subscribe();
      this.subscriptions.push(sub);
    }
    if (this.currentTab === 3) {
      htmlString = ExportUtils.exportWriting(this.result);
      const sub = this.fileService.generatePdfFile('Writing', htmlString, this.result.studentName, this.result.name).subscribe();
      this.subscriptions.push(sub);
      this.showFeedbackDialog();
    }
    this.result.currentTab = this.currentTab;
    const finalSave = this.testService.saveCurrentTest(this.result).subscribe();
    this.subscriptions.push(finalSave);
  }

  onSubmitPartClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = 'Information';
    dialogRef.componentInstance.message = 'Submit this test?';
    const sub = dialogRef.afterClosed().subscribe((isConfirm) => {
      if (isConfirm) { this.updateTab(); this.afterSubmit(); }
    });
    this.subscriptions.push(sub);
  }

  showFeedbackDialog() {
    const dialogRef = this.dialog.open(FeedbackDialog, { disableClose: true });
    const sub = dialogRef.afterClosed().subscribe((feedback) => {
      if (feedback) {
        this.result.feedback = feedback;
        const htmlString = ExportUtils.exportFeedback(this.result);
        const sub = this.fileService.generatePdfFile('Feedback', htmlString, this.result.studentName, this.result.name).subscribe();
        this.subscriptions.push(sub);
        this.submit();
      }
    });
    this.subscriptions.push(sub);
  }

  submit() {
    if (this.audioPlayer && !this.audioPlayer.nativeElement.paused) { this.audioPlayer.nativeElement.pause(); }
    this.calculateListeningPoint();
    this.calculateReadingPoint();
    this.result.isSubmit = true;
    this.onCtrlSave();
    this.router.navigate(['mock-test']);
  }

  private calculateListeningPoint() {
    let correctPoint = 0; let totalPoint = 0;
    each(this.result.listeningParts, (part) => {
      each(part.questions, (question) => {
        const scoreResult = ScoreUtils.calculateQuestionPoint(question);
        correctPoint += scoreResult.correct; totalPoint += scoreResult.total;
      });
    });
    this.result.correctListeningPoint = correctPoint;
    this.result.totalListeningPoint = totalPoint;
  }

  private calculateReadingPoint() {
    let correctPoint = 0; let totalPoint = 0;
    each(this.result.readingParts, (part) => {
      if (part.isMatchHeader) {
        each(part.questions, (question) => { totalPoint++; const score = ScoreUtils.forDropdown(question); correctPoint += score.correct; });
      } else {
        each(part.questions, (question) => { each(question.subQuestions, (subQuestion) => { const scoreResult = ScoreUtils.calculateQuestionPoint(subQuestion); correctPoint += scoreResult.correct; totalPoint += scoreResult.total; }); });
      }
    });
    this.result.correctReadingPoint = correctPoint;
    this.result.totalReadingPoint = totalPoint;
  }

  override onTabChange(key: string, index: number) {
    if (key === 'listening') this.selectedListeningPart = index;
    if (key === 'reading') this.selectedReadingPart = index;
    if (key === 'writing') this.selectedWritingPart = index;
    super.onTabChange(key, index);
  }
}