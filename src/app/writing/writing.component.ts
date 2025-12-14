import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@wfpena/angular-wysiwyg';
import { AbstractQuizPartComponent } from '../../common/abstract-quiz-part.component';
import { Writing } from '../../common/models/writing.model';
import { MultipleChoicesComponent } from '../multiple-choices/multiple-choices.component';
import { ShortAnswerComponent } from '../short-answer/short-answer.component';
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
  // Output gửi dữ liệu ra cha
  @Output() writingChange = new EventEmitter<string>();

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

  // Hàm xử lý khi gõ nội dung
  onContentChange(htmlVal: string) {
    this.data.answer = htmlVal;
    this.writingChange.emit(htmlVal);
  }
}