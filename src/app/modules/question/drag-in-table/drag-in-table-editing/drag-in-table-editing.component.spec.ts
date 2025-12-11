import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragInTableEditingComponent } from './drag-in-table-editing.component';

describe('DragInTableEditingComponent', () => {
  let component: DragInTableEditingComponent;
  let fixture: ComponentFixture<DragInTableEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragInTableEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragInTableEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
