import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragInTableComponent } from './drag-in-table.component';

describe('DragInTableComponent', () => {
  let component: DragInTableComponent;
  let fixture: ComponentFixture<DragInTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragInTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
