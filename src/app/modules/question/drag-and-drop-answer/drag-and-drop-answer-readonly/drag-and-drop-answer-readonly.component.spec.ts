import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropAnswerReadonlyComponent } from './drag-and-drop-answer-readonly.component';

describe('DragAndDropAnswerReadonlyComponent', () => {
  let component: DragAndDropAnswerReadonlyComponent;
  let fixture: ComponentFixture<DragAndDropAnswerReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropAnswerReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropAnswerReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
