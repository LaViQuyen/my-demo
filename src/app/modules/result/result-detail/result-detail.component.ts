import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from '../../../shared/models/result.model';
import { ListeningComponent } from '../../../tabs/listening/listening.component';
import { MultipleChoicesComponent } from '../../question/multiple-choices/multiple-choices.component';
import { PartNavigationComponent } from '../../../shared/components/part-navigation/part-navigation.component';
import { ReadingComponent } from '../../../tabs/reading/reading.component';
import { ShortAnswerComponent } from '../../question/short-answer/short-answer.component';
import { WritingComponent } from '../../../tabs/writing/writing.component';
import { BandScorePipe } from '../band-score.pipe';
import { ResultService } from '../result.service';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ExportUtils } from '../../../utils/export.utils';
import { forkJoin } from 'rxjs';
import { FeedbackDialog } from '../../../shared/dialogs/feedback-dialog/feedback-dialog.component';
import { FileService } from "../../../file.service";
import { ConfirmDialogComponent } from "../../../shared/dialogs/confirm-dialog/confirm-dialog.component";

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
    FeedbackDialog,
    MatDialogModule,
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  templateUrl: './result-detail.component.html',
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
  fileService: FileService = inject(FileService);
  dialog: MatDialog = inject(MatDialog);

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
