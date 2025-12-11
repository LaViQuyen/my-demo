import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropAnswerEditingComponent } from './drag-and-drop-answer-editing.component';

describe('DragAndDropAnswerEditingComponent', () => {
  let component: DragAndDropAnswerEditingComponent;
  let fixture: ComponentFixture<DragAndDropAnswerEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropAnswerEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropAnswerEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
