import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from '../../../common/models/result.model';
import { ListeningComponent } from '../../listening/listening.component';
import { MultipleChoicesComponent } from '../../multiple-choices/multiple-choices.component';
import { PartNavigationComponent } from '../../part-navigation/part-navigation.component';
import { ReadingComponent } from '../../reading/reading.component';
import { ShortAnswerComponent } from '../../short-answer/short-answer.component';
import { WritingComponent } from '../../writing/writing.component';
import { BandScorePipe } from '../band-score.pipe';
import { ResultService } from '../result.service';
import { FeedbackComponent } from '../../feedback/feedback.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ExportUtils } from '../../../utils/export.utils';
import { FileService } from '../../file.service';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { error } from 'winston';

@Component({
  selector: 'app-result-detail',
  standalone: true,
  imports: [
    MultipleChoicesComponent,
    ShortAnswerComponent,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    ReadingComponent,
    ListeningComponent,
    WritingComponent,
    BandScorePipe,
    PartNavigationComponent,
    FeedbackComponent,
    MatDialogModule,
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  templateUrl: './result-detail.component.html',
  styleUrl: './result-detail.component.scss',
})
export class ResultDetailComponent {
  result: Result = {
    id: '',
    name: '',
    studentName: '',
    listeningParts: [],
    readingParts: [],
    writingParts: [],
    correctReadingPoint: 0,
    totalReadingPoint: 0,
    correctListeningPoint: 0,
    totalListeningPoint: 0,
    testDate: '',
    quizId: '',
    isSubmit: false,
  };
  correctListeningPoint = 0;
  totalListeningPoint = 0;
  selectedListeningPart = 0;
  selectedReadingPart = 0;
  selectedWritingPart = 0;
  fileService = inject(FileService);
  dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private router: Router,
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const resultId = paramMap.get('resultId');
      if (resultId) {
        this.resultService.getById(resultId).subscribe((result) => {
          this.result = result;
        });
      }
    });
  }

  export() {
    forkJoin([
      this.fileService.generatePdfFile(
        'Listening',
        ExportUtils.exportListening(this.result),
        this.result.studentName,
        this.result.name,
      ),
      this.fileService.generatePdfFile(
        'Reading',
        ExportUtils.exportReading(this.result),
        this.result.studentName,
        this.result.name,
      ),
      this.fileService.generatePdfFile(
        'Writing',
        ExportUtils.exportWriting(this.result),
        this.result.studentName,
        this.result.name,
      ),
      this.fileService.generatePdfFile(
        'Feedback',
        ExportUtils.exportFeedback(this.result),
        this.result.studentName,
        this.result.name,
      ),
    ]).subscribe(() => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
      dialogRef.componentInstance.title = 'Information';
      dialogRef.componentInstance.message = 'Download successfully';
    });
  }

  back() {
    this.router.navigate(['mock-test']).then(() => {});
  }
}
