import { Component, EventEmitter, OnInit, Output } from '@angular/core'; // <--- Thêm Output, EventEmitter
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';
import { AbstractQuizPartComponent } from '../../shared/abstract/abstract-quiz-part.component';
import { Writing } from '../../shared/models/writing.model';
import { MultipleChoicesComponent } from '../../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../../short-answer/short-answer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MultipleChoicesComponent,
    ShortAnswerComponent,
    MatIconModule,
    AngularEditorModule,
  ],
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.scss',
})
export class WritingComponent
  extends AbstractQuizPartComponent<Writing>
  implements OnInit
{
  // --- BẮT ĐẦU PHẦN THÊM MỚI ---
  @Output() writingChange = new EventEmitter<string>(); // Khai báo sự kiện output

  testEditorConfig: AngularEditorConfig = {};

  ngOnInit(): void {
    this.testEditorConfig = {
      ...this.config,
      editable: !this.isReadOnly,
      showToolbar: false,
      height: '100%',
      minHeight: '100%',
      placeholder: 'Type your answer here...'
    };
  }

  // Hàm xử lý sự kiện thay đổi nội dung (Sửa lỗi NG9)
  onContentChange(htmlVal: string) {
    this.data.answer = htmlVal;
    this.writingChange.emit(htmlVal);
  }
  // --- KẾT THÚC PHẦN THÊM MỚI ---
}