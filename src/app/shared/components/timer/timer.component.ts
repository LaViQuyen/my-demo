import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { isNull } from 'lodash-es';
import { interval, Observable, Subscription } from 'rxjs';

export interface Time {
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnChanges, OnDestroy {
  @Input() time: Time = {
    minutes: 0,
    seconds: 0,
  };
  @Input() interval: number = 0;

  @Output() timeChange = new EventEmitter<Time>();
  @Output() onTimeout = new EventEmitter();

  subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interval'] && changes['interval'].currentValue !== 0) {
      this.subscription = interval(changes['interval'].currentValue).subscribe(() => {
        this.run();
      });
    }

    if (changes['interval'] && changes['interval'].currentValue === 0) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  run() {
    if (this.time.seconds < 1) {
      this.time.minutes--;
      this.time.seconds = 59;
    } else {
      this.time.seconds--;
    }
    if (this.time.minutes === 0 && this.time.seconds === 0) {
      this.onTimeout.emit();
    }
  }
}
