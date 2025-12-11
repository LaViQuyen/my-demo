import { Component } from '@angular/core';
import { FillInTheGapComponent } from '../fill-in-the-gap/fill-in-the-gap.component';
import { FillInTheTableReadonlyComponent } from './fill-in-the-table-readonly/fill-in-the-table-readonly.component';
import { FillInTheTableEditingComponent } from './fill-in-the-table-editing/fill-in-the-table-editing.component';
import { FillInTheTableTestingComponent } from './fill-in-the-table-testing/fill-in-the-table-testing.component';

@Component({
  selector: 'app-fill-in-the-table',
  standalone: true,
  imports: [
    FillInTheTableReadonlyComponent,
    FillInTheTableEditingComponent,
    FillInTheTableTestingComponent,
  ],
  templateUrl: './fill-in-the-table.component.html',
  styleUrl: './fill-in-the-table.component.scss',
})
export class FillInTheTableComponent extends FillInTheGapComponent {}
