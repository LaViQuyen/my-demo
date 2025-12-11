import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrEditQuizComponent } from './add-or-edit-quiz.component';

describe('AddOrEditQuizComponent', () => {
  let component: AddOrEditQuizComponent;
  let fixture: ComponentFixture<AddOrEditQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrEditQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
