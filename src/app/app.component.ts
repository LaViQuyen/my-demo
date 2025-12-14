import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutService } from './layout.service'; // Nhớ đường dẫn file service bạn vừa tạo

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Inject Service vào biến public để HTML dùng được
  constructor(public layoutService: LayoutService) {}
}