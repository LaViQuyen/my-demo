import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragInTableTestingComponent } from './drag-in-table-testing.component';

describe('DragInTableTestingComponent', () => {
  let component: DragInTableTestingComponent;
  let fixture: ComponentFixture<DragInTableTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragInTableTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragInTableTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
