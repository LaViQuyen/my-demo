import { Component } from '@angular/core';
import { AbstractQuestionComponent } from '../../../shared/abstract/abstract-question.component';
import { LabelOnMapEditingComponent } from "../label-on-map/label-on-map-editing/label-on-map-editing.component";
import { LabelOnMapReadonlyComponent } from "../label-on-map/label-on-map-readonly/label-on-map-readonly.component";
import { LabelOnMapTestingComponent } from "../label-on-map/label-on-map-testing/label-on-map-testing.component";
import {
  DragAndDropAnswerEditingComponent
} from "./drag-and-drop-answer-editing/drag-and-drop-answer-editing.component";
import {
  DragAndDropAnswerTestingComponent
} from "./drag-and-drop-answer-testing/drag-and-drop-answer-testing.component";
import {
  DragAndDropAnswerReadonlyComponent
} from "./drag-and-drop-answer-readonly/drag-and-drop-answer-readonly.component";

@Component({
  selector: 'app-drag-and-drop-answer',
  standalone: true,
  imports: [
    LabelOnMapEditingComponent,
    LabelOnMapReadonlyComponent,
    LabelOnMapTestingComponent,
    DragAndDropAnswerEditingComponent,
    DragAndDropAnswerTestingComponent,
    DragAndDropAnswerReadonlyComponent,
  ],
  templateUrl: './drag-and-drop-answer.component.html',
  styleUrl: './drag-and-drop-answer.component.scss',
})
export class DragAndDropAnswerComponent extends AbstractQuestionComponent {}
