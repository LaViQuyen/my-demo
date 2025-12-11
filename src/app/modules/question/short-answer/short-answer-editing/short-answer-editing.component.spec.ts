import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortAnswerEditingComponent } from './short-answer-editing.component';

describe('ShortAnswerEditingComponent', () => {
  let component: ShortAnswerEditingComponent;
  let fixture: ComponentFixture<ShortAnswerEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortAnswerEditingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortAnswerEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
