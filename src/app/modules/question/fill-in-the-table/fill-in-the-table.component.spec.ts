import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheTableComponent } from './fill-in-the-table.component';

describe('FillInTheTableComponent', () => {
  let component: FillInTheTableComponent;
  let fixture: ComponentFixture<FillInTheTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
