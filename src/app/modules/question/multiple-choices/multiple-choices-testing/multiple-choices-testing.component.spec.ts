import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoicesTestingComponent } from './multiple-choices-testing.component';

describe('MultipleChoicesTestingComponent', () => {
  let component: MultipleChoicesTestingComponent;
  let fixture: ComponentFixture<MultipleChoicesTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoicesTestingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoicesTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
