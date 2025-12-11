import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInTheGapTestingComponent } from './fill-in-the-gap-testing.component';

describe('FillInTheGapTestingComponent', () => {
  let component: FillInTheGapTestingComponent;
  let fixture: ComponentFixture<FillInTheGapTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheGapTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInTheGapTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
