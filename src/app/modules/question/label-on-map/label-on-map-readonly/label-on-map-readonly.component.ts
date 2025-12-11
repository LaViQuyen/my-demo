import { Component } from '@angular/core';
import { IsCheckCellPipe } from '../is-check-cell.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelOnMapEditingComponent } from '../label-on-map-editing/label-on-map-editing.component';

@Component({
  selector: 'app-label-on-map-readonly',
  standalone: true,
  imports: [IsCheckCellPipe, MatIcon, MatInput, ReactiveFormsModule],
  templateUrl: './label-on-map-readonly.component.html',
  styleUrl: '../label-on-map.component.scss',
})
export class LabelOnMapReadonlyComponent extends LabelOnMapEditingComponent {}
