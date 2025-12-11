import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillInTheGapComponent } from './fill-in-the-gap.component';

describe('FillInTheGapComponent', () => {
  let component: FillInTheGapComponent;
  let fixture: ComponentFixture<FillInTheGapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInTheGapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FillInTheGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
