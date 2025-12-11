import { Component } from '@angular/core';
import { FillInTheTableComponent } from "../fill-in-the-table/fill-in-the-table.component";
import {
  FillInTheTableReadonlyComponent
} from "../fill-in-the-table/fill-in-the-table-readonly/fill-in-the-table-readonly.component";
import { DragInTableReadonlyComponent } from "./drag-in-table-readonly/drag-in-table-readonly.component";
import { DragInTableTestingComponent } from "./drag-in-table-testing/drag-in-table-testing.component";
import {
  FillInTheTableTestingComponent
} from "../fill-in-the-table/fill-in-the-table-testing/fill-in-the-table-testing.component";
import { DragInTableEditingComponent } from "./drag-in-table-editing/drag-in-table-editing.component";
import {
  FillInTheTableEditingComponent
} from "../fill-in-the-table/fill-in-the-table-editing/fill-in-the-table-editing.component";

@Component({
  selector: 'app-drag-in-table',
  standalone: true,
  imports: [
    FillInTheTableReadonlyComponent,
    DragInTableReadonlyComponent,
    DragInTableTestingComponent,
    FillInTheTableTestingComponent,
    DragInTableEditingComponent,
    FillInTheTableEditingComponent,
  ],
  templateUrl: './drag-in-table.component.html',
  styleUrl: './drag-in-table.component.scss',
})
export class DragInTableComponent extends FillInTheTableComponent {}
