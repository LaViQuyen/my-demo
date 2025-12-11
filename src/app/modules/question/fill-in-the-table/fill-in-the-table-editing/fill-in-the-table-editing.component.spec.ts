import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheTableEditingComponent } from './fill-in-the-table-editing.component';

describe('FillInTheTableEditingComponent', () => {
  let component: FillInTheTableEditingComponent;
  let fixture: ComponentFixture<FillInTheTableEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheTableEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheTableEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
