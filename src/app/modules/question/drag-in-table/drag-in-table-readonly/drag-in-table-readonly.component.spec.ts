import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragInTableReadonlyComponent } from './drag-in-table-readonly.component';

describe('DragInTableReadonlyComponent', () => {
  let component: DragInTableReadonlyComponent;
  let fixture: ComponentFixture<DragInTableReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragInTableReadonlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragInTableReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
