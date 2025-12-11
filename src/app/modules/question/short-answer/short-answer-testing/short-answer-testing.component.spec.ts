import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortAnswerTestingComponent } from './short-answer-testing.component';

describe('ShortAnswerTestingComponent', () => {
  let component: ShortAnswerTestingComponent;
  let fixture: ComponentFixture<ShortAnswerTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerTestingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortAnswerTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
