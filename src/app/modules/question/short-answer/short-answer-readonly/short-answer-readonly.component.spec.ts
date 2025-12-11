import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortAnswerReadonlyComponent } from './short-answer-readonly.component';

describe('ShortAnswerReadonlyComponent', () => {
  let component: ShortAnswerReadonlyComponent;
  let fixture: ComponentFixture<ShortAnswerReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerReadonlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortAnswerReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
