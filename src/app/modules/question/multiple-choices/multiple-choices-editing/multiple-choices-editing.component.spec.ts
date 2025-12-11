import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleChoicesEditingComponent } from './multiple-choices-editing.component';

describe('MultipleChoicesEditingComponent', () => {
  let component: MultipleChoicesEditingComponent;
  let fixture: ComponentFixture<MultipleChoicesEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoicesEditingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoicesEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
