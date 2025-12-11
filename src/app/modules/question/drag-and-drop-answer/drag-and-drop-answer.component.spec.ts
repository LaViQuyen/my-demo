import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropAnswerComponent } from './drag-and-drop-answer.component';

describe('DragAndDropAnswerComponent', () => {
  let component: DragAndDropAnswerComponent;
  let fixture: ComponentFixture<DragAndDropAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAndDropAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
