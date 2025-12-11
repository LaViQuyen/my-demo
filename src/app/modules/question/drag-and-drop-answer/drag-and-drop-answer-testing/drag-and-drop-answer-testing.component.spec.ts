import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropAnswerTestingComponent } from './drag-and-drop-answer-testing.component';

describe('DragAndDropAnswerTestingComponent', () => {
  let component: DragAndDropAnswerTestingComponent;
  let fixture: ComponentFixture<DragAndDropAnswerTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropAnswerTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropAnswerTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
